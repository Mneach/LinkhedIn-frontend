import React, { useEffect } from 'react'
import { toastError } from '../../lib/toast/toast'
import { enumMonthType, setRegisterStateType, setTimeInputType, timeInputType } from '../../model/FormModel'

const RegisterTime = ({ timeInput, setTimeInput, registerStateData, setRegisterState, userChoose }
  :
  { timeInput: timeInputType, setTimeInput: setTimeInputType, registerStateData: string[], setRegisterState: setRegisterStateType, userChoose: string }) => {

    useEffect(() => {
      if(timeInput.yearStartDate === "") timeInput.yearStartDate = "2022"
      if(timeInput.yearEndDate === "") timeInput.yearEndDate = "2030"
    } , [])

    const resetTimeInput = () =>  {
      setTimeInput((prev) => ({ ...prev, yearStartDate: "", yearEndDate: "" }))
    }

  const timeHandler = () => {
    if (timeInput.yearStartDate === "") {
      toastError("Please enter year start data", "top-right", "colored")
    } else if (timeInput.yearEndDate === "") {
      toastError("Please enter year end data", "top-right", "colored")
    } else if (timeInput.yearStartDate >= timeInput.yearEndDate) {
      toastError("Start Year Must Be Less Than End Year", "top-right", "colored")
    } else {
      setRegisterState(registerStateData.at(6))
    }
  }

  const backButton = () => {
    resetTimeInput()
    if(userChoose === "worker"){
      setRegisterState(registerStateData.at(3))
    }else{
      setRegisterState(registerStateData.at(4))
    }
  }

  return (
    <>
      <div className='contentpage__top'>
        <p className='contentpage__top__title'>
          {
            userChoose === "worker" ?
              (<p>How Long Have You Been Working ?</p>)
              :
              (<p>How Long Is Your Education ?</p>)
          }
        </p>
      </div>
      <div className='contentpage__mid5'>
        <div className='contentpage__input__container'>
          <div className='contentpage__input__container__group'>
            <div>
              <label htmlFor="lastName">Start Year</label>
              <select value={timeInput.yearStartDate} onChange={(e) => setTimeInput((prev) => ({ ...prev, yearStartDate: e.target.value }))}>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
                <option value="2009">2009</option>
                <option value="2008">2008</option>
                <option value="2007">2007</option>
                <option value="2006">2006</option>
                <option value="2005">2005</option>
                <option value="2004">2004</option>
                <option value="2003">2003</option>
                <option value="2002">2002</option>
                <option value="2001">2001</option>
                <option value="2000">2000</option>
                <option value="1999">1999</option>
                <option value="1998">1998</option>
                <option value="1997">1997</option>
                <option value="1996">1996</option>
                <option value="1995">1995</option>
                <option value="1994">1994</option>
                <option value="1993">1993</option>
                <option value="1992">1992</option>
                <option value="1991">1991</option>
                <option value="1990">1990</option>
              </select>
            </div>
            <div>
              <label htmlFor="firstName">End Year (or exptected)</label>
              <select value={timeInput.yearEndDate} onChange={(e) => setTimeInput((prev) => ({ ...prev, yearEndDate: e.target.value }))}>
                <option value="2030">2030</option>
                <option value="2029">2029</option>
                <option value="2028">2028</option>
                <option value="2027">2027</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
                <option value="2009">2009</option>
                <option value="2008">2008</option>
                <option value="2007">2007</option>
                <option value="2006">2006</option>
                <option value="2005">2005</option>
                <option value="2004">2004</option>
                <option value="2003">2003</option>
                <option value="2002">2002</option>
                <option value="2001">2001</option>
                <option value="2000">2000</option>
                <option value="1999">1999</option>
                <option value="1998">1998</option>
                <option value="1997">1997</option>
                <option value="1996">1996</option>
                <option value="1995">1995</option>
                <option value="1994">1994</option>
                <option value="1993">1993</option>
                <option value="1992">1992</option>
                <option value="1991">1991</option>
                <option value="1990">1990</option>
              </select>
            </div>
          </div>
        </div>
        <button className='contentpage__button__signin' onClick={timeHandler}>Continue</button>
        <button className='contentpage__button__google' onClick={backButton}>Back</button>
      </div>
    </>
  )
}

export default RegisterTime