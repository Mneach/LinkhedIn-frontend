import React from 'react'

import '../../sass/layout/LandingPage/footer.scss'

const Footer = () => {
  return (
    <div className='footer'>
      <img src={"/src/assets/linkhedin-logo.png"} alt="" />
      <div className='footer__link'>
        <a href="#">User Aggrement</a>
      </div>
      <div className='footer__link'>
        <a href="#">Privacy Policy</a>
      </div>
      <div className='footer__link'>
        <a href="#">Comunity Guidelines</a>
      </div>
      <div className='footer__link'>
        <a href="#">Cookie Policy</a>
      </div>
      <div className='footer__link'>
        <a href="#">Copyright Policy</a>
      </div>
      <div className='footer__link'>
        <a href="#">Send Feedback</a>
      </div>
      <div className='footer__link'>
        <a href="#">Language</a>
      </div>
    </div>
  )
}

export default Footer