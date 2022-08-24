import React from 'react'
import { toastError } from '../../lib/toast/toast'
import { registerInputType, setRegisterInputType, setRegisterStateType } from '../../model/FormModel'

const RegisterResidence = ({ registerData, setRegisterData, registerStateData, setRegisterState , signInMethod}
  :
  { registerData: registerInputType, setRegisterData: setRegisterInputType, registerStateData: string[], setRegisterState: setRegisterStateType , signInMethod : string }) => {


  const resetRegisterResidence = () => {
    setRegisterData((prev) => ({ ...prev, country: "", city: "" }))
  }

  const RegisterResidenceHandler = () => {
    if (registerData.country === "") {
      toastError("Please Select Your Country", "top-right", "colored")
    } else if (registerData.city === "") {
      toastError("Please Select Your City", "top-right", "colored")
    } else {
      setRegisterState(registerStateData.at(3))
    }
  }

  const backButton = () => {
    if(signInMethod === "Google"){
      resetRegisterResidence()
      setRegisterState(registerStateData.at(7))
    }else{
      resetRegisterResidence()
      setRegisterState(registerStateData.at(1))
    }
  }


  return (
    <>
      <div className='contentpage__top'>
        <p className='contentpage__top__title'>Welcome {registerData.firstName}!</p>
        <p className='contentpage__top__content'>Let's start your profile , connect to people you know , and engange with them on topics you care about</p>
      </div>
      <div className='contentpage__mid'>
        <div className='contentpage__input__container'>
          <label htmlFor="firstName">Country</label>
          {/* <input required type="text" placeholder='Enter Your First Name' value={registerData.country} onChange={(e) => setRegisterData((prev) => ({ ...prev, firstName: e.target.value }))} /> */}
          <select value={registerData.country} onChange={(e) => setRegisterData((prev) => ({ ...prev, country: e.target.value }))}>
            <option value="" disabled>Select Your Country</option>
            <option value="Indonesia" >Indonesia</option>
            <option value="Singapore">Singapore</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Amerika">Amerika</option>
            <option value="England">England</option>
          </select>
          <label htmlFor="lastName">City</label>
          <select value={registerData.city} onChange={(e) => setRegisterData((prev) => ({ ...prev, city: e.target.value }))}>
            <option value="" disabled>Select Your City</option>
            <option value="Jakarta Raya">Jakarta</option>
            <option value="West Java">West Java</option>
            <option value="East Java">East Java</option>
            <option value="Central Java">Central Java</option>
            <option value="West Kalimantan">West Kalimantan</option>
            <option value="South Kalimantan">South Kalimantan</option>
            <option value="Central Kalimantan">Central Kalimantan</option>
            <option value="West Sumatra">West Sumatra</option>
            <option value="South Sumatra">South Sumatra</option>
            <option value="North Sumatra">North Sumatra</option>
            <option value="Bali">Bali</option>
            <option value="Banten">Banten</option>
          </select>
          {/* <input required type="text" placeholder='Enter Your Last Name' value={registerData.city} onChange={(e) => setRegisterData((prev) => ({ ...prev, lastName: e.target.value }))} /> */}
        </div>
        <button className='contentpage__button__signin' onClick={RegisterResidenceHandler}>Continue</button>
        <button className='contentpage__button__google' onClick={backButton}>Back</button>
      </div>
    </>
  )
}

export default RegisterResidence