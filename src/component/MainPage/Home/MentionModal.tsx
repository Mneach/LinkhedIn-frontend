import { useQuery } from '@apollo/client'
import React from 'react'
import { queryUser } from '../../../lib/graphql/query'
import { UserType } from '../../../model/model'
import '../../../sass/layout/MainPage/mentionModal.scss'


const MentionModal = ({ userId }: { userId: string }) => {

  const { loading, error, data } = useQuery(queryUser, { variables: { userId: userId } })

  if (loading) {
    return (
      <div className='modal-mention-container'>
        <p>Loading...</p>
      </div>
    )
  } else {
    const userData = data.User as UserType
    return (
      <div className='modal-mention-container'>
        <div className="modal-mention-content-container">
          <div className='modal-mention-left-content'>
            {
              userData.profileImageUrl === "" ?
                (<img src="../../src/assets/dummy_avatar.jpg" alt="" />)
                :
                (<img src={userData.profileImageUrl}></img>)
            }
          </div>
          <div className='modal-mention-right-content'>
            <p className='modal-mention-username'>{userData.firstName} {userData.lastName}</p>
            <p className='modal-mention-headline'>{userData.headline}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default MentionModal