import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Education from '../../component/MainPage/Profile/Education'
import Experience from '../../component/MainPage/Profile/Experience'
import FollowPeopleProfile from '../../component/MainPage/Profile/FollowPeopleProfile'
import EducationModalAdd from '../../component/MainPage/modal/EducationModalAdd'
import ExperienceModalAdd from '../../component/MainPage/modal/ExperienceModalAdd'
import MoreModal from '../../component/MainPage/modal/MoreModal'
import Navbar from '../../component/MainPage/Navbar'
import UserInformation from '../../component/MainPage/Profile/UserInformation'
import { UserProvider, useUserContext } from '../../hooks/UserContext'
import { mutationVisitUser } from '../../lib/graphql/CreateQuery'
import { queryUser } from '../../lib/graphql/query'
import { UserType } from '../../model/model'

import '../../sass/page/profile.scss'

const Profile = () => {

    const { userId } = useParams()
    const UserContext = useUserContext()
    const [modalEducation, setModalEducation] = useState(false)
    const [modalExperience, setModalExperience] = useState(false)
    const [modalMore, setModalMore] = useState(false)
    const { loading, error, data, called , refetch : currentUserRefect } = useQuery(queryUser, { variables: { userId }, errorPolicy: "all" })
    const [VisitUserMutation, { loading: loadingVisit, error: errorVisit, data: dataVisit, called: calledVisit }] = useMutation(mutationVisitUser)

    useEffect(() => {
        if (UserContext.User.id !== userId) {
            console.log("updating visit data")
            VisitUserMutation({
                variables: {
                    id1: UserContext.User.id,
                    id2: userId
                }
            })
        }
    } , [])

    useEffect(() => {
        if (dataVisit && data) {
            if (dataVisit.VisitUser.length !== userData.Visits.length) {
                currentUserRefect()
            }
        }
    }, [loadingVisit, loading])

    if (loading) return <p>Get user data...</p>

    const userData = data.User as UserType

    const handleModalEducation = () => {
        if (modalEducation) setModalEducation(false);
        else setModalEducation(true)
    }

    const handleModalExperience = () => {
        if (modalExperience) setModalExperience(false);
        else setModalExperience(true)
    }


    return (
        <>
            {
                modalEducation === true && <EducationModalAdd key={100} modalEducation={modalEducation} setModalEducation={setModalEducation} />
            }
            {
                modalExperience === true && <ExperienceModalAdd key={101} modalExperience={modalExperience} setModalExperience={setModalExperience} />
            }
            <div style={{ backgroundColor: "rgb(238 , 238 , 238)", minHeight: "100vh" }}>
                <Navbar />
                <div className='profile-container'>
                    <div className='profile-container__mid-container'>
                        <div className='profile-container__mid-container__userInformation-container'>
                            <UserInformation userData={userData} refectCurrentUser={currentUserRefect} />
                        </div>
                        {
                            userData.Educations.length >= 0 && userData.id === UserContext.User.id ?
                                (
                                    <div className='profile-container__mid-container__education-container'>
                                        <div className='profile-container__mid-container__education-container__header'>
                                            <p className='title'>Education</p>
                                            <div className='profile-container__mid-container__education-container__header__button'>
                                                {
                                                    UserContext.User.id === userData.id ?
                                                        (
                                                            <button onClick={handleModalEducation}>
                                                                <img src="../../src/assets/plus.png" alt="" />
                                                            </button>
                                                        ) : (null)
                                                }
                                            </div>
                                        </div>
                                        {
                                            userData.Educations.length > 0 ?
                                                (
                                                    userData.Educations.map((educationData, i) => {
                                                        return (<Education educationData={educationData} key={i} />)
                                                    })
                                                ) : (null)
                                        }
                                    </div>
                                )
                                :
                                (
                                    userData.Educations.length > 0 ?
                                        (
                                            <div className='profile-container__mid-container__education-container'>
                                                <div className='profile-container__mid-container__education-container__header'>
                                                    <p className='title'>Education</p>
                                                </div>
                                                {
                                                    userData.Educations.map((educationData, i) => {
                                                        return (<Education educationData={educationData} key={i} />)
                                                    })
                                                }
                                            </div>
                                        ) : (null)
                                )
                        }
                        {
                            userData.Experiences.length >= 0 && userData.id === UserContext.User.id ?
                                (
                                    <div className='profile-container__mid-container__experience-container'>
                                        <div className='profile-container__mid-container__experience-container__header'>
                                            <p className='title'>Experience</p>
                                            <div className='profile-container__mid-container__experience-container__header__button'>
                                                {
                                                    userData.id === UserContext.User.id ?
                                                        (
                                                            <button onClick={handleModalExperience}>
                                                                <img src="../../src/assets/plus.png" alt="" />
                                                            </button>
                                                        ) : (null)
                                                }
                                            </div>
                                        </div>
                                        {
                                            userData.Experiences.map((experienceData, i) => {
                                                return (<Experience experienceData={experienceData} key={i} />)
                                            })
                                        }
                                    </div>
                                )
                                :
                                (
                                    <div className='profile-container__mid-container__experience-container'>
                                        <div className='profile-container__mid-container__experience-container__header'>
                                            <p className='title'>Experience</p>
                                        </div>
                                        {
                                            userData.Experiences.map((experienceData, i) => {
                                                return (<Experience experienceData={experienceData} key={i} />)
                                            })
                                        }
                                    </div>
                                )
                        }

                    </div>

                    <div className='profile-container__right-container'>
                        <div className='profile-container__right-container__content1-container'>
                            <p className='title'>People You Might Know</p>
                            <FollowPeopleProfile />
                            <FollowPeopleProfile />
                            <FollowPeopleProfile />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Profile