import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../component/LandingPage/Footer'
import Navbar from '../../component/LandingPage/Navbar'

import '../../sass/layout/LandingPage/content.scss'

const Login = () => {
    return (
        <div>
            <Navbar />
            <div className={"contentpage"}>
                <div className='contentpage__mid'>
                    <div className='contentpage__headertext'>Sign In</div>
                    <div className='contentpage__text1'>Stay updated on your professional world</div>
                    <div className='contentpage__input__container'>
                        <input type="text" placeholder='Email' />
                        <input type="text" placeholder='Password' />
                    </div>
                    <div className='contentpage__text1'>
                        <Link to={'/forgotPassword'}>Forgot Password?</Link>
                    </div>
                    <button className='contentpage__button__signin'>Sign in</button>
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