import { useMutation } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import { useUserContext } from '../../../hooks/UserContext'
import { mutationDeleteEducation } from '../../../lib/graphql/DeleteQuery'
import { toastError, toastSuccess } from '../../../lib/toast/toast'
import { EducationType } from '../../../model/model'
import EducationModalEdit from '../modal/EducationModalEdit'

const Education = ({ educationData }: { educationData: EducationType }) => {

  const UserContext = useUserContext()
  const [educationDeleteMutation, { loading, error, called }] = useMutation(mutationDeleteEducation)
  const [modalEducation, setModalEducation] = useState(false)

  const handleDeleteEducation = () => {
    educationDeleteMutation({ variables: { id: educationData.id } })
  }

  useEffect(() => {
    if (!error) {
      if (called && !loading) {
        UserContext.userRefetch().then((e) => {
          toastSuccess("Delete Education Success!", 'top-right', 'colored')
        }).catch((error) => {
          toastError(error, 'top-right', 'colored')
        })
      }
    } else {
      toastError(`${error}`, 'top-right', 'colored')
    }
  }, [called, loading])

  const handleModalEducation = () => {
    if (modalEducation) setModalEducation(false);
    else setModalEducation(true)
  }

  return (
    <>
      {
        modalEducation === true && <EducationModalEdit key={educationData.id} educationUser={educationData} modalEducation={modalEducation} setModalEducation={setModalEducation} />
      }
      <div className='profile-container__mid-container__education-container__content-container'>
        <div className='profile-container__mid-container__education-container__content-container__left-content'>
          <p className='school'>{educationData.school}</p>
          <p className='degree'>{educationData.degree}, {educationData.fieldStudy}</p>
          <p className='date'>{educationData.yearStartDate} - {educationData.yearEndDate}</p>
        </div>
        {
          UserContext.User.id === educationData.userId ?
            (
              <div className='profile-container__mid-container__education-container__content-container__right-content'>
                <button onClick={handleDeleteEducation}>
                  <img src="../../src/assets/trash.png" alt="" />
                </button>
                <button onClick={handleModalEducation}>
                  <img src="../../src/assets/pencil.png" alt="" />
                </button>
              </div>
            ) : (null)
        }
      </div>
    </>
  )
}

export default Education