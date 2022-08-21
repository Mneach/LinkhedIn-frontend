import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './page/LandingPage/Login'
import Register from './page/LandingPage/Register'
import ForgotPassword from './page/LandingPage/ForgotPassword'
import ActivationAccount from './page/LandingPage/ActivationAccount'
import Activation from './page/LandingPage/Activation'
import Home from './page/MainPage/Home'
import Reset from './page/LandingPage/Reset'
import ResetPassword from './page/LandingPage/ResetPassword'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/forgotPassword' element={<ForgotPassword />}></Route>
        <Route path='/activation' element={<Activation />}></Route>
        <Route path='/activationAccount/:activationId' element={<ActivationAccount />}></Route>
        <Route path='/reset' element={<Reset />}></Route>
        <Route path='/resetPassword/:resetPasswordId' element={<ResetPassword />}></Route>
        <Route path='/home' element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  ) 
}

export default App
