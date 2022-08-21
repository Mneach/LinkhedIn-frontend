import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../component/LandingPage/Footer'
import Navbar from '../../component/LandingPage/Navbar'
import { mutationRegisterUser } from '../../lib/graphql/query'

const Register = () => {

  const navigate = useNavigate();
  const [regsiterUser, { data, loading, error }] = useMutation(mutationRegisterUser, { errorPolicy: "all" })
  const [registerError, setRegisterError] = useState("");
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  })

  console.log(data);
  console.log(error);
  console.log(registerError)

  const resetForm = () => {
    setRegisterData({ email: "", password: "" })
  }

  const registerHandler = () => {
    if (registerData.email === "" || registerData.password === "") {
      setRegisterError("Input Cannot Be Null")
    } else if (registerData.email.includes("@") == false) {
      setRegisterError("Email Must Include @ Symbol ")
    } else if (registerData.email.endsWith(".com") == false) {
      setRegisterError("Email With Ends With .com")
    } else if (registerData.password.length <= 6) {
      setRegisterError("Password Must Be More Than 6 Characters")
    } else {
      regsiterUser({ variables: { "input": { email: registerData.email, password: registerData.password } } })
      if (loading) return <p>Loading...</p>
      setRegisterError("")
      navigate('/activation')
    }

    resetForm()
  }

  return (
    <div>
      <Navbar navbarModel='model1' />
      <div className={"contentpage"}>
        {/* <div className='contentpage__top'>
          <p>You are almost connected to the world of professional work </p>
        </div> */}
        <div className='contentpage__mid'>
          <div className='contentpage__headertext'>Register</div>
          <div className='contentpage__input__container'>
            <label htmlFor="email">Email</label>
            <input required type="email" placeholder='Enter Your Email' value={registerData.email} onChange={(e) => setRegisterData((prev) => ({ ...prev, email: e.target.value }))} />
            <label htmlFor="password">Password (7 or more characters)</label>
            <input required type="password" placeholder='Enter Your Password' value={registerData.password} onChange={(e) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))} />
          </div>
          {
            registerError !== "" ?
              (
                <div className='contentpage__error'>
                  {
                    registerError
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
                  ) :
                  (
                    null
                  )
              )
          }
          <div className='contentpage__text2'>By clicking Agree & Join, you agree to the LinkedIn <Link to={'/register'}>User Agreement</Link>, <Link to={'/register'}>Privacy Policy</Link>, and <Link to={'/register'}>Cookie Policy</Link>.</div>
          <button className='contentpage__button__signin' onClick={registerHandler}>Agree & Join</button>
          <div className='contentpage__or__separator'>
            <span className='contentpage__or-text'>or</span>
          </div>
          <button className='contentpage__button__google'>
            <img src="/src/assets/google-logo.png" alt="" />
            Sign in with google
          </button>
          <div className='contentpage__bottom'>
            <p>Already on LinkedIn? <Link to={'/'}>Sign in</Link> </p>
          </div>
        </div>
        <div className='contentpage__bottom'>
          <p>Looking to create a page for a business? <Link to={'/register'}>Get Help</Link> </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Register