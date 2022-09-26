import { useMutation, useQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { FaRegTimesCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../../hooks/UserContext'
import { mutationAddMessage, mutationAddMessageSharePost, mutationAddMessageShareProfile, mutationAddRoom } from '../../../lib/graphql/CreateQuery'
import { queryBlocks, queryRooms, queryUserConnections } from '../../../lib/graphql/SelectQuery'
import { toastError, toastSuccess } from '../../../lib/toast/toast'
import { setBoolean } from '../../../model/FormModel'
import { PostType, RoomType, UserType } from '../../../model/model'
import SearchUserModalProfile from '../modal/SearchUserModalProfile'
import RichTextTemplateHome from './RichTextTemplateHome'
import SearchUserModalHome from './SearchUserModalHome'
import { Audio , ColorRing } from 'react-loader-spinner'

const SharePostModal = ({ postData, setShareModal }: { postData: PostType, setShareModal: setBoolean }) => {
    const navigate = useNavigate()
    const UserContext = useUserContext()
    const [searchUserInput, setSearchUserInput] = useState("")
    const [buttonDisable, setButtonDisable] = useState(true)
    const [haveRoom, setHaveRoom] = useState(true)
    const [roomId, setRoomId] = useState("")
    const [roomMutation] = useMutation(mutationAddRoom)
    const [sharePostMutation] = useMutation(mutationAddMessageSharePost)
    const [selectedUser, setSelectedUser] = useState({
        userId: "",
        profileImageUrl: "",
        firstName: "",
        lastName: "",
        headline: "",
    })
    const { loading: loadingConnection, data: dataConnection, } = useQuery(queryUserConnections, { variables: { userId: UserContext.User.id } })
    const { loading, error, data, startPolling } = useQuery(queryRooms, { variables: { userId: UserContext.User.id } })
    const { loading: loadingBLock, data: dataBlock, refetch: refetchBlock } = useQuery(queryBlocks, { variables: { userId: UserContext.User.id } })

    useEffect(() => {
        refetchBlock()
    }, [])

    useEffect(() => {
        if (selectedUser.userId !== "") {
            setButtonDisable(false)
        } else {
            setButtonDisable(true)
        }
    }, [selectedUser.userId])

    if (loadingConnection || loading || loadingBLock) return <ColorRing
        visible={true}
        height="70"
        width="70"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#1B262C', '#0F4C75', '#3282B8', '#BBE1FA', '#364F6B']}
    />

    const UserConnectionData = dataConnection.UserConnected as Array<UserType>
    const connectionDataFilter = UserConnectionData.filter((connectionData) => {
        const fullUsername = connectionData.firstName.concat(" ").concat(connectionData.lastName)
        return (
            connectionData.firstName.toLowerCase().includes(searchUserInput) ||
            connectionData.lastName.toLowerCase().includes(searchUserInput) ||
            fullUsername.toLowerCase().includes(searchUserInput)
        )
    })

    const handleShareProfile = (roomId: string) => {

        sharePostMutation({
            variables: {
                senderId: UserContext.User.id,
                roomId: roomId,
                SharePostId: postData.id
            }
        }).then((e) => {
            setSelectedUser((prev) => ({ firstName: "", lastName: "", profileImageUrl: "", userId: "", headline: "" }))
            toastSuccess("Success Share Post", "top-right", "colored")
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
        <div className='modal-share-post-container'>
            <div className="modal-share-post-content-container">
                <div className="modal-share-post-top-container">
                    <div className="modal-share-top-content-container">
                        <p className='title'>Share Post</p>
                        <button className='button-exit' onClick={() => setShareModal(false)}>
                            <FaRegTimesCircle size={25} />
                        </button>
                    </div>
                </div>
                <div className="modal-share-post-mid-container">
                    <div className='modal-share-post-mid-content-container'>
                        <div className="user-information-search-container">
                            <input className='search-user' value={searchUserInput} onChange={(e) => setSearchUserInput(e.target.value)} placeholder='Type a name..' type="text" />
                            <div className='search-user-content-container'>
                                {
                                    searchUserInput !== "" &&
                                    <div className='modal-search-user-container'>
                                        {
                                            searchUserInput !== "" && connectionDataFilter.map((connectionUserData) => {
                                                return (<SearchUserModalHome roomData={data.rooms} userBlockData={dataBlock.blocks} connectionUserData={connectionUserData} setSearchUserInput={setSearchUserInput} setSelectedUser={setSelectedUser} setHaveRoom={setHaveRoom} setRoomId={setRoomId} />)
                                            })
                                        }
                                    </div>
                                }

                            </div>
                        </div>
                        <div className="model-share-post-container">
                            <div className="model-share-post-top-container">
                                <div className="left-content">
                                    {
                                        postData.Sender.profileImageUrl === "" ?
                                            (<img className='poster-profile' src={'../../../src/assets/dummy_avatar.jpg'} alt="" />)
                                            :
                                            (<img className='poster-profile' src={postData.Sender.profileImageUrl} alt="" />)
                                    }
                                </div>
                                <div className="right-content">
                                    <p className='username'>{postData.Sender.firstName} {postData.Sender.lastName}</p>
                                    <p className='follower'>{postData.Sender.Follows.length} followers</p>
                                </div>
                            </div>
                            <div className="model-share-post-mid-container">
                                <div className="model-share-post-content-text">
                                    <p className='post-text'>
                                        <RichTextTemplateHome texts={postData.text.split(" ")} />
                                    </p>
                                </div>
                                {
                                    postData.photoUrl !== "" ?
                                        (
                                            <div className="model-share-post-content-photo">
                                                <img className='post-photo' src={postData.photoUrl} alt="" />
                                            </div>
                                        )
                                        :
                                        (
                                            postData.videoUrl !== "" ?
                                                (
                                                    <div className="model-share-post-content-photo">
                                                        <video className='post-video' src={postData.videoUrl} controls />
                                                    </div>
                                                )
                                                :
                                                (null)
                                        )
                                }

                            </div>
                        </div>
                        {
                            selectedUser.userId !== "" && <div className="search-user-information-mid-container">
                                <p className='title'>This Post Will Sent To</p>
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
                <div className="modal-share-post-bottom-container">
                    <div className="button-content-container">
                        <button className='button2' disabled={buttonDisable} onClick={handleSendProfile}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SharePostModal