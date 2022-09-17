import React from 'react'
import { useNavigate } from 'react-router-dom';
import { NotificationType } from '../../../model/model'

const NotificationCard = ({ notificationData }: { notificationData: NotificationType }) => {

    console.log(notificationData);

    const navigate = useNavigate()
    const moveToProfilePage = () => {
        navigate(`/mainPage/profile/${notificationData.fromUser.id}`)
    }

    return (
        <div className="notification-mid-content-container" onClick={moveToProfilePage}>
            <div className='notificaiton-left-card-container'>
                {
                    notificationData.fromUser.profileImageUrl === "" ?
                    (<img src={"../../../../src/assets/dummy_avatar.jpg"} alt="" />) : (<img src={notificationData.fromUser.profileImageUrl} alt="" />)
                }
            </div>
            <div className='notificaiton-right-card-container'>
                <p className='text'>
                    <span className='username'>
                        {notificationData.fromUser.firstName} {notificationData.fromUser.lastName}
                    </span>
                    <span>
                        &nbsp; {notificationData.message}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default NotificationCard