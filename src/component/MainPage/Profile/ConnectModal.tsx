import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useUserContext } from '../../../hooks/UserContext'
import { mutationAddConnectRequest } from '../../../lib/graphql/CreateQuery'
import { toastError, toastSuccess } from '../../../lib/toast/toast'
import { refectSearchType, refectUserType, setBoolean } from '../../../model/FormModel'
import { UserType } from '../../../model/model'

const ConnectModal = ({userData , refectCurrentUser , setModalConnect} : {userData : UserType , refectCurrentUser : refectUserType | refectSearchType , setModalConnect : setBoolean}) => {

  const UserContext = useUserContext()
  const [showNote, setShowNote] = useState(false)
  const [message , setMessage] = useState("")
  const [connectRequestMutation] = useMutation(mutationAddConnectRequest)

  const handleShowNote = () => {
    if (showNote == true) setShowNote(false)
    else setShowNote(true)
    setMessage("")
  }

  const handleConnectionRequest = () => {
    connectRequestMutation({
      variables: {
        fromUserId: UserContext.User.id,
        toUserId: userData.id,
        message: message,
      }
    }).then((e) => {
      UserContext.userRefetch()
      refectCurrentUser().then((e) => {
        toastSuccess("Success Request Connect", "top-right", "colored")
        console.log(e)
        setModalConnect(false)
      })
    }).catch((e) => {
      toastError((e), "top-right", "colored")
    })
  }

  const handleExitConnect = () => {
    setModalConnect(false)
  }

  return (
    <div className='modal-container'>
      <div className='modal-connect-container'>
        <div className="modal-connect-title-container">
          <p className='title'>You can customize this invitation</p>
          <button className='button-title' onClick={handleExitConnect}>
            <img src="../../src/assets/close.png" alt="" />
          </button>
        </div>
        <div className="modal-connect-content-container">
          {
            showNote === true ?
              (
                <div className="modal-connect-content-input">
                  <p>Include a persnoal message (optional) : </p>
                  <textarea placeholder='Ex: We Know each other from...' value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                </div>
              )
              :
              (<p>LinkhedIn members are more likely to accept invitations that includes a personal note</p>)
          }
        </div>
        <div className="modal-connect-button-container">
          {
            showNote === true ?
              (<button className='button1' onClick={handleShowNote}>Cancel</button>)
              :
              (<button className='button1' onClick={handleShowNote}>Add a note</button>)
          }

          {
            showNote === true && message === "" ? 
            (<button className='button2' disabled={true}>Send</button>)
            :
            (<button className='button2' onClick={handleConnectionRequest}>Send</button>)
          }
        </div>
      </div>
    </div>
  )
}

export default ConnectModal