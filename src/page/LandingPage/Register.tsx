import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../component/LandingPage/Footer'
import Navbar from '../../component/LandingPage/Navbar'

const Register = () => {
  return (
    <div>
      <Navbar />
      <div className={"contentpage"}>
        {/* <div className='contentpage__top'>
          <p>You are almost connected to the world of professional work </p>
        </div> */}
        <div className='contentpage__mid'>
          <div className='contentpage__headertext'>Register</div>
          <div className='contentpage__input__container'>
            <label htmlFor="email">Email</label>
            <input type="text" placeholder='Enter Your Email' />
            <label htmlFor="password">Password</label>
            <input type="text" placeholder='Enter Your Password' />
          </div>
          <div className='contentpage__text2'>By clicking Agree & Join, you agree to the LinkedIn <Link to={'/register'}>User Agreement</Link>, <Link to={'/register'}>Privacy Policy</Link>, and <Link to={'/register'}>Cookie Policy</Link>.</div>
          <button className='contentpage__button__signin'>Agree & Join</button>
          <div className='contentpage__or__separator'>
            <span className='contentpage__or-text'>or</span>
          </div>
          <button className='contentpage__button__google'>
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
      </div>
      <Footer />
    </div>
  )
}

export default Register