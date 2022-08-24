import { gql, useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../component/LandingPage/Footer'
import Navbar from '../../component/LandingPage/Navbar'
import { useUserContext } from '../../hooks/UserContext'
import { queryLogin } from '../../lib/graphql/query'
import { StorageKey } from '../../lib/keys/key'
import { toastError } from '../../lib/toast/toast'

import '../../sass/layout/LandingPage/content.scss'

const Login = () => {

    const navigate = useNavigate()
    const [login, { loading, error, data , called}] = useLazyQuery(queryLogin, { errorPolicy: "all" })
    const [registerError, setLoginError] = useState("");
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })
    
    useEffect(() => {
        if(localStorage.getItem(StorageKey.JwtTokenKey) !== null){
            navigate("/mainPage")
        }
    } , [])


    if(loading) return <p>Loading...</p>

    const resetForm = () => {
        setLoginData({ email: "", password: "" })
    }

    const loginHandler = () => {
        if (loginData.email === ""){
            toastError("Please Input Your Email", "top-right", "colored")
        } else if(loginData.password === ""){
            toastError("Please Input Your Password", "top-right", "colored")
        } else if (loginData.email.includes("@") == false) {
            toastError("Email Must Include @ Symbol", "top-right", "colored")
        } else if (loginData.email.endsWith(".com") == false) {
            toastError("Email With Ends With .com", "top-right", "colored")
        } else {
            login({ variables: { "input": { email: loginData.email, password: loginData.password } } })
        }
        resetForm()
    }

    
    if(called && !loading && data && error == undefined){
        localStorage.setItem(StorageKey.JwtTokenKey , data.Login.token)
        if(localStorage.getItem(StorageKey.JwtTokenKey) != null){
            console.log("CURRENT TOKEN = " + localStorage.getItem(StorageKey.JwtTokenKey))
            navigate("/mainPage")
        }
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
                    <button className='contentpage__button__google'>
                        <img src="/src/assets/google-logo.png" alt="" />
                        Sign in with google
                    </button>
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