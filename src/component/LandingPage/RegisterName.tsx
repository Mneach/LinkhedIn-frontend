import React from 'react'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { toastError, toastSuccess } from '../../lib/toast/toast'
import { registerInputType, setRegisterInputType, setRegisterStateType } from '../../model/FormModel'

const RegisterName = ({ registerData, setRegisterData, registerStateData, setRegisterState }
  :
  { registerData: registerInputType, setRegisterData: setRegisterInputType, registerStateData: string[], setRegisterState: setRegisterStateType }) => {


  const resetRegisterName = () => {
    setRegisterData((prev) => ({ ...prev, firstName: "", lastName: "" }))
  }
  
  const RegisterNameHandler = () => {
    if(registerData.firstName === ""){
      toastError("Please Enter Your First Name" , "top-right" , "colored")
    }else if(registerData.lastName === ""){
      toastError("Please Enter Your Last Name" , "top-right" , "colored")
    }else{
      setRegisterState(registerStateData.at(2))
    }
  }

  const backButton = () => {
    resetRegisterName()
    setRegisterState(registerStateData.at(0))
  }

  return (
    <>
      <div className='contentpage__top'>
          <p className='contentpage__top__title'>Hello!</p>
          <p className='contentpage__top__content'>People Can Almost Recognize You</p>
      </div>
      <div className='contentpage__mid'>
        <div className='contentpage__input__container'>
          <label htmlFor="firstName">First Name</label>
          <input required type="text" placeholder='Enter Your First Name' value={registerData.firstName} onChange={(e) => setRegisterData((prev) => ({ ...prev, firstName: e.target.value }))} />
          <label htmlFor="lastName">Last Name</label>
          <input required type="text" placeholder='Enter Your Last Name' value={registerData.lastName} onChange={(e) => setRegisterData((prev) => ({ ...prev, lastName: e.target.value }))} />
        </div>
        <button className='contentpage__button__signin' onClick={RegisterNameHandler}>Continue</button>
        <button className='contentpage__button__google' onClick={backButton}>Back</button>
      </div>
    </>
  )
}

export default RegisterName