import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Footer from '../../component/LandingPage/Footer'
import Navbar from '../../component/LandingPage/Navbar'
import Register from '../../component/LandingPage/Register'
import RegisterEducation from '../../component/LandingPage/RegisterEducation'
import RegisterGoogle from '../../component/LandingPage/RegisterGoogle'
import RegisterName from '../../component/LandingPage/RegisterName'
import { RegisterProfilePhoto } from '../../component/LandingPage/RegisterProfilePhoto'
import RegisterResidence from '../../component/LandingPage/RegisterResidence'
import RegisterTime from '../../component/LandingPage/RegisterTime'
import RegisterWorker from '../../component/LandingPage/RegisterWorker'
import { StorageKey } from '../../lib/keys/key'

import '../../sass/layout/LandingPage/content.scss'

const RegisterAccount = () => {
  useEffect(() => {
    if (localStorage.getItem(StorageKey.JwtTokenKey) !== null) {
      navigate("/mainPage")
    }
  }, [])
  
  const navigate = useNavigate();
  // const [regsiterUser, { data, loading, error }] = useMutation(mutationRegisterUser, { errorPolicy: "all" })
  const registerStateData = ["register", "username", "residence", "worker", "student", "time", "profilePhoto", "googleSignIn" , "insertDataWithProfile"]
  const [signInMethod , setSignInMethod] = useState("")
  const [registerState, setRegisterState] = useState(registerStateData.at(0))
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    backgroundImageUrl: "",
    profileImageUrl: "",
  })

  const [workerInput, setWorkerInput] = useState({
    userId: "",
    title : "",
    employmentType: "",
    companyName: "",
    country: "",
    city: "",
    isActive: true,
    industry: "",
  })

  const [educationInput, setEducationInput] = useState({
    userId: "",
    school: "",
    degree: "",
    fieldStudy: "",
    grade: "",
    activities: "",
    description: "",
  })

  const [timeInput, setTimeInput] = useState({
    monthStartDate: "",
    monthEndDate: "",
    yearStartDate: "",
    yearEndDate: "",
  })

  let userChoose: string = "worker"

  if (workerInput.companyName === "" || workerInput.industry === "" || workerInput.city === "") {
    userChoose = "education"
  } else {
    userChoose = "worker"
  }
  console.log(workerInput)

  return (
    <div>
      <Navbar navbarModel='model1' />
      <div className={"contentpage"}>
        {
          registerState === registerStateData.at(0) ?
            ( <Register registerData={registerData} setRegisterData={setRegisterData} registerStateData={registerStateData} setRegisterState={setRegisterState} signInMethod ={signInMethod} setSignInMethod={setSignInMethod} />)
            :
            (
              registerState === registerStateData.at(1) ?
                (<RegisterName registerData={registerData} setRegisterData={setRegisterData} registerStateData={registerStateData} setRegisterState={setRegisterState} />)
                :
                (
                  registerState === registerStateData.at(2) ?
                    ( <RegisterResidence registerData={registerData} setRegisterData={setRegisterData} registerStateData={registerStateData} setRegisterState={setRegisterState} signInMethod={signInMethod} />)
                    :
                    (
                      registerState === registerStateData.at(3) ?
                        (<RegisterWorker workerInput={workerInput} setWorkerInput={setWorkerInput} registerStateData={registerStateData} setRegisterState={setRegisterState} />)
                        :
                        (
                          registerState === registerStateData.at(4) ?
                            (<RegisterEducation educationInput={educationInput} setEducatoinInput={setEducationInput} registerStateData={registerStateData} setRegisterState={setRegisterState} />)
                            :
                            (
                              registerState === registerStateData.at(5) ?
                                (<RegisterTime timeInput={timeInput} setTimeInput={setTimeInput} registerStateData={registerStateData} setRegisterState={setRegisterState} userChoose={userChoose} />)
                                :
                                (
                                  registerState === registerStateData.at(6) ?
                                  (<RegisterProfilePhoto registerData={registerData} educationData = {educationInput} workerData ={workerInput} timeInput ={timeInput} registerStateData={registerStateData} setRegisterState={setRegisterState} />)
                                  :
                                  (
                                    <RegisterGoogle registerData={registerData} setRegisterData={setRegisterData} registerStateData={registerStateData} setRegisterState={setRegisterState} />
                                  )
                                )
                            )
                        )
                    )
                )
            )
        }


      </div>
      <Footer />
    </div>
  )
}

export default RegisterAccount