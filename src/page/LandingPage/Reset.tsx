import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../../component/LandingPage/Footer'
import Navbar from '../../component/LandingPage/Navbar'

import '../../sass/layout/LandingPage/content.scss'

const Reset = () => {

    const navigate = useNavigate()

    const movePageHandler = () => {
        navigate('/')
    }

  return (
    <div>
        <Navbar navbarModel='model2' />
            <div className='contentpage'>
                <div className='contentpage__mid4'>
                    <p>Reset your password via the link sent by the system to the email you registered</p> 
                    <button className='contentpage__button__loginPage'  onClick={movePageHandler}>Go To Login</button>
                </div>
            </div>
        <Footer />
    </div>
  )
}

export default Reset