import { useMutation, useQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../../hooks/UserContext'
import { mutationAddConnect } from '../../../lib/graphql/CreateQuery'
import { mutationDeleteConnectRequest } from '../../../lib/graphql/DeleteQuery'
import { queryUser } from '../../../lib/graphql/query'
import { toastError, toastSuccess } from '../../../lib/toast/toast'
import { UserType } from '../../../model/model'
import '../../../sass/page/network.scss'

const UserConnection = ({ userSuggestionData }: { userSuggestionData: UserType }) => {


    const UserContext = useUserContext()
    const navigate = useNavigate()
    const { loading, error, data, called, refetch: currentUserRefect } = useQuery(queryUser, { variables: { userId: userSuggestionData.id }, errorPolicy: "all" })
    const [modalUser, setModalUser] = useState(false)
    const [modalMore, setModalMore] = useState(false)
    const [modalConnect, setModalConnect] = useState(false)
    const [addConnectionMutation] = useMutation(mutationAddConnect)
    const [deleteConnectRequestMutation] = useMutation(mutationDeleteConnectRequest)
    let connectedUser: boolean = false;
    let connectionRequest: boolean = false;
    let giveConnectionStatus: boolean = false

    const handleGoToProfile = (userId: string) => {
        navigate(`/mainPage/profile/${userId}`)
    }

    useEffect(() => {
        currentUserRefect()
    }, [data])

    if (loading) return null

    const userData = data.User as UserType

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
                UserContext.userRefetch()
                currentUserRefect().then((e) => {
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
            UserContext.userRefetch()
            currentUserRefect().then((e) => {
                toastSuccess("Success Ignore Connection", "top-right", "colored")
            })
        }).catch((e) => {
            toastError((e), "top-right", "colored")
        })
    }

    const handleConnectModal = () => {
        if (modalConnect === false) setModalConnect(true)
        else setModalConnect(false)
    }

    UserContext.User.Connections.map((connectionData) => {
        if (connectionData.user1.id === userData.id || connectionData.user2.id === userData.id) {
            connectedUser = true;
        }
    })


    userData.ConnectRequests.map((connectRequestData) => {
        if (connectRequestData.fromUser.id === UserContext.User.id) {
            connectionRequest = true;
        }
    })

    UserContext.User.ConnectRequests.map((connectRequestData) => {
        console.log(connectRequestData);

        if (connectRequestData.toUser.id === UserContext.User.id && connectRequestData.fromUser.id == userSuggestionData.id) {
            giveConnectionStatus = true;
        }
    })

    return (
        <div className='UYMK-card-content-container'>
            <div className="UYMK-card-top-content">
                {
                    userSuggestionData.backgroundImageUrl === "" ?
                        (<img className='UYMK-card-background-image' onClick={() => handleGoToProfile(userSuggestionData.id)} src={"../../../../src/assets/dummy_avatar.jpg"} alt="" />) : (<img className='UYMK-card-background-image' onClick={() => handleGoToProfile(userSuggestionData.id)} src={userSuggestionData.backgroundImageUrl} alt="" />)
                }
            </div>
            <div className="UYMK-card-mid-content">
                {
                    userSuggestionData.profileImageUrl === "" ?
                        (<img className='user-photo' onClick={() => handleGoToProfile(userSuggestionData.id)} src={"../../../../src/assets/dummy_avatar.jpg"} alt="" />) : (<img className='user-photo' onClick={() => handleGoToProfile(userSuggestionData.id)} src={userSuggestionData.profileImageUrl} alt="" />)
                }
                <p className='username' onClick={() => handleGoToProfile(userSuggestionData.id)}>{userSuggestionData.firstName} {userSuggestionData.lastName}</p>
                <p className='headline' onClick={() => handleGoToProfile(userSuggestionData.id)}>{userSuggestionData.headline}</p>
                {
                    connectedUser ?
                        (<button className='button3'>Connected</button>)
                        :
                        (
                            connectionRequest ?
                                (<button className='button3'>Requested</button>)
                                :
                                (
                                    giveConnectionStatus ?
                                        (
                                            <>
                                                <button className='button2' onClick={() => accpetConnectionHandler(userData.id, userData.id, UserContext.User.id)}>Accept</button>
                                                <button className='button1' onClick={() => declineConnectionHanlder(userData.id, UserContext.User.id)}>Ignore</button>
                                            </>
                                        )
                                        :
                                        (<button className='button2' onClick={handleConnectModal}>Connect</button>)
                                )
                        )
                }
            </div>
        </div>
    )
}

export default UserConnection