import React from 'react'
import { useNavigate } from 'react-router-dom';
import { UserType } from '../../../model/model'

const MessageMyProfile = ({profileData} : {profileData : UserType}) => {
  
  console.log(profileData);
  const navigate = useNavigate()
  
  const handleGoToProfile = () => {
      navigate(`/mainPage/profile/${profileData.id}`)
  }

  return (
    <div className='my-profile-container' onClick={handleGoToProfile}>
        <div className="my-profile-left-container">
            {
              profileData.profileImageUrl === "" ? 
              (<img className='profile-photo' src={'../../../src/assets/dummy_avatar.jpg'} alt="" />)
              :
              (<img className='profile-photo' src={profileData.profileImageUrl} alt="" />)
            }
        </div>
        <div className="my-profile-right-container">
            <p className='username'>{profileData.firstName} {profileData.lastName}</p>
            <p className='headline'>{profileData.headline}</p>
            <p className='user-relation'>
                <span><b>{profileData.Follows.length}</b> Followers </span>
                <span><b>{profileData.Connections.length}</b> Connections </span>
                <span><b>{profileData.Visits.length}</b> Visits </span>
            </p>
        </div>
    </div>  
  )
}

export default MessageMyProfile