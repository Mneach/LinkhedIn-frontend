import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../component/LandingPage/Footer'
import Navbar from '../../component/LandingPage/Navbar'

const ForgotPassword = () => {
  return (
    <div>
        <Navbar />
        <div className={"contentpage"}>
                <div className='contentpage__mid3'>
                    <div className='contentpage__headertext'>Forgot Password?</div>
                    <div className='contentpage__text1'>Reset password in two quick steps</div>
                    <div className='contentpage__input__container'>
                        <input type="text" placeholder='Enter Your Email' />
                    </div>
                    <button className='contentpage__button__signin'>Reset Password</button>
                      <Link to={'/'}>Back</Link>
                </div>
            </div>
        <Footer />
    </div>
  )
}

export default ForgotPassword