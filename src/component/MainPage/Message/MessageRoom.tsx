import React, { useState, useEffect } from 'react'
import { AiOutlinePicture } from 'react-icons/ai'
import { RiVideoLine } from 'react-icons/ri'
import { TiTimes } from 'react-icons/ti'
import { MdVideoCall } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { toastError, toastPromise } from '../../../lib/toast/toast'
import { useMutation, useQuery } from '@apollo/client'
import { queryRoom } from '../../../lib/graphql/SelectQuery'
import { BlockType, RoomType } from '../../../model/model'
import { useUserContext } from '../../../hooks/UserContext'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../lib/firebase/FirebaseConfig'
import { mutationAddMessage } from '../../../lib/graphql/CreateQuery'
import MessageModalVideoCall from './MessageModalVideoCall'
import MessageMyPost from './MessageMyPost'
import MessageMyText from './MessageMyText'
import MessageMyImage from './MessageMyImage'
import MessageMyProfile from './MessageMyProfile'
import MessageMyVideoCall from './MessageMyVideoCall'
import MessageFriendText from './MessageFriendText'
import MessageFriendImage from './MessageFriendImage'
import MessageFriendPost from './MessageFriendPost'
import MessageFriendVideoCall from './MessageFriendVideoCall'
import MessageFriendProfile from './MessageFriendProfile'

const MessageRoom = ({ userBlockData }: { userBlockData: Array<BlockType> }) => {

  const { roomId } = useParams()
  const UserContext = useUserContext()
  const navigate = useNavigate()
  const [imageFile, setImageFile] = useState<File>()
  const [buttonDisable, setButtonDisable] = useState(true)
  const [modalVideoCall, setModalVideoCall] = useState(false)
  const [text, setText] = useState("")
  const [uploadInput, setUploadInput] = useState({
    url: "",
    imageSize: 0,
    imageName: "",
    type: ""
  })

  const { loading, error, data, startPolling } = useQuery(queryRoom, { variables: { roomId: roomId } })
  const [messageMutation] = useMutation(mutationAddMessage)


  let checkUserBlock = "";
  let checkCurrentUserBlock = "";

  useEffect(() => {
    startPolling(500)

  }, [])

  useEffect(() => {
    if (text !== "" || uploadInput.url !== "") {
      setButtonDisable(false)
    } else {
      setButtonDisable(true)
    }
  }, [text, uploadInput.url])

  if (loading) return <p>Get Chat Data...</p>

  const cancelUpload = () => {
    setUploadInput((prev) => ({ imageName: "", imageSize: 0, url: "", type: "" }))
  }

  const resetUpload = (e: any) => {
    e.target.value = null
  }

  const changeImageHandler = (e: any, typeInput: string) => {
    const urlFile = URL.createObjectURL(e.target.files[0])
    setImageFile((e.target.files as FileList)[0] as File)
    const calculateSize: number = Math.round((e.target.files[0].size / 10000) * 100) / 100
    let type = e.target.files[0].type
    let splitType = type.split("/");

    if (typeInput === splitType[0]) {
      setUploadInput((prev) => ({ url: urlFile, imageName: e.target.files[0].name, imageSize: calculateSize, type: splitType[0] }))
    } else {
      toastError("Invalid Format", "top-right", "colored")
    }
  }

  const changeVideoHandler = (e: any, typeInput: string) => {
    const urlFile = URL.createObjectURL(e.target.files[0])
    setImageFile((e.target.files as FileList)[0] as File)
    const calculateSize: number = Math.round((e.target.files[0].size / 10000) * 100) / 100
    let type = e.target.files[0].type
    let splitType = type.split("/");

    if (typeInput === splitType[0]) {
      setUploadInput((prev) => ({ url: urlFile, imageName: e.target.files[0].name, imageSize: calculateSize, type: splitType[0] }))
    } else {
      toastError("Invalid Format", "top-right", "colored")
    }
  }

  const handleAddChat = (imageUrl: string, roomId: string) => {
    messageMutation({
      variables: {
        senderId: UserContext.User.id,
        text: text,
        imageUrl: imageUrl,
        roomId: roomId,
      }
    }).then((e) => {
      setUploadInput((prev) => ({ url: "", imageName: "", imageSize: 0, type: "" }))
      setText("")
      navigate(`/mainPage/message/${roomId}`)
    }).catch((e) => {
      toastError((e), "top-right", "colored")
    })
  }

  const handleUploadImage = async (roomId: string) => {
    if (uploadInput.url !== "" && uploadInput.type !== "") {
      const refStorage = ref(storage, `${roomId}/${uploadInput.imageName}`)
      await uploadBytes(refStorage, imageFile as File, { contentType: 'profile pic' })
      const imageUrlFromFirebase = await getDownloadURL(refStorage)
      handleAddChat(imageUrlFromFirebase, roomId)
    } else {
      handleAddChat("", roomId)
    }
  }

  const handleCreateMessage = () => {
    toastPromise(() => handleUploadImage(roomData.id), "Loading...", "Success Add Chat!", "Failed Add Chat!")
  }

  const roomData = data.room as RoomType

  userBlockData.map((userBlockData) => {
    if (userBlockData.blockId === UserContext.User.id) {
      checkCurrentUserBlock = "blocked";
    } else if (userBlockData.userId === UserContext.User.id) {
      checkUserBlock = "blocked";
    }
  })

  const handleModalVideoCall = () => {
    setModalVideoCall(true)
  }

  return (
    <>
      {
        modalVideoCall === true && <MessageModalVideoCall roomId={roomId as string} friendUserId={roomData.user1.id === UserContext.User.id ? roomData.user1.id : roomData.user2.id} setModalVideoCall={setModalVideoCall} />
      }
      <div className='room-chat-container'>
        <div className="room-chat-top-container">
          {
            roomData.user1.id === UserContext.User.id ?
              (<p className='title'>{roomData.user2.firstName} {roomData.user2.lastName}</p>)
              :
              (<p className='title'>{roomData.user1.firstName} {roomData.user1.lastName}</p>)
          }

          {
            (checkUserBlock === "" && checkCurrentUserBlock === "") && <button className='button-videocall' onClick={handleModalVideoCall}>
              <MdVideoCall size={35} />
            </button>
          }

        </div>
        <div className="room-chat-content-container">
          <div className="room-chat-mid-content-container">
            {
              checkUserBlock === "" && checkCurrentUserBlock === "" ?
                (
                  <div className="mid-content">
                    <div className='dummy'></div>
                    {
                      roomData.messages.map((messageData) => {
                        return (
                          messageData.sender.id === UserContext.User.id ?
                            (
                              <div className="my-chat-container">
                                <div className="chat-content">
                                  {messageData.text !== "" && <MessageMyText text={messageData.text} />}
                                  {messageData.imageUrl !== "" && <MessageMyImage imageUrl={messageData.imageUrl} />}
                                  {messageData.ShareProfile.id !== "" && <MessageMyProfile profileData={messageData.ShareProfile} />}
                                  {messageData.SharePost.id !== "" && <MessageMyPost postData={messageData.SharePost} />}
                                  {messageData.VideoCall.id !== "" && <MessageMyVideoCall videoCallData={messageData.VideoCall} />}
                                </div>
                              </div>
                            )
                            :
                            (
                              <div className="friend-chat-container">
                                {
                                  messageData.sender.profileImageUrl === "" ?
                                    (<img className='friend-photo' src="../../../src/assets/dummy_avatar.jpg" alt="" />)
                                    :
                                    (<img className='friend-photo' src={messageData.sender.profileImageUrl} alt="" />)
                                }
                                <div className="chat-content">
                                  {messageData.text !== "" && <MessageFriendText text={messageData.text} />}
                                  {messageData.imageUrl !== "" && <MessageFriendImage imageUrl={messageData.imageUrl} />}
                                  {messageData.ShareProfile.id !== "" && <MessageFriendProfile profileData={messageData.ShareProfile} />}
                                  {messageData.SharePost.id !== "" && <MessageFriendPost postData={messageData.SharePost} />}
                                  {messageData.VideoCall.id !== "" && <MessageFriendVideoCall videoCallData={messageData.VideoCall} />}
                                </div>
                              </div>
                            )
                        )
                      }
                      )
                    }
                  </div>
                )
                :
                (
                  <div className='mid-content-blocked'>
                    {
                      checkUserBlock !== "" ?
                        (<p className='title-block'>Your cannot send a message , because your block this user</p>)
                        :
                        (<p className='title-block'>Your cannot send a message , beacause your blocked</p>)
                    }

                  </div>
                )
            }

          </div>
          {
            checkUserBlock === "" && checkCurrentUserBlock === "" && <div className="room-chat-bottom-content-container">
              {
                uploadInput.url !== "" &&
                <div className='select-image-container'>
                  <div className="select-image-left-container">
                    <div className="image-information-container">
                      <div className='image-photo-container'>
                        {
                          uploadInput.type === "image" ?
                            (<img className='image' src={uploadInput.url} alt="" />)
                            :
                            (<video className='video' src={uploadInput.url}></video>)
                        }
                      </div>
                      <div className="image-data-container">
                        <p className='image-name'>{uploadInput.imageName} ({uploadInput.imageSize}) KB</p>
                        <p className='attached'>Attached</p>
                      </div>

                    </div>
                  </div>
                  <div className="select-image-right-container">
                    <button onClick={cancelUpload}>
                      <TiTimes size={30} color="gray" />
                    </button>
                  </div>
                </div>
              }
              <div className="buttom-content">
                <div className="textarea-container">
                  <textarea className='textarea' value={text} onChange={(e) => setText(e.target.value)} placeholder='Write a message...'></textarea>

                </div>
                <div className="button-container">
                  <div className='button-left-container'>
                    <label htmlFor="image-input" className='button-input'>
                      <AiOutlinePicture size={25} color="gray" />
                    </label>

                    <input id="image-input" type="file" onClick={(e) => (resetUpload(e))} onChange={(e) => changeImageHandler(e, "image")} style={{ display: "none" }} />
                    <label htmlFor="video-input" className='button-input'>
                      <RiVideoLine size={25} color="gray" />
                    </label>

                    <input id="video-input" type="file" onClick={(e) => (resetUpload(e))} onChange={(e) => changeVideoHandler(e, "video")} style={{ display: "none" }} />
                  </div>
                  <div className='button-right-container'>
                    <button disabled={buttonDisable} onClick={handleCreateMessage} className='button-send'>Send</button>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default MessageRoom