import { useQuery } from '@apollo/client'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Footer from '../../component/LandingPage/Footer'
import Navbar from '../../component/LandingPage/Navbar'
import { queryUserByActivationId } from '../../lib/graphql/query'
import { User } from '../../model/model'
import '../../sass/layout/LandingPage/content.scss'

const ActivationAccount = () => {

    const { activationId } = useParams()
    const navigate = useNavigate()

    const { loading, error, data } = useQuery(queryUserByActivationId, {
        variables: { activationId },
    })

    let ActivationDataUser = data as User
    if (data !== undefined) ActivationDataUser = data.UserByActivationId

    console.log(ActivationDataUser)

    const movePageLogin = () => {
        navigate('/')
    }

    const activeAccountHanlder = () => {

    }

    if (loading) return <p>Loading...</p>
    return (
        <div>
            <Navbar navbarModel='model2' />
            <div className='contentpage'>

                {
                    error !== undefined ?
                        (
                            <div className='contentpage__mid4'>
                                <p>
                                    {
                                        error?.graphQLErrors.map(({ message }, i) => (
                                            <span key={i}>{message}</span>
                                        ))
                                    }
                                </p>
                                <button className='contentpage__button__loginPage'  onClick={movePageLogin}>Go To Login</button>
                            </div>
                        )
                        :
                        (
                            ActivationDataUser.isActive === true ?
                                (
                                    <div className='contentpage__mid4'>
                                        <p>Your Account With Email <b>{ActivationDataUser.email}</b> Is Active</p>
                                        <button className='contentpage__button__loginPage'  onClick={movePageLogin}>Go To Login</button>
                                    </div>
                                )
                                :
                                (
                                    <div className='contentpage__mid4'>
                                        <p>Activate your account by clicking the button bellow</p>
                                        <button className='contentpage__button__loginPage'  onClick={activeAccountHanlder}>Activate Account</button>
                                    </div>
                                )
                        )
                }

            </div>
            <Footer />
        </div>
    )
}

export default ActivationAccount