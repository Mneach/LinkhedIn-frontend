import { useMutation } from '@apollo/client'
import React from 'react'
import { useUserContext } from '../../../hooks/UserContext'
import { messageFollowNotification, messageUnfollowNotification } from '../../../lib/function/NotificaionHandler'
import { mutationAddBlock, mutationAddNotification, mutationFollowUser } from '../../../lib/graphql/CreateQuery'
import { mutationDeleteBlock, mutationUnFollowUser } from '../../../lib/graphql/DeleteQuery'
import { toastError, toastSuccess } from '../../../lib/toast/toast'
import { refectUserType } from '../../../model/FormModel'
import { UserType } from '../../../model/model'

const MoreModal = ({ userData, refectCurrentUser }: { userData: UserType, refectCurrentUser: refectUserType }) => {

    const UserContext = useUserContext()

    const [followMutation] = useMutation(mutationFollowUser)
    const [unFollowMutation] = useMutation(mutationUnFollowUser)
    const [blockMutation] = useMutation(mutationAddBlock)
    const [deleteBlockMutation] = useMutation(mutationDeleteBlock)
    const [notificationMutation] = useMutation(mutationAddNotification)

    const handleFollow = async () => {
        followMutation({
            variables: {
                id1: UserContext.User.id,
                id2: userData.id
            }
        }).then(() => {
            UserContext.userRefetch().then((e) => {
                // toastSuccess("Success Follow!", 'top-right', 'colored')
            }).catch((error) => {
                toastError(error, 'top-right', 'colored')
            })

            refectCurrentUser().then((e) => {
                toastSuccess("Success Follow!", 'top-right', 'colored')
                createNotification(UserContext.User.id, userData.id, messageFollowNotification())
            }).catch((error) => {
                toastError(error, 'top-right', 'colored')
            })
        }).catch((error) => {
            toastError(`${error}`, 'top-right', 'colored')
        })
    }

    const handleUnfollow = async () => {
        unFollowMutation({
            variables: {
                id1: UserContext.User.id,
                id2: userData.id
            }
        }).then(() => {
            UserContext.userRefetch().then((e) => {
                // toastSuccess("Success UnFollow!", 'top-right', 'colored')
            }).catch((error) => {
                toastError(error, 'top-right', 'colored')
            })

            refectCurrentUser().then((e) => {
                toastSuccess("Success UnFollow!", 'top-right', 'colored')
                createNotification(UserContext.User.id, userData.id, messageUnfollowNotification())
            }).catch((error) => {
                toastError(error, 'top-right', 'colored')
            })
        }).catch((error) => {
            toastError(`${error}`, 'top-right', 'colored')
        })
    }

    const handleBlock = () => {
        blockMutation({
            variables: {
                userId: UserContext.User.id,
                blockId: userData.id
            }
        }).then((e) => {
            UserContext.userRefetch()
            refectCurrentUser().then((e) => {
                toastSuccess("Success Block User!", "top-right", "colored")
            })
        }).catch((e) => {
            toastError((e), "top-right", "colored")
        })
    }

    const handleUnBlockUser = () => {
        deleteBlockMutation({
            variables: {
                userId: UserContext.User.id,
                blockId: userData.id,
            }
        }).then((e) => {
            UserContext.userRefetch()
            refectCurrentUser().then((e) => {
                toastSuccess("Success UnBlock! User", "top-right", "colored")
            })
        }).catch((e) => {
            toastError((e), "top-right", "colored")
        })
    }

    let checkFollowStatus = ""
    let checkBlockUser = ""
    console.log(UserContext)
    console.log(userData)
    if (UserContext.User) {
        for (let index = 0; index < userData.Follows.length; index++) {
            console.log("adsf")
            const element = userData.Follows[index];
            if (element.followId === userData.id && element.userId === UserContext.User.id) {
                checkFollowStatus = "followed"
                break
            }
        }

        UserContext.User.Blocks.map((blockData) => {
            if (blockData.blockId === userData.id) {
                checkBlockUser = "blocked";
            }
        })
    }

    const createNotification = (fromUserId: string, toUserId: string, message: string) => {
        if (fromUserId != toUserId) {
            notificationMutation({
                variables: {
                    toUserId: toUserId,
                    fromUserId: fromUserId,
                    message: message
                }
            }).then((e) => {
                console.log(e);
            }).catch((e) => {
                toastError((e), "top-right", "colored")
            })
        } else {
            console.log("Cannot send notification to yourself");

        }

    }

    console.log(checkFollowStatus)

    return (
        <div className='modal-more-container'>
            {
                userData.id === UserContext.User.id ?
                    (
                        <div className='modal-more-container__content'>
                            <button>Share Profile</button>
                            <button>Save As PDF</button>
                        </div >
                    )
                    :
                    (
                        <div className='modal-more-container__content'>
                            <button>Share Profile</button>
                            <button>Save As PDF</button>
                            {
                                checkFollowStatus === "followed" ?
                                    (<button onClick={handleUnfollow}>UnFollow</button>)
                                    :
                                    (<button onClick={handleFollow}>Follow</button>)
                            }

                            {
                                checkBlockUser === "blocked" ?
                                    (<button onClick={handleUnBlockUser}>UnBlock</button>)
                                    :
                                    (<button onClick={handleBlock}>Block</button>)
                            }
                        </div >
                    )
            }
        </div >
    )
}

export default MoreModal