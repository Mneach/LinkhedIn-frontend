import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../../hooks/UserContext'
import { mutationUpdateUser } from '../../../lib/graphql/query'
import { toastError, toastSuccess } from '../../../lib/toast/toast'
import { setBoolean, setUserType } from '../../../model/FormModel'
import { UserType } from '../../../model/model'

const UserInformationModal = ({ modalUser, setModalUser }: { modalUser: boolean, setModalUser: setBoolean }) => {

    const UserContext = useUserContext()
    console.log(UserContext.User)

    const [updateUser, { called, error, loading }] = useMutation(mutationUpdateUser)
    const [userData, setUserData] = useState({
        firstName: UserContext.User.firstName,
        lastName: UserContext.User.lastName,
        additionalName: UserContext.User.additionalName,
        pronouns: UserContext.User.pronouns,
        headline: UserContext.User.headline,
        password: UserContext.User.password,
        city: UserContext.User.city,
        country: UserContext.User.country,
    })

    const handleUpdateUser = () => {
        if (userData.firstName === "") {
            setUserData((prev) => ({ ...prev, firstName: UserContext.User.firstName }))
        } else if (userData.lastName === "") {
            setUserData((prev) => ({ ...prev, lastName: UserContext.User.lastName }))
        } else {
            updateUser({
                variables: {
                    id: UserContext.User.id,
                    email: UserContext.User.email,
                    password: UserContext.User.password,
                    isActive: UserContext.User.isActive,
                    about: UserContext.User.about,
                    profileImageUrl: UserContext.User.profileImageUrl,
                    backgroundImageUrl: UserContext.User.backgroundImageUrl,
                    profileLink: UserContext.User.profileLink,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    pronouns: userData.pronouns,
                    headline: userData.headline,
                    country: userData.country,
                    city: userData.city
                }
            })
        }
    }

    useEffect(() => {
        if(!error){
            if(called && !loading){
                UserContext.userRefetch().then((e) => {
                    toastSuccess("Success Update!" , 'top-right' , 'colored')
                    handleModalUser()
                }).catch((error) => {
                    toastError(error , 'top-right' , 'colored')
                })
            }
        }else{
            toastError(`${error}` , 'top-right' , 'colored')
        }
    } , [called , loading])

    const handleModalUser = () => {
        setModalUser(false)
    }

    return (
        <div className='modal-container'>
            <div className='modal-content'>
                <div className='modal-content__title-container'>
                    <p className='title'>Edit Intro</p>
                    <button className='button1' onClick={handleModalUser}>
                        <img src="../../src/assets/close.png" alt="" />
                    </button>
                </div>
                <div className='line-modal'></div>
                <div className='modal-content__content-container'>
                    <div className='content'>
                        <label htmlFor="firstName">First Name</label>
                        <input className='inputText' required type="text" placeholder='Enter Your First Name' value={userData.firstName} onChange={(e) => setUserData((prev) => ({ ...prev, firstName: e.target.value }))} />
                    </div>
                    <div className='content'>
                        <label htmlFor="lastName">Last Name</label>
                        <input className='inputText' required type="text" placeholder='Enter Your Last Name' value={userData.lastName} onChange={(e) => setUserData((prev) => ({ ...prev, lastName: e.target.value }))} />
                    </div>
                    <div className='content'>
                        <label htmlFor="AdditionalName">Additional Name</label>
                        <input className='inputText' required type="text" placeholder='Enter Your Additional Name' value={userData.additionalName} onChange={(e) => setUserData((prev) => ({ ...prev, additionalName: e.target.value }))} />
                    </div>
                    <div className='content'>
                        <label htmlFor="Pronouns">Pronouns</label>
                        <select className='inputSelect' value={userData.pronouns} onChange={(e) => setUserData((prev) => ({ ...prev, pronouns: e.target.value }))}>
                            <option value="">Select Your Pronouns</option>
                            <option value="She/Her">She/Her</option>
                            <option value="He/Him">He/Him</option>
                            <option value="They/Them">They/Them</option>
                        </select>
                    </div>
                    <div className='content'>
                        <label htmlFor="HeadLine">HeadLine</label>
                        <input className='inputText' required type="text" placeholder='Enter Your Headline' value={userData.headline} onChange={(e) => setUserData((prev) => ({ ...prev, headline: e.target.value }))} />
                    </div>
                    <div className='content'>
                        <label htmlFor="Location">Location</label>
                        <select className='inputSelect' placeholder='Enter Your Location' value={userData.country} onChange={(e) => setUserData((prev) => ({ ...prev, country: e.target.value }))}>
                            <option value="">Select Your Country</option>
                            <option value="Indonesia" >Indonesia</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Vietnam">Vietnam</option>
                            <option value="Amerika">Amerika</option>
                            <option value="England">England</option>
                        </select>
                    </div>
                    <div className='content'>
                        <label htmlFor="City">City</label>
                        <select className='inputSelect' placeholder='Enter Your City' value={userData.city} onChange={(e) => setUserData((prev) => ({ ...prev, city: e.target.value }))} >
                            <option value="">Select Your City</option>
                            <option value="Jakarta">Jakarta</option>
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
                    </div>
                    <div className='button-container'>
                        <button className='button-submit' onClick={handleUpdateUser}>Update</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserInformationModal