import { gql, useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../component/LandingPage/Footer'
import Navbar from '../../component/LandingPage/Navbar'
import { useUserContext } from '../../hooks/UserContext'
import { queryCheckEmailUser, queryLogin, queryUserByEmail } from '../../lib/graphql/query'
import { StorageKey } from '../../lib/keys/key'
import { toastError } from '../../lib/toast/toast'
import { ParseJwt } from '../../lib/token/token'
import { CredentialModel, CredentialResponse, GsiButtonConfiguration, PromptMomentNotification } from '../../model/GoogleModel'
import { UserType } from '../../model/model'

import '../../sass/layout/LandingPage/content.scss'

const Login = () => {

    const navigate = useNavigate()
    const clientId = "422574871920-kg9q019092ta0mot2d808egu8gd6hc07.apps.googleusercontent.com"
    const googleId = window.google?.accounts.id
    const [login, { loading, error, data, called }] = useLazyQuery(queryLogin, { errorPolicy: "all" })
    const [getUserByEmail] = useLazyQuery(queryUserByEmail, { errorPolicy: "all" })
    const [checkEmailuser] = useLazyQuery(queryCheckEmailUser , {errorPolicy :"all"})
    const [registerError, setLoginError] = useState("");
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })

    useEffect(() => {
        if (localStorage.getItem(StorageKey.JwtTokenKey) !== null) {
            navigate("/mainPage")
        }
    }, [])

    const handleCallBack = (response: CredentialResponse) => {
        console.log(ParseJwt(response.credential as string))
        const credentialData = ParseJwt(response.credential as string) as CredentialModel

        getUserByEmail({ variables: { email: credentialData.email } }).then((e) => {
            if (e.data !== null) {
                if (e.error !== undefined) {
                    //return error message from backend
                    toastError(`${e.error?.message}`, "top-center", "colored")
                } else {
                    // user has already registered -> get token and go home
                    const userData = e.data.UserByEmail as UserType
                    login({ variables: { "input": { email: userData.email, password: userData.password } } }).then((e) => {
                        if (e.error !== undefined) {
                            toastError(`${e.error?.message}`, "top-center", "colored")
                        } else {
                            localStorage.setItem(StorageKey.JwtTokenKey, e.data.Login.token)
                            navigate("/mainPage")
                        }
                    }).catch((error) => {
                        toastError(`${error}`, "top-center", "colored")
                    })
                }
            } else {
                toastError(`Email not registered`, "top-center", "colored")
            }
        }).catch((error) => {
            toastError(`${error}`, "top-center", "colored")
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
    }, [])


    if (loading) return <p>Loading...</p>

    const resetForm = () => {
        setLoginData({ email: "", password: "" })
    }

    const loginHandler = () => {
        if (loginData.email === "") {
            toastError("Please Input Your Email", "top-center", "colored")
        } else if (loginData.password === "") {
            toastError("Please Input Your Password", "top-center", "colored")
        } else if (loginData.email.includes("@") == false) {
            toastError("Email Must Include @ Symbol", "top-center", "colored")
        } else if (loginData.email.endsWith(".com") == false) {
            toastError("Email With Ends With .com", "top-center", "colored")
        } else {
            login({ variables: { "input": { email: loginData.email, password: loginData.password } } }).then((e) => {
                if (e.error !== undefined) {
                    toastError(`${e.error?.message}`, "top-center", "colored")
                } else {
                    localStorage.setItem(StorageKey.JwtTokenKey, e.data.Login.token)
                    navigate("/mainPage")
                }
            }).catch((error) => {
                toastError(`${error}`, "top-center", "colored")
            })
        }
        resetForm()
    }

    return (
        <div>
            <Navbar navbarModel='model1' />
            <div className={"contentpage"}>
                <div className='contentpage__mid'>
                    <div className='contentpage__headertext'>Sign In</div>
                    <div className='contentpage__text1'>Stay updated on your professional world</div>
                    <div className='contentpage__input__container'>
                        <input type="text" placeholder='Email' value={loginData.email} onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))} />
                        <input type="password" placeholder='Password' value={loginData.password} onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))} />
                    </div>
                    <div className='contentpage__text1'>
                        <Link to={'/forgotPassword'}>Forgot Password?</Link>
                    </div>
                    <button className='contentpage__button__signin' onClick={loginHandler}>Sign in</button>
                    <div className='contentpage__or__separator'>
                        <span className='contentpage__or-text'>or</span>
                    </div>
                    <div id='GoogleSignIn'></div>
                    {/* <button className='contentpage__button__google'>
                        <img src="/src/assets/google-logo.png" alt="" />
                        Sign in with google
                    </button> */}
                </div>
                <div className='contentpage__bottom'>
                    <p>New to LinkhedIn? <Link to={'/register'}>Join Now</Link> </p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login