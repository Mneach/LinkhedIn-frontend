import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../component/LandingPage/Footer'
import Navbar from '../../component/LandingPage/Navbar'
import { mutationResetPassword } from '../../lib/graphql/query'
import { StorageKey } from '../../lib/keys/key'

const ForgotPassword = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("")
  const [formError, setFormError] = useState("")
  const [forgotPasswordMutation, { loading, error, data, called }] = useMutation(mutationResetPassword, { errorPolicy: "all" })

  useEffect(() => {
    if (localStorage.getItem(StorageKey.JwtTokenKey) !== null) {
      navigate("/mainPage")
    }
  }, [])

  if (loading) return <p>loading...</p>

  const forgotPasswordHandler = () => {
    if (email === "") {
      setFormError("Input Cannot Be Null")
    } else if (email.includes("@") == false) {
      setFormError("Email Must Include @ Symbol ")
    } else if (email.endsWith(".com") == false) {
      setFormError("Email With Ends With .com")
    } else {
      forgotPasswordMutation({ variables: { email } })
      setFormError("")
    }
  }

  if (called && !loading && data && error == undefined) {
    navigate('/activation')
  }

  return (
    <div>
      <Navbar navbarModel='model2' />
      <div className={"contentpage"}>
        <div className='contentpage__mid3'>
          <div className='contentpage__headertext'>Forgot Password?</div>
          <div className='contentpage__text1'>Reset password in two quick steps</div>
          <div className='contentpage__input__container'>
            <input type="email" placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {
            formError !== "" ?
              (
                <div className='contentpage__error'>
                  {
                    formError
                  }
                </div>
              )
              :
              (
                error !== undefined ?
                  (
                    <div className='contentpage__error'>
                      {
                        error?.graphQLErrors.map(({ message }, i) => (
                          <span key={i}>{message}</span>
                        ))
                      }
                    </div>
                  ) : (null)
              )
          }
          <button className='contentpage__button__signin' onClick={forgotPasswordHandler}>Reset Password</button>
          <Link to={'/'}>Back</Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ForgotPassword