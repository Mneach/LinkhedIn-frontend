import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Footer from '../../component/LandingPage/Footer'
import Navbar from '../../component/LandingPage/Navbar'
import { mutationUpdatePassword, queryUserByResetPasswordId } from '../../lib/graphql/query'
import { StorageKey } from '../../lib/keys/key'
import { User } from '../../model/model'

const ResetPassword = () => {

    let id: string = ""
    const navigate = useNavigate()
    const { resetPasswordId } = useParams()
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [errorForm, setErrorForm] = useState("")

    const { loading, error, data } = useQuery(queryUserByResetPasswordId, {
        variables: { resetPasswordId },
        errorPolicy: "all"
    })

    const [updatePasswordUser, { loading: loadingUpdatePassword, error: errorUpdatePassword, data: dataUpdatePassword, called: updateCalled }] = useMutation(mutationUpdatePassword, {})

    useEffect(() => {
        if (localStorage.getItem(StorageKey.JwtTokenKey) !== null) {
            navigate("/mainPage")
        }
    }, [])

    if (loading) return <p>loading...</p>
    if (loadingUpdatePassword) return <p>loading...</p>

    const resetPasswordHanlder = () => {
        if (password !== passwordConfirm) {
            setErrorForm("Confirm Password Not Match")
        } else if (password.length <= 6) {
            setErrorForm("Password length must be at leats 7 characters")
        } else {
            updatePasswordUser({ variables: { id, password } })
        }
    }

    const movePageLogin = () => {
        navigate('/')
    }

    if (updateCalled && !loadingUpdatePassword && dataUpdatePassword && errorUpdatePassword === undefined) {
        movePageLogin()
    }

    if (data) id = (data.UserByResetPasswordId.id)

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
                                <button className='contentpage__button__loginPage' onClick={movePageLogin}>Go To Login</button>
                            </div>
                        )
                        :
                        (
                            <div className='contentpage__mid3'>
                                <div className='contentpage__headertext'>Create New Password</div>
                                <div className='contentpage__input__container'>
                                    <label htmlFor="password">Password (7 or more characters)</label>
                                    <input type="password" placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input type="password" placeholder='Enter Your Confirm Password' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                                </div>
                                {
                                    errorForm !== "" ?
                                        (
                                            <div className='contentpage__error'>
                                                {
                                                    errorForm
                                                }
                                            </div>
                                        )
                                        :
                                        (
                                            errorUpdatePassword !== undefined ?
                                                (
                                                    errorUpdatePassword?.graphQLErrors.map(({ message }, i) => (
                                                        <span key={i}>{message}</span>
                                                    ))
                                                )
                                                :
                                                (null)
                                        )
                                }
                                <button className='contentpage__button__signin' onClick={resetPasswordHanlder}>Reset Password</button>
                            </div>
                        )
                }
            </div>
            <Footer />
        </div>
    )
}

export default ResetPassword