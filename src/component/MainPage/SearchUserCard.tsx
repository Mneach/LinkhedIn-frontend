import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserType } from '../../model/model'

const SearchUserCard = ({ dataUser }: { dataUser: UserType }) => {

    const navigate = useNavigate()
    const profileHandler = () => {
        navigate(`/mainPage/profile/${dataUser.id}`)
    }   

    return (
        <>
            <div className='user-container__content-container'>
                <div className='user-container__content-container__profile' onClick={profileHandler}>
                    {
                        dataUser.profileImageUrl === "" ? 
                        (<img src="../../src/assets/dummy_avatar.jpg" alt="" />) : (<img src={dataUser.profileImageUrl}></img>)
                    }
                </div>
                <div className='user-container__content-container__content'>
                    <div onClick={profileHandler} className="left-content">
                        <p className='name'>{dataUser.firstName} {dataUser.lastName}</p>
                        <p className='degree'>Computer Science at Binus University</p>
                        <p className='location'>{dataUser.city} , {dataUser.country}</p>
                    </div>
                    <div className='right-content'>
                        <button className='button3'>Connect</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchUserCard