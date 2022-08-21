import { gql, useLazyQuery, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../component/LandingPage/Footer'
import Navbar from '../../component/LandingPage/Navbar'
import { queryLogin } from '../../lib/graphql/query'
import { StorageKey } from '../../lib/keys/key'

import '../../sass/layout/LandingPage/content.scss'

const Login = () => {

    const navigate = useNavigate()
    const [login, { loading, error, data , called}] = useLazyQuery(queryLogin, { errorPolicy: "all" })
    const [registerError, setLoginError] = useState("");
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })
    
    if(loading) return <p>Loading...</p>

    const resetForm = () => {
        setLoginData({ email: "", password: "" })
    }

    const loginHandler = () => {
        if (loginData.email === "" || loginData.password === "") {
            setLoginError("Input Cannot Be Null")
        } else if (loginData.email.includes("@") == false) {
            setLoginError("Email Must Include @ Symbol ")
        } else if (loginData.email.endsWith(".com") == false) {
            setLoginError("Email With Ends With .com")
        } else {
            login({ variables: { "input": { email: loginData.email, password: loginData.password } } })
            setLoginError("")
        }
        resetForm()
    }
    if(data) console.log(" TOKEN FROM DB = " + data.Login.token)
    console.log("CURRENT TOKEN = " + localStorage.getItem(StorageKey.JwtTokenKey))
    console.log(loginData)

    if(called && !loading && data && error == undefined){
        localStorage.setItem(StorageKey.JwtTokenKey , data.Login.token)
        navigate("/home")
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
                    {
                        error !== undefined ?
                            (
                                <div className='contentpage__error'>
                                    {
                                        error?.graphQLErrors.map(({ message }, i) => (
                                            <span key={i}>{message}</span>
                                        ))
                                    }

                                </div>
                            )
                            :
                            (
                                registerError !== "" ?
                                    (
                                        <div className='contentpage__error'>{registerError}</div>
                                    )
                                    :
                                    (null)
                            )
                    }
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