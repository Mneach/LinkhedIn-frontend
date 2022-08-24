import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { queryCheckEmailUser, queryLogin, queryUserByEmail } from '../../lib/graphql/query';
import { StorageKey } from '../../lib/keys/key';
import { toastError } from '../../lib/toast/toast';
import { ParseJwt } from '../../lib/token/token';
import { registerInputType, registerStateType, setRegisterInputType, setRegisterStateType, setSignInType, signInType } from '../../model/FormModel';
import { CredentialModel, CredentialResponse, GsiButtonConfiguration, PromptMomentNotification } from '../../model/GoogleModel';
import { UserType } from '../../model/model';

const Register = (
    { registerData, setRegisterData, registerStateData, setRegisterState, signInMethod, setSignInMethod }
        :
        { registerData: registerInputType, setRegisterData: setRegisterInputType, registerStateData: string[], setRegisterState: setRegisterStateType, signInMethod: string, setSignInMethod: setSignInType }) => {

    const navigate = useNavigate()
    const clientId = "422574871920-kg9q019092ta0mot2d808egu8gd6hc07.apps.googleusercontent.com"
    const googleId = window.google?.accounts.id
    const [getUserByEmail] = useLazyQuery(queryUserByEmail, { errorPolicy: "all" })
    const [checkEmailuser] = useLazyQuery(queryCheckEmailUser , {errorPolicy :"all"})
    const [login] = useLazyQuery(queryLogin , { errorPolicy: "all" })

    const registerHandler = () => {
        if (registerData.email === "") {
            toastError("Please Enter Your Email", "top-right", "colored")
        } else if (registerData.password === "") {
            toastError("Please Enter Your Password", "top-right", "colored")
        } else if (registerData.email.includes("@") == false) {
            toastError("Email Must Include @ Symbol", "top-right", "colored")
        } else if (registerData.email.endsWith(".com") == false) {
            toastError("Email With Ends With .com", "top-right", "colored")
        } else if (registerData.password.length <= 6) {
            toastError("Password Must Be More Than 6 Characters", "top-right", "colored")
        } else {
            checkEmailuser({ variables: { email: registerData.email } }).then((e) => {
                if (e.error) {
                    console.log("test")
                    toastError(`${e.error.message}`, "top-right", "colored")
                } else {
                    setRegisterState(registerStateData.at(1))
                    setSignInMethod("Normal")
                }
            }).catch((error) => {
                toastError(`${error}`, "top-right", "colored")
            })
        }
    }

    const handleCallBack = (response: CredentialResponse) => {
        console.log(ParseJwt(response.credential as string))
        const credentialData = ParseJwt(response.credential as string) as CredentialModel

        getUserByEmail({ variables: { email: credentialData.email } }).then((e) => {
            if (e.data !== null) {
                if(e.error !== undefined){
                    //return error message from backend
                    toastError(`${e.error?.message}` , "top-right" , "colored")
                }else{
                    // user has already registered -> get token and go home
                    const userData = e.data.UserByEmail as UserType
                    login({ variables: { "input": { email: userData.email, password: userData.password } } }).then((e) => {
                        if(e.error !== undefined){
                            toastError(`${e.error?.message}` , "top-right" , "colored")
                        }else{
                            localStorage.setItem(StorageKey.JwtTokenKey , e.data.Login.token)
                            navigate("/mainPage")
                        }
                    }).catch((error) => {
                        toastError(`${error}`, "top-right", "colored")
                    })
                }
            } else {
                // go to google handler -> register account
                setRegisterData((prev) => ({
                    ...prev,
                    firstName: credentialData.given_name,
                    lastName: credentialData.family_name,
                    email: credentialData.email,
                    profileImageUrl: credentialData.picture,
                }))

                googleHandler()
            }
        }).catch((error) => {
            toastError(`${error}`, "top-right", "colored")
        })
    }

    useEffect(() => {
        if(localStorage.getItem(StorageKey.JwtTokenKey) === null){
            console.log('running use effect')
            googleId?.initialize({
                client_id: clientId,
                callback: handleCallBack
            })
    
            googleId?.renderButton
                (
                    document.getElementById("GoogleSignIn") as HTMLElement,
                    {
                        type: "standard",
                        theme: "outline",
                        size: "large",
                        text: "signup_with",
                        shape: "pill",
                        width: "350px",
                    } as GsiButtonConfiguration,
    
                )
    
            googleId?.prompt((notification: PromptMomentNotification) => {
                notification.isDisplayed()
            })
        }
    } , [])

    const googleHandler = () => {
        setRegisterData((prev) => ({ ...prev, password: "" }))
        setSignInMethod("Google")
        setRegisterState(registerStateData.at(7))
    }

    return (
        <>
            <div className='contentpage__mid'>
                <div className='contentpage__headertext'>Register</div>
                <div className='contentpage__input__container'>
                    <label htmlFor="email">Email</label>
                    <input required type="email" placeholder='Enter Your Email' value={registerData.email} onChange={(e) => setRegisterData((prev) => ({ ...prev, email: e.target.value }))} />
                    <label htmlFor="password">Password (7 or more characters)</label>
                    <input required type="password" placeholder='Enter Your Password' value={registerData.password} onChange={(e) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))} />
                </div>
                <div className='contentpage__text2'>By clicking Agree & Join, you agree to the LinkedIn <Link to={'/register'}>User Agreement</Link>, <Link to={'/register'}>Privacy Policy</Link>, and <Link to={'/register'}>Cookie Policy</Link>.</div>
                <button className='contentpage__button__signin' onClick={registerHandler}>Agree & Join</button>
                <div className='contentpage__or__separator'>
                    <span className='contentpage__or-text'>or</span>
                </div>
                <div id='GoogleSignIn'></div>
                {/* <button className='contentpage__button__google' onClick={googleHandler}>
                    <img src="/src/assets/google-logo.png" alt="" />
                    Sign in with google
                </button> */}
                <div className='contentpage__bottom'>
                    <p>Already on LinkedIn? <Link to={'/'}>Sign in</Link> </p>
                </div>
            </div>
            <div className='contentpage__bottom'>
                <p>Looking to create a page for a business? <Link to={'/register'}>Get Help</Link> </p>
            </div>
        </>
    )
}

export default Register