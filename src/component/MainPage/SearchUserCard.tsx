import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../hooks/UserContext'
import { mutationAddConnect, mutationAddConnectRequest } from '../../lib/graphql/CreateQuery'
import { mutationDeleteConnectRequest } from '../../lib/graphql/DeleteQuery'
import { toastError, toastSuccess } from '../../lib/toast/toast'
import { refectSearchType } from '../../model/FormModel'
import { UserType } from '../../model/model'
import ConnectModal from './Profile/ConnectModal'

const SearchUserCard = ({ dataUser, refectSearchData }: { dataUser: UserType, refectSearchData: refectSearchType }) => {

    const UserContext = useUserContext()
    const navigate = useNavigate()
    const [connectRequestMutation] = useMutation(mutationAddConnectRequest)
    const [modalConnect, setModalConnect] = useState(false)
    const [addConnectionMutation] = useMutation(mutationAddConnect)
    const [deleteConnectRequestMutation] = useMutation(mutationDeleteConnectRequest)
    let connectedUser: boolean = false;
    let connectionRequest: boolean = false;
    let giveConnectionStatus: boolean = false

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
                refectSearchData().then((e) => {
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
            refectSearchData().then((e) => {
                toastSuccess("Success Ignore Connection", "top-right", "colored")
            })
        }).catch((e) => {
            toastError((e), "top-right", "colored")
        })
    }

    const profileHandler = () => {
        navigate(`/mainPage/profile/${dataUser.id}`)
    }

    const handleConnectModal = () => {
        if (modalConnect === false) setModalConnect(true)
        else setModalConnect(false)
    }

    UserContext.User.Connections.map((connectionData) => {
        if (connectionData.user1.id === dataUser.id || connectionData.user2.id === dataUser.id) {
            connectedUser = true;
        }
    })


    dataUser.ConnectRequests.map((connectRequestData) => {
        if (connectRequestData.fromUser.id === UserContext.User.id) {
            connectionRequest = true;
        }
    })

    UserContext.User.ConnectRequests.map((connectRequestData) => {
        if (connectRequestData.toUser.id === UserContext.User.id) {
            giveConnectionStatus = true;
        }
    })

    return (
        <>
        {
            modalConnect === true && <ConnectModal refectCurrentUser={refectSearchData} userData={dataUser} setModalConnect={setModalConnect} />
        }
            <div className='user-container__content-container'>
                <div className='user-container__content-container__profile' onClick={profileHandler}>
                    {
                        dataUser.profileImageUrl === "" ?
                            (<img src="../../src/assets/dummy_avatar.jpg" alt="" />) : (<img src={dataUser.profileImageUrl}></img>)
                    }
                </div>
                <div className='user-container__content-container__content'>
                    <div onClick={profileHandler} className="left-content">
                        <p className='name'>{dataUser.firstName} {dataUser.lastName}</p>
                        <p className='degree'>Computer Science at Binus University</p>
                        <p className='location'>{dataUser.city} , {dataUser.country}</p>
                    </div>
                    <div className='right-content'>
                        {
                            connectedUser ?
                                (<button className='button3'>Connected</button>)
                                :
                                (
                                    connectionRequest ?
                                        (<button className='button3'>Requested</button>)
                                        :
                                        (giveConnectionStatus ?
                                            (
                                                <>
                                                    <button className='button1' onClick={() => declineConnectionHanlder(dataUser.id, UserContext.User.id)}>Ignore</button>
                                                    <button className='button2' onClick={() => accpetConnectionHandler(dataUser.id, dataUser.id, UserContext.User.id)}>Accept</button>
                                                </>
                                            )
                                            :
                                            (<button className='button2' onClick={handleConnectModal}>Connect</button>))
                                )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchUserCard