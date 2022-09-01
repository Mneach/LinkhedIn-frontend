import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../../hooks/UserContext'
import { mutationDeleteExperience } from '../../../lib/graphql/DeleteQuery'
import { toastError, toastSuccess } from '../../../lib/toast/toast'
import { ExperienceType } from '../../../model/model'
import ExperienceModalEdit from '../modal/ExperienceModalEdit'

const Experience = ({ experienceData }: { experienceData: ExperienceType }) => {
  const UserContext = useUserContext()

  const [experienceDeleteMutation, { loading, error, called }] = useMutation(mutationDeleteExperience)
  const [modalExperience, setModalExperience] = useState(false)

  useEffect(() => {
    if (!error) {
      if (called && !loading) {
        UserContext.userRefetch().then((e) => {
          toastSuccess("Delete Experience Success!", 'top-right', 'colored')
        }).catch((error) => {
          toastError(error, 'top-right', 'colored')
        })
      }
    } else {
      toastError(`${error}`, 'top-right', 'colored')
    }
  }, [called, loading])

  const handleDeleteExperience = () => {
    experienceDeleteMutation({ variables: { id: experienceData.id } })
  }

  const handleModalExperience = () => {
    if (modalExperience) setModalExperience(false);
    else setModalExperience(true)
  }


  return (
    <>
      {
        modalExperience === true && <ExperienceModalEdit experienceUser={experienceData} modalExperience={modalExperience} setModalExperience={setModalExperience} />
      }
      <div className='profile-container__mid-container__experience-container__content-container'>
        <div className='profile-container__mid-container__experience-container__content-container__left-content'>
          <p className='title'>{experienceData.title}</p>
          <p className='companyName'>{experienceData.companyName}, {experienceData.employmentType}</p>
          <p className='date'> {experienceData.monthStartDate} {experienceData.yearStartDate} - {experienceData.monthEndDate} {experienceData.yearEndDate}</p>
          <p className='location'>{experienceData.city}, {experienceData.country}</p>
        </div>
        {
          UserContext.User.id === experienceData.userId ?
            (
              <div className='profile-container__mid-container__experience-container__content-container__right-content'>
                <button onClick={handleDeleteExperience}>
                  <img src="../../src/assets/trash.png" alt="" />
                </button>
                <button onClick={handleModalExperience} >
                  <img src="../../src/assets/pencil.png" alt="" />
                </button>
              </div>
            ) : (null)
        }
      </div>
    </>
  )
}

export default Experience