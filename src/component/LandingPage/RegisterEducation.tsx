import React from 'react'
import { toastError } from '../../lib/toast/toast'
import { educationInputType, setEducationInputType, setRegisterStateType } from '../../model/FormModel'

const RegisterEducation = ({ educationInput, setEducatoinInput, registerStateData, setRegisterState }
  :
  { educationInput: educationInputType, setEducatoinInput: setEducationInputType, registerStateData: string[], setRegisterState: setRegisterStateType }) => {


  const resetEducation = () => {
    setEducatoinInput((prev) => ({ ...prev, school: "", degree: "", fieldStudy: "", grade: "", activities: "", description: "" }))
  }

  const workerInputHandler = () => {
    if (educationInput.school === "") {
      toastError("Please Input Your School Name", "top-right", "colored")
    } else if (educationInput.degree === "") {
      toastError("Please Input Your Degree", "top-right", "colored")
    } else if (educationInput.fieldStudy === "") {
      toastError("Please Input Your Field Study", "top-right", "colored")
    } else if (educationInput.grade === "") {
      toastError("Please Input Your grade", "top-right", "colored")
    } else if (educationInput.activities === "") {
      toastError("Please Input Your Activities and Societies", "top-right", "colored")
    } else if (educationInput.description === "") {
      toastError("Please Input description", "top-right", "colored")
    } else {
      setRegisterState(registerStateData.at(5))
    }
  }

  const workerButton = () => {
    resetEducation()
    setRegisterState(registerStateData.at(3))
  }

  const backButton = () => {
    resetEducation()
    setRegisterState(registerStateData.at(2))
  }

  return (
    <>
      <div className='contentpage__top'>
        <p className='contentpage__top__title'>Enter Your School Data</p>
        <p className='contentpage__top__content'>Your profile makes it easy for you to discover new people and opportunities</p>
      </div>
      <div className='contentpage__mid6'>
        <div className='contentpage__input__container'>
          <div className='contentpage__input__container__group'>
            <div>
              <label htmlFor="firstName">School Name</label>
              <input required type="text" placeholder='Enter Your School Name' value={educationInput.school} onChange={(e) => setEducatoinInput((prev) => ({ ...prev, school: e.target.value }))} />
            </div>
            <div>
              <label htmlFor="lastName">Degree </label>
              <input required type="text" placeholder='Enter Your Degree' value={educationInput.degree} onChange={(e) => setEducatoinInput((prev) => ({ ...prev, degree: e.target.value }))} />
            </div>
          </div>

          <div className='contentpage__input__container__group'>
            <div>
              <label htmlFor="firstName">Field Study</label>
              <input required type="text" placeholder='Enter Your Field Study' value={educationInput.fieldStudy} onChange={(e) => setEducatoinInput((prev) => ({ ...prev, fieldStudy: e.target.value }))} />
            </div>
            <div>
              <label htmlFor="lastName">Grade </label>
              <input required type="text" placeholder='Enter Your Grade' value={educationInput.grade} onChange={(e) => setEducatoinInput((prev) => ({ ...prev, grade: e.target.value }))} />
            </div>
          </div>

          <div className='contentpage__input__container__group'>
            <div>
              <label htmlFor="firstName">Activities & Societies</label>
              <input required type="text" placeholder='Enter Your Activites And Societies' value={educationInput.activities} onChange={(e) => setEducatoinInput((prev) => ({ ...prev, activities: e.target.value }))} />
            </div>
            <div>
              <label htmlFor="lastName">Description</label>
              <input required type="text" placeholder='Enter Description' value={educationInput.description} onChange={(e) => setEducatoinInput((prev) => ({ ...prev, description: e.target.value }))} />
            </div>
          </div>
        </div>
        
        <button className='contentpage__button__signin' onClick={workerInputHandler}>Continue</button>
        <button className='contentpage__button__student' onClick={workerButton}>I'am a Worker</button>
        <button className='contentpage__button__google' onClick={backButton}>Back</button>
      </div>
    </>
  )
}

export default RegisterEducation