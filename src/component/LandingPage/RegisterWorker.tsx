import React from 'react'
import { toastError } from '../../lib/toast/toast'
import { enumCityType, enumCountryType, enumEmploymentType, enumIndustryType, setRegisterStateType, setWorkerInputType, workerInputType } from '../../model/FormModel'

const RegisterWorker = ({ workerInput, setWorkerInput, registerStateData, setRegisterState }
  :
  { workerInput: workerInputType, setWorkerInput: setWorkerInputType, registerStateData: string[], setRegisterState: setRegisterStateType }) => {

  const resetWorker = () => {
    setWorkerInput((prev) => ({ ...prev, companyName: "", employmentType : "" , industry: "", country: "", city: "" }))
  }

  const workerInputType = () => {
    if (workerInput.companyName === "") {
      toastError("Please Enter Your Company Name", "top-right", "colored")
    } else if(workerInput.employmentType === ""){
      toastError("Please Enter Your EmploymentType Name", "top-right", "colored")  
    } else if (workerInput.country === "") {
      toastError("Please Enter Your Industry Name", "top-right", "colored")
    } else if (workerInput.country === "") {
      toastError("Please Enter Your Country Name", "top-right", "colored")
    } else if (workerInput.city === "") {
      toastError("Please Enter Your City Name", "top-right", "colored")
    } else {
      setRegisterState(registerStateData.at(5))
    }
  }

  const studentButton = () => {
    resetWorker()
    setRegisterState(registerStateData.at(4))
  }

  const backButton = () => {
    resetWorker()
    setRegisterState(registerStateData.at(2))
  }

  return (
    <>
      <div className='contentpage__top'>
        <p className='contentpage__top__title'>Where Are You Working Now ?</p>
        <p className='contentpage__top__content'>Your profile makes it easy for you to discover new people and opportunities</p>
      </div>
      <div className='contentpage__mid5'>
        <div className='contentpage__input__container'>
        
              <label htmlFor="firstName">Company Name</label>
              <input required type="text" placeholder='Enter Your Company Name' value={workerInput.companyName} onChange={(e) => setWorkerInput((prev) => ({ ...prev, companyName: e.target.value }))} />
            
          <div className='contentpage__input__container__group'>
            <div>
            <label htmlFor="lastName">Employment Type</label>
              <select value={workerInput.employmentType} onChange={(e) => setWorkerInput((prev) => ({ ...prev, employmentType: e.target.value }))}>
                <option value="" disabled>Select Your Type</option>
                {
                  Object.keys(enumEmploymentType).map((employmentData , id) => {
                    return (<option value={employmentData} key={id}>{employmentData}</option>)
                  })
                }
              </select>              
            </div>
            <div>
              <label htmlFor="lastName">Industry</label>
              <select value={workerInput.industry} onChange={(e) => setWorkerInput((prev) => ({ ...prev, industry: e.target.value }))}>
                <option value="" disabled>Select Your Industry</option>
                {
                  Object.keys(enumIndustryType).map((industryType , id) => {
                    return (<option value={industryType} key={id}>{industryType}</option>)
                  })
                }
              </select>
            </div>
          </div>

          <div className='contentpage__input__container__group'>
            <div>
              <label htmlFor="firstName">Country</label>
              <select value={workerInput.country} onChange={(e) => setWorkerInput((prev) => ({ ...prev, country: e.target.value }))}>
                <option value="" disabled>Select Your Country</option>
                {
                  Object.keys(enumCountryType).map((countryType , id) => {
                    return (<option value={countryType} key={id}>{countryType}</option>)
                  })
                }
              </select>
            </div>
            <div>
              <label htmlFor="lastName">City</label>
              <select value={workerInput.city} onChange={(e) => setWorkerInput((prev) => ({ ...prev, city: e.target.value }))}>
                <option value="" disabled>Select Your City</option>
                {
                  Object.keys(enumCityType).map((cityType , id) => {
                    return(<option value={cityType} key={id}>{cityType}</option>)
                  })
                }
              </select>
            </div>
          </div>
        </div>
        <button className='contentpage__button__signin' onClick={workerInputType}>Continue</button>
        <button className='contentpage__button__student' onClick={studentButton}>I'am a student</button>
        <button className='contentpage__button__google' onClick={backButton}>Back</button>
      </div>
    </>
  )
}

export default RegisterWorker