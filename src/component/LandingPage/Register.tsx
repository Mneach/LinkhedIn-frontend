import { useLazyQuery } from '@apollo/client';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { queryUserByEmail } from '../../lib/graphql/query';
import { toastError } from '../../lib/toast/toast';
import { registerInputType, registerStateType, setRegisterInputType, setRegisterStateType, setSignInType, signInType } from '../../model/FormModel';

const Register = (
    { registerData, setRegisterData, registerStateData, setRegisterState , signInMethod , setSignInMethod}
        :
        { registerData: registerInputType, setRegisterData: setRegisterInputType, registerStateData: string[], setRegisterState: setRegisterStateType , signInMethod : string , setSignInMethod : setSignInType }) => {

    const [getUserByEmail] = useLazyQuery(queryUserByEmail, { errorPolicy: "all" })
    const [registerError, setRegisterError] = useState("");

    const resetForm = () => {
        setRegisterData((prev) => ({ ...prev, email: "", password: "" }))
    }

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
            getUserByEmail({ variables: { email: registerData.email } }).then((e) => {
                if (e.error) {
                    console.log("test")
                    toastError(`${e.error.message}`, "top-right", "colored")
                } else {
                    setRegisterError("")
                    setRegisterState(registerStateData.at(1))
                    setSignInMethod("Normal")
                }
            }).catch((error) => {
                toastError(`${error}`, "top-right", "colored")
            })
        }
    }

    const googleHandler = () => {
        resetForm()
        setSignInMethod("Google")
        setRegisterError("")
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
                <button className='contentpage__button__google' onClick={googleHandler}>
                    <img src="/src/assets/google-logo.png" alt="" />
                    Sign in with google
                </button>
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