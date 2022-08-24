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

    const resetForm = () => {
        setRegisterData((prev) => ({ ...prev, password: "" }))
    }

    const registerHandler = () => {
        if (registerData.password.length <= 6) {
            resetForm()
            toastError("Password Must Be More Than 6 Characters", "top-right", "colored")
        } else {
            setRegisterState(registerStateData.at(2))
        }
    }

    console.log(registerData)

    return (
        <>
            <div className='contentpage__mid'>
                <div className='contentpage__headertext'>Join LinkhedIn</div>
                <div className='contentpage__googleData'>
                    <div className='contentpage__googleData__profilePhoto'>
                        <img src={registerData.profileImageUrl} referrerPolicy="no-referrer" alt="" />
                    </div>
                    <div className='contentpage__googleData__userInformation'>
                        <p className='contentpage__googleData__userInformation__name'>{registerData.firstName} {registerData.lastName}</p>
                        <p className='contentpage__googleData__userInformation__email'>{registerData.email}</p>
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