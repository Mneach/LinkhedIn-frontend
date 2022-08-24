import React, { useState } from 'react'
import { toastError, toastPromise, toastSuccess } from '../../lib/toast/toast'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { educationInputType, registerInputType, setRegisterInputType, setRegisterStateType, timeInputType, workerInputType } from '../../model/FormModel'
import { storage } from '../../lib/firebase/FirebaseConfig';
import { useMutation } from '@apollo/client';
import { mutationAddEducation, mutationAddExperience, mutationRegisterUser } from '../../lib/graphql/query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const RegisterProfilePhoto = ({ registerData, educationData, workerData, timeInput, registerStateData, setRegisterState }
  :
  { registerData: registerInputType, educationData: educationInputType, workerData: workerInputType, timeInput: timeInputType, registerStateData: string[], setRegisterState: setRegisterStateType }) => {

  const navigate = useNavigate()
  const [addUser] = useMutation(mutationRegisterUser)
  const [addEducation] = useMutation(mutationAddEducation)
  const [addExperience] = useMutation(mutationAddExperience)
  const [imageFile, setImageFile] = useState<File>()
  const [localUrl, setLocalUrl] = useState(registerData.profileImageUrl)

  const mutationUser = async (imageUrl: string) => {
    addUser({
      variables: {
        email: registerData.email,
        password: registerData.password,
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        city: registerData.city,
        country: registerData.country,
        profileImageUrl: imageUrl
      }
    }).then((e) => {
      console.log(e)

      if (educationData.school == "") {
        mutationExperience(e.data.registerUser.id)
      } else {
        mutationEducation(e.data.registerUser.id)
      }

    }).catch((error) => {
      toastError(`${error}`, "top-right", "colored")
    })
  }

  const mutationEducation = (userId : string) => {
    console.log(userId)
    addEducation({
      variables: {
        userId: userId,
        school: educationData.school,
        degree: educationData.degree,
        fieldStudy: educationData.fieldStudy,
        grade: educationData.grade,
        activities: educationData.activities,
        description: educationData.description,
        monthStartDate: timeInput.monthStartDate,
        monthEndDate: timeInput.monthEndDate,
        yearStartDate: timeInput.yearStartDate,
        yearEndDate: timeInput.yearEndDate,
      }
    }).then((e) => {
      console.log(e)
      toastSuccess("Success Register", "top-right", "colored")
      navigate('/activation')
    }).catch((error) => {
      toastError(`${error}`, "top-right", "colored")
    })
  }

  const mutationExperience = (userId : string) => {
    console.log(userId)
    console.log(workerData)
    console.log(workerData.isActive)
    addExperience({
      variables: {
        userId: userId,
        employmentType: workerData.employmentType,
        companyName: workerData.companyName,
        country: workerData.country,
        city: workerData.city,
        isActive: true,
        industry: workerData.industry,
        monthStartDate: timeInput.monthStartDate,
        monthEndDate: timeInput.monthEndDate,
        yearStartDate: timeInput.yearStartDate,
        yearEndDate: timeInput.yearEndDate,
      }
    }).then((e) => {
      console.log(e)
      toastSuccess("Success Register", "top-right", "colored")
      navigate('/activation')
    }).catch((error) => {
      toastError(`${error}`, "top-right", "colored")
    })
  }

  const mutationRegister = async () => {

    let imageUrl = ''

    if (imageFile !== undefined) {
      const refStorage = ref(storage, `${registerData.email}/${(imageFile as File).name}`)
      await uploadBytes(refStorage, imageFile as File, { contentType: 'profile pic' })
      imageUrl = await getDownloadURL(refStorage)
      console.log(imageUrl)
      mutationUser(imageUrl)
      // mutationExperience()
    }else{
      mutationUser(registerData.profileImageUrl)
    }

  }

  const skipButton = () => {
    mutationUser(registerData.profileImageUrl)
    console.log("skpi button clicked")
  }

  const backButton = () => {
    setRegisterState(registerStateData.at(5))
  }

  const changeImageHandler = (e: any) => {
    const urlFile = URL.createObjectURL(e.target.files[0])
    setImageFile((e.target.files as FileList)[0] as File)
    setLocalUrl(urlFile)
  }

  return (
    <>
      <div className='contentpage__top'>
        <p className='contentpage__top__title'>Want to update your profile photo?</p>
        <p className='contentpage__top__content'>By showing your photo, other people will easily recognize you</p>
      </div>
      <div className='contentpage__mid'>
        <div className='contentpage__input__container2'>
          <label htmlFor="file-input" className='contentpage__input__container2__image-upload'>
            {
              localUrl === "" ?
                (<img src="src/assets/dummy_avatar.jpg" />)
                :
                (<img src={localUrl} />)
            }
          </label>

          <input id="file-input" type="file" onChange={(e) => changeImageHandler(e)} style={{ display: "none" }} />
        </div>
        <p>Update Your Photo</p>
        <button className='contentpage__button__signin' onClick={mutationRegister}>Continue</button>
        <button className='contentpage__button__student' onClick={skipButton}>Skip</button>
        <button className='contentpage__button__google' onClick={backButton}>Back</button>
        {/* <button className='contentpage__button__google' onClick={update}>Update</button> */}
      </div>
    </>
  )
}
