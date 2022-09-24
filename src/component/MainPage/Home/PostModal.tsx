import { concat, useMutation, useQuery } from '@apollo/client'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useEffect, useState } from 'react'

import { AiFillYoutube, AiFillPicture } from 'react-icons/ai'
import { useUserContext } from '../../../hooks/UserContext'
import { storage } from '../../../lib/firebase/FirebaseConfig'
import { mutationAddHastag, mutationCreatePost } from '../../../lib/graphql/CreateQuery'
import { toastError, toastPromise, toastSuccess } from '../../../lib/toast/toast'
import { HastagRichText1, refectHastagType, refectPostType, setBoolean } from '../../../model/FormModel'
import { MentionsInput, Mention, SuggestionDataItem } from 'react-mentions'

import { mentionInputPostStyle, mentionStyle } from '../../../lib/function/mentionStyle'
import RichTextTemplateHome from './RichTextTemplateHome'
import { queryHastags } from '../../../lib/graphql/SelectQuery'
import { HastagType } from '../../../model/model'

const PostModal = ({ dataHastags , setPostModal, refechHastag , refechPost }: { dataHastags : Array<HastagType> , setPostModal: setBoolean, refechHastag : refectHastagType , refechPost: refectPostType }) => {

    const UserContext = useUserContext()
    const [text, setText] = useState("")
    const [inputText , setInputText] = useState("")
    const [mutationPost] = useMutation(mutationCreatePost)
    const [file, setFile] = useState<File>()
    const [buttonDisable, setButtonDisable] = useState(true)
    const [removeFileStyle, setRemoveFileStyle] = useState("none")
    const [addHastagMutation] = useMutation(mutationAddHastag)

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
        console.log(inputText);
        
        const texts = inputText.split(" ")
        texts.map((inputText) => {
            if(inputText.match(HastagRichText1)){
                console.log(text);
                const hastagSubstring = inputText.substring(1 , inputText.length)
                addHastagMutation({variables : {hastag : hastagSubstring}}).then((e) => {
                    console.log(e);
                })
            }
        })

        if (localUrl.type === "image") {
            console.log("image")
            mutationPost({
                variables: {
                    senderId: UserContext.User.id,
                    text: inputText,
                    photoUrl: url,
                    videoUrl: "",
                }
            }).then((e) => {
                // toastSuccess("Success Create Post", "top-right", "colored")
                refechPost()
                refechHastag()
            }).catch((e) => {
                toastError((e), "top-right", "colored")
            })
        } else {
            console.log("video")
            mutationPost({
                variables: {
                    senderId: UserContext.User.id,
                    text: inputText,
                    photoUrl: "",
                    videoUrl: url,
                }
            }).then((e) => {
                // toastSuccess("Success Create Post", "top-right", "colored")
                refechPost()
                refechHastag()
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
        if (text === "") {
            setButtonDisable(true)
        } else {
            setButtonDisable(false);
        }
    }, [text])

    const mentionDatas: SuggestionDataItem[] = []
    UserContext.User.Connections.map((dataMention) => {
        let mentionData: SuggestionDataItem = { id: "", display: "" }
        let at: string = "@"
        if (dataMention.user1.id != UserContext.User.id) {
            mentionData.id = dataMention.user1.id   
            mentionData.display = at.concat(dataMention.user1.firstName).concat(dataMention.user1.lastName)
            mentionDatas.push(mentionData)
        } else if (dataMention.user2.id != UserContext.User.id) {
            mentionData.id = dataMention.user2.id
            mentionData.display = at.concat(dataMention.user2.firstName).concat(dataMention.user2.lastName)
            mentionDatas.push(mentionData)
        }
    })

    const hastagDatas : SuggestionDataItem [] = []
    dataHastags.map((dataHastag) => {
        let hastagData: SuggestionDataItem = { id: "", display: "" }
        let at: string = "#"
        hastagData.id = at.concat(dataHastag.id) 
        hastagData.display = at.concat(dataHastag.hastag)
        hastagDatas.push(hastagData)
    })
    
    const handleComment = (e: any , newValue : any , newPlainTextValue: any) => {
        setText(e.target.value)
        // setText(newPlainTextValue)
        console.log(newPlainTextValue);
        console.log(newValue);
        
        
        setInputText(newValue)
    }

    const promiseUpload = () => {
        toastPromise(() => uploadHanlder() , "Loading Create Post..." , "Success Create Post" , "Failed To Create Post")
    }

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
                            UserContext.User.profileImageUrl ?
                                (<img src={UserContext.User.profileImageUrl} alt="" />)
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
                        <MentionsInput id='test-rich-text' value={text} style={{ width: "100%", height: "100px", ...mentionInputPostStyle }} placeholder="What do you want to talk about" onChange={handleComment}>
                            <Mention
                                trigger="@"
                                data={mentionDatas}
                                style={mentionStyle}
                            />
                            <Mention
                                trigger="#"
                                data={hastagDatas}
                                style={mentionStyle}
                            />
                        </MentionsInput>
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
                            <button className='button1' disabled={buttonDisable} onClick={promiseUpload}>Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostModal