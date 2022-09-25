import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../../hooks/UserContext'
import { refectUserType, setUserType } from '../../../model/FormModel'
import { UserType } from '../../../model/model'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import UserInformationModal from '../modal/UserInformationModal'
import { storage } from '../../../lib/firebase/FirebaseConfig';
import { mutationUpdateUser } from '../../../lib/graphql/query';
import { useMutation } from '@apollo/client';
import { toastError, toastPromise, toastSuccess } from '../../../lib/toast/toast';
import MoreModal from '../modal/MoreModal';
import { mutationAddConnect, mutationAddConnectRequest, mutationAddNotification } from '../../../lib/graphql/CreateQuery';
import ConnectModal from './ConnectModal';
import { mutationDeleteConnectRequest } from '../../../lib/graphql/DeleteQuery';
import { useNavigate } from 'react-router-dom';

const UserInformation = ({ userData, refectCurrentUser }: { userData: UserType, refectCurrentUser: refectUserType }) => {

  const UserContext = useUserContext()
  const navigate = useNavigate()
  const [updateUser, { called, error, loading }] = useMutation(mutationUpdateUser)
  const [modalUser, setModalUser] = useState(false)
  const [modalMore, setModalMore] = useState(false)
  const [modalConnect, setModalConnect] = useState(false)
  const [addConnectionMutation] = useMutation(mutationAddConnect)
  const [deleteConnectRequestMutation] = useMutation(mutationDeleteConnectRequest)
  let connectedUser: boolean = false;
  let connectionRequest: boolean = false;
  let giveConnectionStatus: boolean = false;
  let checkBlockUser: string = "";

  const promiseBackground = (e: any) => {
    if ((e.target.files)[0] !== undefined) {
      toastPromise(() => changeBackgroundHandler(e), "Uploading Background...", "Success Uploading Background", "Failed Upload Image!")
    }
  }

  const promiseImage = (e: any) => {
    if ((e.target.files)[0] !== undefined) {
      toastPromise(() => changeImageHandler(e), "Uploading Photo...", "Success Uploading Photo", "Failed Upload Image!")
    }
  }

  const changeImageHandler = async (e: any) => {
    let imageUrl = ''
    if ((e.target.files)[0] !== undefined) {
      const refStorage = ref(storage, `${userData.email}/${((e.target.files)[0] as File).name}`)
      await uploadBytes(refStorage, (e.target.files)[0] as File, { contentType: 'profile pic' })
      imageUrl = await getDownloadURL(refStorage)
      console.log(imageUrl)
      updateUser({
        variables: {
          id: userData.id,
          email: userData.email,
          password: userData.password,
          isActive: userData.isActive,
          about: userData.about,
          profileImageUrl: imageUrl,
          backgroundImageUrl: userData.backgroundImageUrl,
          profileLink: userData.profileLink,
          firstName: userData.firstName,
          lastName: userData.lastName,
          pronouns: userData.pronouns,
          headline: userData.headline,
          country: userData.country,
          city: userData.city
        }
      })
    }
  }

  const changeBackgroundHandler = async (e: any) => {
    let backgroundUrl = ''
    console.log((e.target.files[0]))
    if ((e.target.files)[0] !== undefined) {
      const refStorage = ref(storage, `${userData.email}/${((e.target.files)[0] as File).name}`)
      await uploadBytes(refStorage, (e.target.files)[0] as File, { contentType: 'profile pic' })
      backgroundUrl = await getDownloadURL(refStorage)
      console.log(backgroundUrl)

      updateUser({
        variables: {
          id: userData.id,
          email: userData.email,
          password: userData.password,
          isActive: userData.isActive,
          about: userData.about,
          profileImageUrl: userData.profileImageUrl,
          backgroundImageUrl: backgroundUrl,
          profileLink: userData.profileLink,
          firstName: userData.firstName,
          lastName: userData.lastName,
          pronouns: userData.pronouns,
          headline: userData.headline,
          country: userData.country,
          city: userData.city
        }
      })
    }
  }

  const handleModalUser = () => {
    if (modalUser) setModalUser(false);
    else setModalUser(true)
  }

  const handleMoreModal = () => {
    if (modalMore) setModalMore(false);
    else setModalMore(true)
  }

  const handleConnectModal = () => {
    if (modalConnect === false) setModalConnect(true)
    else setModalConnect(false)
  }

  useEffect(() => {
    if (!error) {
      if (called && !loading) {
        UserContext.userRefetch().then((e) => {
          console.log(UserContext)
        }).catch((error) => {
          toastError(error, 'top-right', 'colored')
        })
      }
    } else {
      toastError(`${error}`, 'top-right', 'colored')
    }
  }, [called, loading])

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
        refectCurrentUser().then((e) => {
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
      refectCurrentUser().then((e) => {
        toastSuccess("Success Ignore Connection", "top-right", "colored")
      })
    }).catch((e) => {
      toastError((e), "top-right", "colored")
    })
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
    if (connectRequestData.toUser.id === UserContext.User.id) {
      giveConnectionStatus = true;
    }
  })

  UserContext.User.Blocks.map((blockData) => {
    if (blockData.blockId === userData.id) {
      checkBlockUser = "blocked";
    }
  })

  const handleMessage = () => {
    navigate(`/mainPage/message/temp/${userData.id}`, { state: userData })
  }

  return (
    <>
      {
        modalUser === true && <UserInformationModal modalUser={modalUser} setModalUser={setModalUser} />
      }{
        modalConnect === true && <ConnectModal refectCurrentUser={refectCurrentUser} userData={userData} setModalConnect={setModalConnect} />
      }
      <div className='profile-container__mid-container__userInformation-container__user-background'>
        {
          userData.backgroundImageUrl === "" ?
            (<img src={"../../src/assets/dummy_avatar.jpg"} alt="" />) : (<img src={userData.backgroundImageUrl} alt="" />)
        }
      </div>
      <div className='profile-container__mid-container__userInformation-container__user-edit'>
        <div className='profile-container__mid-container__userInformation-container__user-edit__user-image'>
          {
            userData.id === UserContext.User.id ?
              (
                <>
                  <label htmlFor="file-input" className=''>
                    {
                      userData.profileImageUrl === "" ?
                        (<img className='img1' src={"../../src/assets/dummy_avatar.jpg"} alt="" />) : (<img className='img1' src={userData.profileImageUrl} alt="" />)
                    }
                  </label>
                  <input id="file-input" type="file" onChange={(e) => promiseImage(e)} style={{ display: "none" }} />
                </>
              )
              :
              (
                <>
                  <label htmlFor="file-input" className=''>
                    {
                      userData.profileImageUrl === "" ?
                        (<img className='img2' src={"../../src/assets/dummy_avatar.jpg"} alt="" />) : (<img className='img2' src={userData.profileImageUrl} alt="" />)
                    }
                  </label>
                </>
              )
          }


        </div>
        {
          userData.id === UserContext.User.id ?
            (
              <button onClick={handleModalUser}>
                <img src="../../src/assets/pencil.png" alt="" />
              </button>
            ) : null
        }

      </div>
      <div className='profile-container__mid-container__userInformation-container__data-user-container'>
        <div className='profile-container__mid-container__userInformation-container__data-user-container__left'>
          <p className='username'>{userData.firstName} {userData.lastName}</p>
          <p className='education'>{userData.headline}</p>
          <p className='experience'></p>
          <p className='location'>{userData.city} , {userData.country}</p>
          <p className='datas'>
            <b>{userData.Connections.length}</b> Connections,
            <b> {userData.Follows.length}</b> Followers,
            <b> {userData.Visits.length}</b> Visit</p>
        </div>
        {/* <div className='profile-container__mid-container__userInformation-container__data-user-container__right'>
                                <p className='education'>{userData.Educations[0].school}</p>
                                <p className='experience'>faksldjflkdsafj</p>
                            </div> */}
      </div>
      <div className='profile-container__mid-container__userInformation-container__button-container'>
        {
          UserContext.User.id === userData.id ?
            (
              <>
                {/* <button className='button3'>Connect</button> */}
                {/* <button className='button2'>Message</button> */}

                <button className='button1' onClick={handleMoreModal}>More</button>
                {
                  modalMore === true && <MoreModal setModalMore={setModalMore} refectCurrentUser={refectCurrentUser} userData={userData} />
                }

              </>

            )
            :
            (
              <>
                {
                  connectedUser ?
                    (
                      <>
                        <button className='button3'>Connected</button>
                        {
                          checkBlockUser === "" && <button className='button2' onClick={handleMessage}>Message</button>
                        }
                      </>
                    )
                    :
                    (
                      connectionRequest ?
                        (<button className='button3'>Requested</button>)
                        :
                        (
                          giveConnectionStatus ?
                            (
                              <>
                                <button className='button1' onClick={() => declineConnectionHanlder(userData.id, UserContext.User.id)}>Ignore</button>
                                <button className='button2' onClick={() => accpetConnectionHandler(userData.id, userData.id, UserContext.User.id)}>Accept</button>
                              </>
                            )
                            :
                            (<button className='button3' onClick={handleConnectModal}>Connect</button>)
                        )
                    )
                }
                <button className='button1-relative' onClick={handleMoreModal}>
                  More
                  {
                    modalMore === true && <MoreModal setModalMore={setModalMore} refectCurrentUser={refectCurrentUser} userData={userData} />
                  }
                </button>

              </>
            )
        }

      </div>
      {
        userData.id === UserContext.User.id ?
          (
            <div className='profile-container__mid-container__userInformation-container__button-relative'>
              <label htmlFor="uploadBackground" className=''>
                <img src={"../../src/assets/photo-camera.png"} />
              </label>

              <input id="uploadBackground" type="file" onChange={(e) => promiseBackground(e)} style={{ display: "none" }} />

            </div>
          ) : (null)
      }

    </>
  )
}

export default UserInformation