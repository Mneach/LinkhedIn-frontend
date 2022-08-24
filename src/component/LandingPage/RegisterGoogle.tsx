import { useLazyQuery } from '@apollo/client';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { queryUserByEmail } from '../../lib/graphql/query';
import { toastError } from '../../lib/toast/toast';
import { registerInputType, registerStateType, setRegisterInputType, setRegisterStateType } from '../../model/FormModel';

const RegisterGoogle = (
    { registerData, setRegisterData, registerStateData, setRegisterState }
        :
        { registerData: registerInputType, setRegisterData: setRegisterInputType, registerStateData: string[], setRegisterState: setRegisterStateType }) => {

    const [getUserByEmail] = useLazyQuery(queryUserByEmail, { errorPolicy: "all" })
    const [registerError, setRegisterError] = useState("");

    const resetForm = () => {
        setRegisterData((prev) => ({ ...prev, email: "", password: "" }))
    }

    const registerHandler = () => {
        if (registerData.password.length <= 6) {
            toastError("Password Must Be More Than 6 Characters", "top-right", "colored")
        } else {
            setRegisterError("")
            setRegisterState(registerStateData.at(2))
        }
    }

    return (
        <>
            <div className='contentpage__mid'>
                <div className='contentpage__headertext'>Join LinkhedIn</div>
                <div className='contentpage__googleData'>
                    <div>
                        <img src="" alt="" />
                    </div>
                    <div>
                        <p>Firstname</p>
                        <p>Email</p>
                    </div>
                </div>
                <div className='contentpage__input__container'>
                    <label htmlFor="password">Password (7 or more characters)</label>
                    <input required type="password" placeholder='Enter Your Password' value={registerData.password} onChange={(e) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))} />
                </div>
                <div className='contentpage__text2'>By clicking Agree & Join, you agree to the LinkedIn <Link to={'/register'}>User Agreement</Link>, <Link to={'/register'}>Privacy Policy</Link>, and <Link to={'/register'}>Cookie Policy</Link>.</div>
                <button className='contentpage__button__signin' onClick={registerHandler}>Agree & Join</button>
                <div className='contentpage__bottom'>
                    <p>Already have an account? <Link to={'/'}>Sign in</Link> </p>
                </div>
            </div>
        </>
    )
}

export default RegisterGoogle