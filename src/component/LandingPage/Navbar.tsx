import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import '../../sass/layout/LandingPage/navbar.scss'

const Navbar = ({ navbarModel }: { navbarModel: string }) => {

  const navigate = useNavigate()

  const goToLogin = () => {
    navigate('/')
  }

  const goToRegister = () => {
    navigate('/register')
  }

  return (
    <div>
      {
        navbarModel === "model1" ?
          (
            <nav className="nav">

              <div>
                <Link to={'/'}>
                  <img src={"/src/assets/linkhedin-logo.png"} alt="" />
                </Link>
              </div>
            </nav>
          )
          :
          (
            <nav className="nav2">
              <div className='nav2__leftContent'>
                <Link to={'/'}>
                  <img src={"/src/assets/linkhedin-logo.png"} alt="" />
                </Link>
              </div>
              <div className='nav2__rightContent'>
                <button onClick={goToLogin} className='nav2__button__signIn'>Sign In</button>
                <button onClick={goToRegister} className='nav2__button__joinNow'>Join Now</button>
              </div>
            </nav>
          )
      }
    </div>
  )
}

export default Navbar