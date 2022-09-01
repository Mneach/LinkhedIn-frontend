import { useMutation } from '@apollo/client'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useEffect, useState } from 'react'

import { AiFillYoutube, AiFillPicture } from 'react-icons/ai'
import { useUserContext } from '../../../hooks/UserContext'
import { storage } from '../../../lib/firebase/FirebaseConfig'
import { mutationCreatePost } from '../../../lib/graphql/CreateQuery'
import { toastError, toastSuccess } from '../../../lib/toast/toast'
import { refectPostType, setBoolean } from '../../../model/FormModel'

const PostModal = ({ setPostModal, refechPost }: { setPostModal: setBoolean, refechPost: refectPostType }) => {

    const UserContext = useUserContext()
    const [text, setText] = useState("")
    const [mutationPost] = useMutation(mutationCreatePost)
    const [file, setFile] = useState<File>()
    const [buttonDisable, setButtonDisable] = useState(true)
    const [removeFileStyle, setRemoveFileStyle] = useState("none")
    const [localUrl, setLocalUrl] = useState({
        type: "",
        url: "",
    })

    const handlePostModal = () => {
        setPostModal(false)
    }

    const changeFileHandler = (e: any, typeInput: string) => {
        console.log(e)
        const urlFile = URL.createObjectURL(e.target.files[0])
        // setImageFile((e.target.files as FileList)[0] as File)
        let type = e.target.files[0].type
        let splitType = type.split("/");

        if (typeInput === splitType[0]) {
            setLocalUrl({
                type: typeInput,
                url: urlFile,
            })
            showRemoveAttachmentFile()
            setFile((e.target.files as FileList)[0] as File)
        } else {
            toastError("Invalid Type", "top-right", "colored")
        }

    }

    const uploadHanlder = async () => {

        let url = ""

        if (file !== undefined) {
            const refStorage = ref(storage, `${UserContext.User.email}/${(file as File).name}`)
            await uploadBytes(refStorage, file as File, { contentType: 'profile pic' })
            url = await getDownloadURL(refStorage)
            console.log(url)
            console.log("test1")
            postHandler(url)
            handlePostModal()
        } else {
            postHandler("")
            handlePostModal()
        }

    }

    const postHandler = (url: string) => {
        if (localUrl.type === "image") {
            console.log("image")
            mutationPost({
                variables: {
                    senderId: UserContext.User.id,
                    text: text,
                    photoUrl: url,
                    videoUrl: "",
                }
            }).then((e) => {
                toastSuccess("Success Create Post", "top-right", "colored")
                refechPost()
            }).catch((e) => {
                toastError((e), "top-right", "colored")
            })
        } else {
            console.log("video")
            mutationPost({
                variables: {
                    senderId: UserContext.User.id,
                    text: text,
                    photoUrl: "",
                    videoUrl: url,
                }
            }).then((e) => {
                toastSuccess("Success Create Post", "top-right", "colored")
                refechPost()
            }).catch((e) => {
                toastError((e), "top-right", "colored")
            })
        }
    }

    const removeFileHandler = () => {
        setLocalUrl({ type: "", url: "" })
        setFile(undefined)
    }

    const showRemoveAttachmentFile = () => {
        if (localUrl.url === "") {
            setRemoveFileStyle("none")
        } else {
            setRemoveFileStyle("block")
        }
    }

    useEffect(() => {
        showRemoveAttachmentFile()
    }, [localUrl.url])

    useEffect(() => {
        console.log(text)
        if(text === ""){
            setButtonDisable(true)
        }else{
            setButtonDisable(false);
        }
    } , [text])


    return (
        <div className='modal-container'>
            <div className='modal-content-post'>
                <div className='modal-content-post__title-container'>
                    <p className='title'>Create a post</p>
                    <button className='button1'>
                        <img src="../../src/assets/close.png" alt="" onClick={handlePostModal} />
                    </button>
                </div>
                <div className='modal-content-post__content-container'>
                    <div className="top-content-container">
                        {
                            UserContext.User.backgroundImageUrl ?
                                (<img src={UserContext.User.backgroundImageUrl} alt="" />)
                                :
                                (<img src="../../src/assets/dummy_avatar.jpg" alt="" />)
                        }
                        <p>{UserContext.User.firstName} {UserContext.User.lastName}</p>
                    </div>
                    <div className="mid-content-container">

                        {
                            localUrl.url === "" ?
                                (null)
                                :
                                (
                                    localUrl.type === "image" ?
                                        (
                                            <img src={localUrl.url} alt="" />
                                        )
                                        :
                                        (
                                            <video src={localUrl.url}></video>
                                        )
                                )
                        }
                        <textarea style={{ width: "100%", height: "100px" }} value={text} onChange={(e) => setText(e.target.value)} placeholder="What do you want to talk about"></textarea>
                    </div>
                    <div className="bottom-content-container">
                        <div className='bottom-left-content'>
                            <div className=''>
                                <label htmlFor="file-input" className='photo'>
                                    <AiFillYoutube size={30} />
                                </label>

                                <input id="file-input" type="file" onChange={(e) => changeFileHandler(e, "video")} style={{ display: "none" }} />
                            </div>
                            <div className=''>
                                <label htmlFor="video-input" className='video'>
                                    <AiFillPicture size={30} />
                                </label>

                                <input id="video-input" type="file" onChange={(e) => changeFileHandler(e, "image")} style={{ display: "none" }} />
                            </div>
                        </div>
                        <div className='bottom-right-content'>
                            <button className={`button2 ${removeFileStyle}`} onClick={removeFileHandler}>Remove Attchment File</button>
                            <button className='button1' disabled={buttonDisable} onClick={uploadHanlder}>Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostModal