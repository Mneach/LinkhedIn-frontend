import React, { useState } from 'react'

import { FaRegTimesCircle } from 'react-icons/fa'
import { IoCalendarNumberOutline } from 'react-icons/io5'
import { BsFillLightningFill } from 'react-icons/bs'
import { AiOutlineRight } from 'react-icons/ai'
import { Timestamp } from 'firebase/firestore'
import { createMilisecond } from '../../../lib/function/DateConversion'
import { setBoolean } from '../../../model/FormModel'
import { useUserContext } from '../../../hooks/UserContext'
import { useMutation } from '@apollo/client'
import { mutationAddMessage, mutationAddMessageVideoCall, mutationAddVideoCall } from '../../../lib/graphql/CreateQuery'
import { toastError, toastSuccess } from '../../../lib/toast/toast'

const MessageModalVideoCall = ({ setModalVideoCall, roomId, friendUserId }: { setModalVideoCall: setBoolean, roomId: string , friendUserId: string }) => {

    const UserContext = useUserContext()
    const [showSchedule, setShowSchedule] = useState(false)
    const [addVideoCallMutation] = useMutation(mutationAddVideoCall)
    const [addMessageVideoCall] = useMutation(mutationAddMessageVideoCall)
    const [videoCallDataInput, setVideoCallDataInput] = useState({
        title : UserContext.User.firstName.concat("'s Metting"),
        date: "",
        time: "",
        duration: "",
    })

    const handleClickSchedule = () => {
        if (showSchedule === true) setShowSchedule(false)
        else setShowSchedule(true)
    }

    // const date1 = "10/09/2022"
    // const date2 = "00:00"
    // const fullDate = date1.concat(" ").concat(date2)
    // const date = new Date(fullDate)
    // const milisecond = date.getTime()

    // console.log(milisecond);
    // console.log(Timestamp.now().toMillis());


    // if (Timestamp.now().toMillis() > milisecond) {
    //     console.log("a");
    // } else {
    //     console.log("b");
    // }

    const handleInstantVideoCall = () => {
        addVideoCallMutation({
            variables: {
                time: "",
                title: videoCallDataInput.title,
                date : videoCallDataInput.date,
                duration: "",
                userId1: UserContext.User.id,
                userId2: friendUserId,

            }
        }).then((e) => {
            
            addMessageVideoCall({
                variables: {
                    senderId: UserContext.User.id,
                    roomId: roomId,
                    VideoCallId: e.data.addVideoCall.id
                }
            }).then((e) => {
                setModalVideoCall(false)
                toastSuccess("Success add video call instant", "top-right", "colored")
            })
        }).catch((e) => {
            toastError((e), "top-right", "colored")
        })
    }

    const handleAddScheduleVideoCall = () => {
        addVideoCallMutation({
            variables: {
                time: videoCallDataInput.duration,
                title: videoCallDataInput.title,
                date : videoCallDataInput.date,
                duration: videoCallDataInput.time,
                userId1: UserContext.User.id,
                userId2: friendUserId,

            }
        }).then((e) => {
            console.log(e.data);

            addMessageVideoCall({
                variables: {
                    senderId: UserContext.User.id,
                    roomId: roomId,
                    VideoCallId: e.data.addVideoCall.id
                }
            }).then((e) => {
                setModalVideoCall(false)
                toastSuccess("Success add video call schedule", "top-right", "colored")
            })
        }).catch((e) => {
            toastError((e), "top-right", "colored")
        })
    }


    console.log(videoCallDataInput);
    

    return (
        <div className='modal-video-call-container'>
            <div className="modal-content-container">
                <div className='modal-video-call-top-container'>
                    <div className="modal-video-call-top-content-container">
                        <p className='title'>Create a video metting</p>
                        <button className='button-exit' onClick={() => setModalVideoCall(false)}>
                            <FaRegTimesCircle size={25} />
                        </button>
                    </div>
                </div>
                <div className='modal-video-call-mid-container'>
                    {
                        showSchedule === false ?
                            (
                                <div className="modal-video-call-mid-content-container">
                                    <div className="instant" onClick={handleInstantVideoCall}>
                                        <div className="instant-content">
                                            <BsFillLightningFill size={25} />
                                            <p className='title'>Send Instant Metting</p>
                                        </div>
                                    </div>
                                    <div className="schedule" onClick={handleClickSchedule}>
                                        <div className="schedule-left-content">
                                            <IoCalendarNumberOutline size={25} />
                                            <p className='title'>Schedule Metting For Later</p>
                                        </div>

                                        <div className="schedule-right-content">
                                            <AiOutlineRight size={25} />
                                        </div>
                                    </div>
                                </div>
                            )
                            :
                            (
                                <div className="modal-video-call-mid-schedule-container">
                                    <div className="content-input">
                                        <label htmlFor="">Start Date And Time</label>
                                        <div className='input1-container'>
                                            <input value={videoCallDataInput.date} type="date" onChange={(e) => setVideoCallDataInput((prev) => ({...prev , date : e.target.value}))} />
                                            <select value={videoCallDataInput.time} onChange={(e) => setVideoCallDataInput((prev) => ({ ...prev, time: e.target.value }))} name="" id="">
                                                <option value="00:00">00:00</option>
                                                <option value="00:30">00:30</option>
                                                <option value="01:00">01:00</option>
                                                <option value="01:30">01:30</option>
                                                <option value="02:00">02:00</option>
                                                <option value="02:30">02:30</option>
                                                <option value="03:00">03:00</option>
                                                <option value="03:30">03:30</option>
                                                <option value="04:00">04:00</option>
                                                <option value="04:30">04:30</option>
                                                <option value="05:00">05:00</option>
                                                <option value="05:30">05:30</option>
                                                <option value="06:00">06:00</option>
                                                <option value="06:30">06:30</option>
                                                <option value="07:00">07:00</option>
                                                <option value="07:30">07:30</option>
                                                <option value="08:00">08:00</option>
                                                <option value="08:30">08:30</option>
                                                <option value="09:00">09:00</option>
                                                <option value="09:30">09:30</option>
                                                <option value="10:00">10:00</option>
                                                <option value="10:30">10:30</option>
                                                <option value="11:00">11:00</option>
                                                <option value="11:30">11:30</option>
                                                <option value="12:00">12:00</option>
                                                <option value="12:30">12:30</option>
                                                <option value="13:00">13:00</option>
                                                <option value="13:30">13:30</option>
                                                <option value="14:00">14:00</option>
                                                <option value="14:30">14:30</option>
                                                <option value="15:00">15:00</option>
                                                <option value="15:30">15:30</option>
                                                <option value="16:00">16:00</option>
                                                <option value="16:30">16:30</option>
                                                <option value="17:00">17:00</option>
                                                <option value="17:30">17:30</option>
                                                <option value="18:00">18:00</option>
                                                <option value="18:30">18:30</option>
                                                <option value="19:00">19:00</option>
                                                <option value="19:30">19:30</option>
                                                <option value="20:00">20:00</option>
                                                <option value="20:30">20:30</option>
                                                <option value="21:00">21:00</option>
                                                <option value="21:30">21:30</option>
                                                <option value="22:00">22:00</option>
                                                <option value="22:30">22:30</option>
                                                <option value="23:00">23:00</option>
                                                <option value="23:30">23:30</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="content-input">
                                        <div className="input2-container">
                                            <label>Duration</label>
                                            <select name="" id="" value={videoCallDataInput.duration} onChange={(e) => setVideoCallDataInput((prev) => ({ ...prev, duration: e.target.value }))}>
                                                <option value={createMilisecond(1, "minute")}>1 Minute</option>
                                                <option value={createMilisecond(5, "minute")}>5 Minute</option>
                                                <option value={createMilisecond(10, "minute")}>10 Minute</option>
                                                <option value={createMilisecond(30, "minute")}>30 Minute</option>
                                                <option value={createMilisecond(1, "hour")}>1 Hour</option>
                                                <option value={createMilisecond(2, "hour")}>2 Hour</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="schedule-button-container">
                                        <button className='button1' onClick={handleClickSchedule}>Back</button>
                                        <button className='button2' onClick={handleAddScheduleVideoCall}>Send</button>
                                    </div>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default MessageModalVideoCall