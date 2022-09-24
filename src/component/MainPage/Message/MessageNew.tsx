import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { AiOutlinePicture } from 'react-icons/ai'
import { RiVideoLine } from 'react-icons/ri'
import { useUserContext } from '../../../hooks/UserContext'
import { queryUserConnections } from '../../../lib/graphql/SelectQuery'
import { BlockType, RoomType, UserType } from '../../../model/model'
import { TiTime, TiTimes } from 'react-icons/ti'
import MessageNewModal from './MessageNewModal'
import { toastError, toastPromise, toastSuccess } from '../../../lib/toast/toast'
import { mutationAddMessage, mutationAddRoom } from '../../../lib/graphql/CreateQuery'
import { useLocation, useNavigate } from 'react-router-dom'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../lib/firebase/FirebaseConfig'

const MessageNew = ({roomData , userBlockData} : {roomData : Array<RoomType> , userBlockData : Array<BlockType>}) => {

  const UserContext = useUserContext()
  const { state } = useLocation();
  const [searchUserInput, setSearchUserInput] = useState("")
  const [imageFile, setImageFile] = useState<File>()
  const [buttonDisable, setButtonDisable] = useState(true)
  const navigate = useNavigate()
  const [text, setText] = useState("")
  const [selectedUser, setSelectedUser] = useState({
    userId: "",
    profileImageUrl: "",
    firstName: "",
    lastName: "",
    headline: "",
  })
  const [localUrl, setLocalUrl] = useState("")
  const [uploadInput, setUploadInput] = useState({
    url: "",
    imageSize: 0,
    imageName: "",
    type: ""
  })
  const { loading, data, error } = useQuery(queryUserConnections, { variables: { userId: UserContext.User.id } })
  const [roomMutation] = useMutation(mutationAddRoom)
  const [messageMutation] = useMutation(mutationAddMessage)

  useEffect(() => {
    UserContext.userRefetch()
  }, [])

  useEffect(() => {
    if (selectedUser.userId !== "" && (text !== "" || uploadInput.url !== "")) {
      setButtonDisable(false)
    } else {
      setButtonDisable(true)
    }
  }, [text, uploadInput.url, selectedUser.userId])

  if (loading) return <p>Loading...</p>



  const UserConnectionData = data.UserConnected as Array<UserType>
  const connectionDataFilter = UserConnectionData.filter((connectionData) => {
    const fullUsername = connectionData.firstName.concat(" ").concat(connectionData.lastName)
    return (
      connectionData.firstName.toLowerCase().includes(searchUserInput) ||
      connectionData.lastName.toLowerCase().includes(searchUserInput) ||
      fullUsername.toLowerCase().includes(searchUserInput)
    )
  })

  const changeImageHandler = (e: any, typeInput: string) => {
    const urlFile = URL.createObjectURL(e.target.files[0])
    setImageFile((e.target.files as FileList)[0] as File)
    const calculateSize: number = Math.round((e.target.files[0].size / 10000) * 100) / 100
    let type = e.target.files[0].type
    let splitType = type.split("/");

    if (typeInput === splitType[0]) {
      setUploadInput((prev) => ({ url: urlFile, imageName: e.target.files[0].name, imageSize: calculateSize, type: splitType[0] }))
      setLocalUrl(urlFile)
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
      setLocalUrl(urlFile)
    } else {
      toastError("Invalid Format", "top-right", "colored")
    }
  }

  const cancelUpload = () => {
    setUploadInput((prev) => ({ imageName: "", imageSize: 0, url: "", type: "" }))
  }

  const resetUpload = (e: any) => {
    e.target.value = null
  }
  
  const handleAddChat = (imageUrl : string , roomId : string) => {

    if(text == "") setText("Sent a photo")

    messageMutation({
      variables : {
        senderId: UserContext.User.id,
        text: text,
        imageUrl: imageUrl,
        roomId: roomId,
      }
    }).then((e) => {
      setSelectedUser((prev) => ({firstName : "" , lastName : "" , profileImageUrl : "" , userId : "" , headline : ""}))
      setUploadInput((prev) => ({url : "" , imageName : "" , imageSize : 0 , type : ""}))
      setText("")
      navigate(`/mainPage/message/${roomId}`)
    }).catch((e) => {
      toastError((e) , "top-right" , "colored")
    })
  }

  const handleUploadImage = async (roomId : string) => {
    if(uploadInput.url !== "" && uploadInput.type !== ""){
      const refStorage = ref(storage, `${roomId}/${uploadInput.imageName}`)
      await uploadBytes(refStorage, imageFile as File, { contentType: 'profile pic' })
      const imageUrlFromFirebase = await getDownloadURL(refStorage)
      handleAddChat(imageUrlFromFirebase , roomId)
    }else{
      handleAddChat("" , roomId)
    }
  }

  const handleAddRoom = () => {
    let imageUrl : string = ""
    roomMutation({
      variables: {
        userId1: UserContext.User.id,
        userId2: selectedUser.userId
      }
    }).then(async (e) => {
      const roomData = e.data.addRoom as RoomType

      toastPromise(() => handleUploadImage(roomData.id), "Loading...", "Success Add Chat!", "Failed Add Chat!")
      
    }).catch((e) => {
      toastError((e) , "top-right" , "colored")
    })
  }

  console.log(roomData);
  console.log(uploadInput);
  
  

  return (
    <div className='room-new-container'>
      <div className="room-new-top-container">
        <p className='title'>New Message</p>
      </div>
      <div className="room-new-content-container">
        <div className='room-new-search-container'>
          <input value={searchUserInput} onChange={(e) => setSearchUserInput(e.target.value)} className='input-search-user' type="text" placeholder='Type a name...' />
          <div className='room-new-search-content'>
            {
              searchUserInput !== "" &&
              <div className='modal-message-search-user-container'>
                {
                  searchUserInput !== "" && connectionDataFilter.map((connectionUserData) => {
                    return (<MessageNewModal roomData={roomData} userBlockData={userBlockData} connectionUserData={connectionUserData} setSearchUserInput={setSearchUserInput} setSelectedUser={setSelectedUser} />)
                  })
                }
              </div>
            }

          </div>
        </div>
        <div className="room-new-mid-content-container">
          <div className="mid-content">
            {
              selectedUser.firstName === "" ? (null) :
                (
                  <>
                    {
                      selectedUser.profileImageUrl === "" ?
                        (<img className='user-photo' src={"../../src/assets/dummy_avatar.jpg"} alt="" />) : (<img className='user-photo' src={selectedUser.profileImageUrl} alt="" />)
                    }
                    <p className='username'>{selectedUser.firstName} {selectedUser.lastName}</p>
                    <p className='headline'>{selectedUser.headline}</p>
                  </>
                )
            }

          </div>
        </div>
        <div className="room-new-bottom-content-container">
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
                <button disabled={buttonDisable} onClick={handleAddRoom} className='button-send'>Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageNew