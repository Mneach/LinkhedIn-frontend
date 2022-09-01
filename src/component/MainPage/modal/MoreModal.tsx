import { useMutation } from '@apollo/client'
import React from 'react'
import { useUserContext } from '../../../hooks/UserContext'
import { mutationFollowUser } from '../../../lib/graphql/CreateQuery'
import { mutationUnFollowUser } from '../../../lib/graphql/DeleteQuery'
import { toastError, toastSuccess } from '../../../lib/toast/toast'
import { refectUserType } from '../../../model/FormModel'
import { UserType } from '../../../model/model'

const MoreModal = ({ userData, refectCurrentUser }: { userData: UserType, refectCurrentUser: refectUserType }) => {

    const UserContext = useUserContext()

    const [followMutation] = useMutation(mutationFollowUser)
    const [unFollowMutation] = useMutation(mutationUnFollowUser)

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
            }).catch((error) => {
                toastError(error, 'top-right', 'colored')
            })
        }).catch((error) => {
            toastError(`${error}`, 'top-right', 'colored')
        })
    }

    let checkFollowStatus = ""
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

                            <button>Block</button>
                        </div >
                    )
            }
        </div >
    )
}

export default MoreModal