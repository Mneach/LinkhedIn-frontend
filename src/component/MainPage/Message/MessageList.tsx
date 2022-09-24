import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { VscAdd } from 'react-icons/vsc'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../../hooks/UserContext'
import { queryRooms } from '../../../lib/graphql/SelectQuery'
import { RoomType } from '../../../model/model'

const MessageList = ({roomData} : {roomData : Array<RoomType>}) => {

    const UserContext = useUserContext()


    console.log(roomData);


    return (
        <>
            {
                roomData.map((roomData, index) => {
                    return (
                        <Link to={`${roomData.id}`} >
                            {
                                roomData.user1.id === UserContext.User.id ?
                                    (
                                        <div className="message-user-list-content-container">
                                            <div className="message-user-list-content">
                                                <div className="user-profile-container">
                                                    {
                                                        roomData.user2.profileImageUrl === "" ?
                                                            (<img className='user-profile' src={"../../src/assets/dummy_avatar.jpg"} alt="" />) : (<img className='user-profile' src={roomData.user2.profileImageUrl} alt="" />)
                                                    }
                                                </div>
                                                <div className="user-information-container">
                                                    <p className='username'>{roomData.user2.firstName} {roomData.user2.lastName}</p>
                                                    {
                                                        roomData.lastMessage.imageUrl === "" ?
                                                            (
                                                                roomData.lastMessage.sender.id === UserContext.User.id ?
                                                                    (<p className='lastMessage'>You : {roomData.lastMessage.text}</p>)
                                                                    :
                                                                    (<p className='lastMessage'>{roomData.user2.firstName} : {roomData.lastMessage.text}</p>)
                                                            )
                                                            :
                                                            (
                                                                roomData.lastMessage.sender.id === UserContext.User.id ?
                                                                    (<p className='lastMessage'>You : Sent a photo</p>)
                                                                    :
                                                                    (<p className='lastMessage'>{roomData.user2.firstName} : Sent a photo</p>)
                                                            )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                    :
                                    (
                                        <div className="message-user-list-content-container">
                                            <div className="message-user-list-content">
                                                <div className="user-profile-container">
                                                    {
                                                        roomData.user1.profileImageUrl === "" ?
                                                            (<img className='user-profile' src={"../../src/assets/dummy_avatar.jpg"} alt="" />) : (<img className='user-profile' src={roomData.user1.profileImageUrl} alt="" />)
                                                    }
                                                </div>
                                                <div className="user-information-container">
                                                    <p className='username'>{roomData.user1.firstName} {roomData.user1.lastName}</p>
                                                    {
                                                        roomData.lastMessage.imageUrl === "" ?
                                                            (
                                                                roomData.lastMessage.sender.id === UserContext.User.id ?
                                                                    (<p className='lastMessage'>You : {roomData.lastMessage.text}</p>)
                                                                    :
                                                                    (<p className='lastMessage'>{roomData.user1.firstName} : {roomData.lastMessage.text}</p>)
                                                            )
                                                            :
                                                            (
                                                                roomData.lastMessage.sender.id === UserContext.User.id ?
                                                                    (<p className='lastMessage'>You : {roomData.lastMessage.text}</p>)
                                                                    :
                                                                    (<p className='lastMessage'>{roomData.user1.firstName} : Sent a photo</p>)
                                                            )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                            }
                        </Link>
                    )
                })
            }
        </>
    )
}

export default MessageList