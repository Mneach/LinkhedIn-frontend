import React from 'react'
import { BsCameraVideo } from 'react-icons/bs'
import { createTimeFromMilisecond } from '../../../lib/function/DateConversion'
import { VideoCallType } from '../../../model/model'

const MessageFriendVideoCall = ({ videoCallData }: { videoCallData: VideoCallType }) => {

  let type
  let durationType
  if (videoCallData.time as unknown as number <= 60000) {
    type = "seconds"
    durationType = "s"
  } else if (videoCallData.time as unknown as number < 3600000) {
    type = "minute"
    durationType = "m"
  } else if (videoCallData.time as unknown as number < 86400000) {
    type = "hour"
    durationType = "h"
  } else {  
    type = "day"
    durationType = "d"
  }

  return (
    <div className='friend-video-call-container'>
      <div className='friend-video-call-left-container'>
        <BsCameraVideo size={25} />
      </div>
      <div className="friend-video-call-right-container">
      <p className='title'>{videoCallData.title}</p>
        { videoCallData.time !== "" && <p className='time'>Time : {videoCallData.date} {videoCallData.duration} </p> }
        { videoCallData.duration !== "" && <p className='duration'>Duration : {createTimeFromMilisecond(videoCallData.time as unknown as number ,type)}{durationType} 0s</p> } 
        <button className='buttonVideoCall'>Join video call</button>
      </div>
    </div>
  )
}

export default MessageFriendVideoCall