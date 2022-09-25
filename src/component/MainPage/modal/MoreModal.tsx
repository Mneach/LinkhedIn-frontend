import { useMutation } from '@apollo/client'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import React, { useState } from 'react'
import { useUserContext } from '../../../hooks/UserContext'
import { messageFollowNotification, messageUnfollowNotification } from '../../../lib/function/NotificaionHandler'
import { mutationAddBlock, mutationAddNotification, mutationFollowUser } from '../../../lib/graphql/CreateQuery'
import { mutationDeleteBlock, mutationUnFollowUser } from '../../../lib/graphql/DeleteQuery'
import { toastError, toastSuccess } from '../../../lib/toast/toast'
import { refectUserType, setBoolean } from '../../../model/FormModel'
import { UserType } from '../../../model/model'
import ShareProfileModal from './ShareProfileModal'

const MoreModal = ({ userData, refectCurrentUser, setModalMore }: { userData: UserType, refectCurrentUser: refectUserType, setModalMore: setBoolean }) => {

    const UserContext = useUserContext()

    const [followMutation] = useMutation(mutationFollowUser)
    const [unFollowMutation] = useMutation(mutationUnFollowUser)
    const [blockMutation] = useMutation(mutationAddBlock)
    const [deleteBlockMutation] = useMutation(mutationDeleteBlock)
    const [notificationMutation] = useMutation(mutationAddNotification)
    const [modalShareProfile, setModalShareProfile] = useState(false)

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
                setModalMore(false)
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
                setModalMore(false)
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
            setModalMore(false)
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
            setModalMore(false)
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

    const handleShowShareProfile = () => {
        setModalShareProfile(true)
    }

    const handlePrintToPdf = () => {
        setModalMore(false)
        const input = document.getElementById('profile-container-id');
        const hideModal = document.getElementById('modal-more-container') as HTMLElement
        hideModal.style.display = 'none'
        const pdf = new jsPDF();
        var width = pdf.internal.pageSize.getWidth();
        var height = pdf.internal.pageSize.getHeight();
        html2canvas(input as HTMLElement)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png', 100);

                pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
                // pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
                // pdf.output('dataurlnewwindow');
                pdf.save(`${userData.firstName.concat(" ").concat(userData.lastName).concat(".pdf")}`);
                hideModal.style.display = 'block'
            });
    }

    return (
        <>
            {
                modalShareProfile === true && <ShareProfileModal userData={userData} setModalShareProfile={setModalShareProfile} />
            }
            <div className='modal-more-container' id='modal-more-container'>
                {
                    userData.id === UserContext.User.id ?
                        (
                            <div className='modal-more-container__content'>
                                <button className='modal-more-container__content__current-user-button' onClick={handleShowShareProfile}>Share Profile</button>
                                <button className='modal-more-container__content__current-user-button' onClick={handlePrintToPdf}>Save As PDF</button>
                            </div >
                        )
                        :
                        (
                            <div className='modal-more-container__content'>
                                <button className='modal-more-container__content__current-user-button' onClick={handleShowShareProfile}>Share Profile</button>
                                <button className='modal-more-container__content__current-user-button' onClick={handlePrintToPdf}>Save As PDF</button>
                                {
                                    checkFollowStatus === "followed" ?
                                        (<button className='modal-more-container__content__current-user-button' onClick={handleUnfollow}>UnFollow</button>)
                                        :
                                        (<button className='modal-more-container__content__current-user-button' onClick={handleFollow}>Follow</button>)
                                }

                                {
                                    checkBlockUser === "blocked" ?
                                        (<button className='modal-more-container__content__current-user-button' onClick={handleUnBlockUser}>UnBlock</button>)
                                        :
                                        (<button className='modal-more-container__content__current-user-button' onClick={handleBlock}>Block</button>)
                                }
                            </div >
                        )
                }
            </div >
        </>
    )
}

export default MoreModal