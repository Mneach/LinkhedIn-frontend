import React, { useState, useEffect } from 'react'
import { AiOutlinePicture } from 'react-icons/ai'
import { RiVideoLine } from 'react-icons/ri'
import { TiTimes } from 'react-icons/ti'
import { MdVideoCall } from 'react-icons/md'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toastError, toastPromise } from '../../../lib/toast/toast'
import { useMutation, useQuery } from '@apollo/client'
import { queryRoom } from '../../../lib/graphql/SelectQuery'
import { RoomType, UserType } from '../../../model/model'
import { useUserContext } from '../../../hooks/UserContext'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../lib/firebase/FirebaseConfig'
import { mutationAddMessage, mutationAddRoom } from '../../../lib/graphql/CreateQuery'

const MessagetTemporary = ({ roomData }: { roomData: Array<RoomType> }) => {

    console.log(roomData);

    const { userId } = useParams()
    const navigate = useNavigate()
    const UserContext = useUserContext()
    const userData = useLocation().state as UserType
    const [imageFile, setImageFile] = useState<File>()
    const [buttonDisable, setButtonDisable] = useState(true)
    const [text, setText] = useState("")
    const [uploadInput, setUploadInput] = useState({
        url: "",
        imageSize: 0,
        imageName: "",
        type: ""
    })
    const [messageMutation] = useMutation(mutationAddMessage)
    const [roomMutation] = useMutation(mutationAddRoom)
    let check: boolean = false
    let roomId: string = ""


    useEffect(() => {
        roomData.map((roomData) => {
            if (userId === roomData.user1.id || userId === roomData.user2.id) {
                roomId = roomData.id
                check = true
            }
        })

        if (check === true && roomId !== "") {
            navigate(`/mainPage/message/${roomId}`)
        }
    }, [])

    useEffect(() => {
        if (text !== "" || uploadInput.url !== "") {
            setButtonDisable(false)
        } else {
            setButtonDisable(true)
        }
    }, [text, uploadInput.url])

    const cancelUpload = () => {
        setUploadInput((prev) => ({ imageName: "", imageSize: 0, url: "", type: "" }))
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

    const resetUpload = (e: any) => {
        e.target.value = null
    }

    const handleAddChat = (imageUrl: string, roomId: string) => {
        messageMutation({
            variables: {
                senderId: UserContext.User.id,
                text: text,
                imageUrl: imageUrl,
                roomId: roomId
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

    const handleAddRoom = () => {
        let imageUrl: string = ""
        roomMutation({
            variables: {
                userId1: UserContext.User.id,
                userId2: userData.id
            }
        }).then(async (e) => {
            const roomData = e.data.addRoom as RoomType

            toastPromise(() => handleUploadImage(roomData.id), "Loading...", "Success Add Chat!", "Failed Add Chat!")

        }).catch((e) => {
            toastError((e), "top-right", "colored")
        })
    }

    return (
        <div className='room-chat-container'>
            <div className="room-chat-top-container">
                <p className='title'>{userData.firstName} {userData.lastName}</p>
                <button className='button-videocall'>
                    <MdVideoCall size={35} />
                </button>
            </div>
            <div className="room-chat-content-container">
                <div className="room-chat-mid-content-container">
                    <div className="mid-content">

                    </div>
                </div>
                <div className="room-chat-bottom-content-container">
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

export default MessagetTemporary