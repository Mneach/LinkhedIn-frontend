import { useMutation, useQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { FaRegTimesCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../../hooks/UserContext'
import { mutationAddMessage, mutationAddMessageShareProfile, mutationAddRoom } from '../../../lib/graphql/CreateQuery'
import { queryBlocks, queryRooms, queryUserConnections } from '../../../lib/graphql/SelectQuery'
import { toastError, toastSuccess } from '../../../lib/toast/toast'
import { setBoolean } from '../../../model/FormModel'
import { RoomType, UserType } from '../../../model/model'
import SearchUserModalProfile from './SearchUserModalProfile'

const ShareProfileModal = ({ userData, setModalShareProfile }: { userData: UserType, setModalShareProfile: setBoolean }) => {

    const navigate = useNavigate()
    const UserContext = useUserContext()
    const [searchUserInput, setSearchUserInput] = useState("")
    const [buttonDisable, setButtonDisable] = useState(true)
    const [haveRoom, setHaveRoom] = useState(true)
    const [roomId, setRoomId] = useState("")
    const [roomMutation] = useMutation(mutationAddRoom)
    const [shareProfileMutation] = useMutation(mutationAddMessageShareProfile)
    const [selectedUser, setSelectedUser] = useState({
        userId: "",
        profileImageUrl: "",
        firstName: "",
        lastName: "",
        headline: "",
    })
    const { loading: loadingConnection, data: dataConnection, } = useQuery(queryUserConnections, { variables: { userId: UserContext.User.id } })
    const { loading, error, data, startPolling } = useQuery(queryRooms, { variables: { userId: UserContext.User.id } })
    const { loading: loadingBLock, data: dataBlock, refetch : refetchBlock } = useQuery(queryBlocks, { variables: { userId: UserContext.User.id } })

    useEffect(() => {
        refetchBlock()
    } , [])

    useEffect(() => {
        if (selectedUser.userId !== "") {
            setButtonDisable(false)
        } else {
            setButtonDisable(true)
        }
    }, [selectedUser.userId])

    if (loadingConnection || loading || loadingBLock) return <p>Get Message Data...</p>

    const UserConnectionData = dataConnection.UserConnected as Array<UserType>
    const connectionDataFilter = UserConnectionData.filter((connectionData) => {
        const fullUsername = connectionData.firstName.concat(" ").concat(connectionData.lastName)
        return (
            connectionData.firstName.toLowerCase().includes(searchUserInput) ||
            connectionData.lastName.toLowerCase().includes(searchUserInput) ||
            fullUsername.toLowerCase().includes(searchUserInput)
        )
    })

    const handleShareProfile = (roomId : string) => {

        shareProfileMutation({
            variables: {
                senderId: UserContext.User.id,
                roomId: roomId,
                ShareProfileId: userData.id
            }
        }).then((e) => {
            setSelectedUser((prev) => ({ firstName: "", lastName: "", profileImageUrl: "", userId: "", headline: "" }))
            toastSuccess("Success Share Profile" , "top-right" , "colored")
            navigate(`/mainPage/message/${roomId}`)
        }).catch((e) => {
            toastError((e), "top-right", "colored")
        })
    }

    const handleAddRoom = () => {
        roomMutation({
            variables: {
                userId1: UserContext.User.id,
                userId2: selectedUser.userId
            }
        }).then((e) => {
            const roomData = e.data.addRoom as RoomType
            handleShareProfile(roomData.id)
        }).catch((e) => {
            toastError((e), "top-right", "colored")
        })
    }

    const handleSendProfile = () => {
        if (haveRoom) {
            handleShareProfile(roomId)
        } else {
            handleAddRoom()
        }
    }

    console.log(selectedUser);
    console.log(haveRoom);


    return (
        <div className='modal-share-profile-container'>
            <div className="modal-share-profile-content-container">
                <div className="modal-share-profile-top-container">
                    <div className="modal-share-top-content-container">
                        <p className='title'>Share Profile</p>
                        <button className='button-exit' onClick={() => setModalShareProfile(false)}>
                            <FaRegTimesCircle size={25} />
                        </button>
                    </div>
                </div>
                <div className="modal-share-profile-mid-container">
                    <div className='modal-share-profile-mid-content-container'>
                        <div className="user-information-search-container">
                            <input className='search-user' value={searchUserInput} onChange={(e) => setSearchUserInput(e.target.value)} placeholder='Type a name..' type="text" />
                            <div className='search-user-content-container'>
                                {
                                    searchUserInput !== "" &&
                                    <div className='modal-search-user-container'>
                                        {
                                            searchUserInput !== "" && connectionDataFilter.map((connectionUserData) => {
                                                return (<SearchUserModalProfile roomData={data.rooms} userBlockData={dataBlock.blocks} connectionUserData={connectionUserData} setSearchUserInput={setSearchUserInput} setSelectedUser={setSelectedUser} setHaveRoom={setHaveRoom} setRoomId={setRoomId} />)
                                            })
                                        }
                                    </div>
                                }

                            </div>
                        </div>
                        <div className='user-information-container'>
                            <div className="user-information-top-container">
                                {
                                    userData.profileImageUrl === "" ?
                                        (<img className='profile-photo' src={'../../../src/assets/dummy_avatar.jpg'} alt="" />)
                                        :
                                        (<img className='profile-photo' src={userData.profileImageUrl} alt="" />)
                                }
                            </div>
                            <div className="user-information-bottom-container">
                                <p className='username'>{userData.firstName} {userData.lastName}</p>
                                <p className='headline'>{userData.headline}</p>
                                <p className='user-relation'>
                                    <span> <b>{userData.Follows.length}</b> followers,  </span>
                                    <span><b>{userData.Connections.length}</b> connections,  </span>
                                    <span><b>{userData.Visits.length}</b> visit  </span>
                                </p>
                            </div>
                        </div>
                        {
                            selectedUser.userId !== "" && <div className="search-user-information-mid-container">
                                <p className='title'>This Profile Will Share To</p>
                                <div className='search-user-information-content'>
                                    {
                                        selectedUser.profileImageUrl === "" ?
                                            (<img className='search-user-profile-photo' src={'../../../src/assets/dummy_avatar.jpg'} alt="" />)
                                            :
                                            (<img className='search-user-profile-photo' src={selectedUser.profileImageUrl} alt="" />)
                                    }
                                    <p className='username'>{selectedUser.firstName} {selectedUser.lastName}</p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="modal-share-profile-bottom-container">
                    <div className="button-content-container">
                        <button className='button2' disabled={buttonDisable} onClick={handleSendProfile}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShareProfileModal