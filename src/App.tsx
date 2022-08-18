import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './page/LandingPage/Login'
import Register from './page/LandingPage/Register'
import ForgotPassword from './page/LandingPage/ForgotPassword'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/forgotPassword' element={<ForgotPassword />}></Route>
      </Routes>
    </BrowserRouter>
  ) 
}

export default App
