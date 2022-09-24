import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../../hooks/UserContext'
import { toastError } from '../../../lib/toast/toast'
import { setBoolean, setSearchUserMessageType, setString } from '../../../model/FormModel'
import { BlockType, RoomType, UserType } from '../../../model/model'

const SearchUserModalHome = ({ connectionUserData, setSelectedUser, setSearchUserInput, roomData, userBlockData , setHaveRoom , setRoomId }: { connectionUserData: UserType, setSelectedUser: setSearchUserMessageType, setSearchUserInput: setString, roomData: Array<RoomType>, userBlockData: Array<BlockType> , setHaveRoom :setBoolean , setRoomId : setString }) => {
    const navigate = useNavigate()

    console.log(userBlockData);


    const handleChooseUser = () => {
        let check = false;
        let roomId: string = "";
        roomData.map((roomData) => {
            if (connectionUserData.id === roomData.user1.id || connectionUserData.id === roomData.user2.id) {
                check = true
                roomId = roomData.id
            }
        })

        if(check && roomId !== ""){
            setRoomId(roomId)
            setHaveRoom(true)
        }else{
            setHaveRoom(false)
        }

        let checkUserBlock = false;
        let checkCurrentUserBlock = false;

        userBlockData.map((userBlockData) => {
            if (userBlockData.blockId === connectionUserData.id) {
                checkUserBlock = true;
            } else if (userBlockData.userId === connectionUserData.id) {
                checkCurrentUserBlock = true;
            }
        })

        if (checkUserBlock) {
            toastError("Your cannot send a message , because your block this user", "top-right", "colored")
            setSearchUserInput("")
        } else if (checkCurrentUserBlock) {
            const fullName = connectionUserData.firstName.concat(" ").concat(connectionUserData.lastName)
            toastError(`Your cannot send a message , beacause your blocked by ${fullName} `, "top-right", "colored")
            setSearchUserInput("")
        } else {
            setSelectedUser(() => ({ userId: connectionUserData.id, firstName: connectionUserData.firstName, lastName: connectionUserData.lastName, profileImageUrl: connectionUserData.profileImageUrl, headline: connectionUserData.headline }))
            setSearchUserInput("")
        }

    }

    return (
        <div className="modal-search-user-content-container" onClick={handleChooseUser}>
            <div className='left-content-container'>
                {
                    connectionUserData.profileImageUrl === "" ?
                        (<img className='profile-photo' src={"../../src/assets/dummy_avatar.jpg"} alt="" />) : (<img className='profile-photo' src={connectionUserData.profileImageUrl} alt="" />)
                }
            </div>
            <div className="right-content-container">
                <p className='username'>{connectionUserData.firstName} {connectionUserData.lastName}</p>
                <p className='headline'>{connectionUserData.headline}</p>
            </div>
        </div>
    )
}

export default SearchUserModalHome