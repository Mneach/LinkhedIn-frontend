import { useMutation } from '@apollo/client'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../../hooks/UserContext'
import { mutationAddConnect } from '../../../lib/graphql/CreateQuery'
import { mutationDeleteConnectRequest } from '../../../lib/graphql/DeleteQuery'
import { toastError, toastSuccess } from '../../../lib/toast/toast'

const InvitationCard = () => {

    const UserContext = useUserContext()
    const navigate = useNavigate()
    const [addConnectionMutation] = useMutation(mutationAddConnect)
    const [deleteConnectRequestMutation] = useMutation(mutationDeleteConnectRequest)

    const accpetConnectionHandler = (user1ID: string, fromUserId: string, toUserId: string) => {
        addConnectionMutation({
            variables: {
                user1ID: user1ID,
                user2ID: UserContext.User.id,
            }
        }).then((e) => {
            deleteConnectRequestMutation({
                variables: {
                    fromUserId: fromUserId,
                    toUserId: toUserId
                }
            }).then((e) => {
                UserContext.userRefetch().then((e) => {
                    toastSuccess("Success Accpet Connection", "top-right", "colored")
                })
            }).catch((e) => {
                toastError((e), "top-right", "colored")
            })
        }).catch((e) => {
            toastError((e), "top-right", "colored")
        })
    }

    const declineConnectionHanlder = (fromUserId: string, toUserId: string) => {
        deleteConnectRequestMutation({
            variables: {
                fromUserId: fromUserId,
                toUserId: toUserId
            }
        }).then((e) => {
            UserContext.userRefetch().then((e) => {
                toastSuccess("Success Ignore Connection", "top-right", "colored")
            })
        }).catch((e) => {
            toastError((e), "top-right", "colored")
        })
    }

    const handleGoToProfile = (userId: string) => {
        navigate(`/mainPage/profile/${userId}`)
    }

    useEffect(() => {
        UserContext.userRefetch()
    },)



    return (
        <div className="network-conenction-card-container">
            {
                UserContext.User.ConnectRequests.length != 0 ?
                    (
                        <div className="title">
                            <p>Invitations</p>
                        </div>
                    )
                    :
                    (
                        <div className="title2">
                            <p>No Pending Invitation</p>
                        </div>
                    )
            }
            {
                UserContext.User.ConnectRequests ?
                    (
                        UserContext.User.ConnectRequests.map((connectRequestData) => {
                            return (
                                <div className="content">
                                    <div className="left-content">
                                        <div className="user-photo" onClick={() => handleGoToProfile(connectRequestData.fromUser.id)}>
                                            {
                                                connectRequestData.fromUser.profileImageUrl ?
                                                    (<img src={connectRequestData.fromUser.profileImageUrl} alt="" />)
                                                    :
                                                    (<img src="../../src/assets/dummy_avatar.jpg" alt="" />)
                                            }
                                        </div>
                                        <div className="user-information" onClick={() => handleGoToProfile(connectRequestData.fromUser.id)}>
                                            <p className='name'>{connectRequestData.fromUser.firstName} {connectRequestData.fromUser.lastName}</p>
                                            <p className='headline'>{connectRequestData.fromUser.headline}</p>
                                            <p className='message'>{connectRequestData.message}</p>
                                        </div>
                                    </div>
                                    <div className="right-content">
                                        <button className='button1' onClick={() => declineConnectionHanlder(connectRequestData.fromUser.id, connectRequestData.toUser.id)}>Ignore</button>
                                        <button className='button2' onClick={() => accpetConnectionHandler(connectRequestData.fromUser.id, connectRequestData.fromUser.id, connectRequestData.toUser.id)}>Accept</button>
                                    </div>
                                </div>
                            )
                        })
                    )
                    :
                    (null)
            }
        </div>
    )
}

export default InvitationCard