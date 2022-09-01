import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../../hooks/UserContext'
import { mutationAddEducation } from '../../../lib/graphql/query'
import { toastError, toastSuccess } from '../../../lib/toast/toast'
import { enumMonthType, setBoolean } from '../../../model/FormModel'
import { EducationType } from '../../../model/model'

const EducationModalAdd = ({ modalEducation, setModalEducation }: { modalEducation: boolean, setModalEducation: setBoolean }) => {


    const UserContext = useUserContext()
    const [educationAddMutation , {loading , error , called}] = useMutation(mutationAddEducation)

    const [educationData, setEducationData] = useState({
        id: "",
        userId: UserContext.User.id,
        school: "",
        degree: "",
        fieldStudy: "",
        grade: "",
        activities: "",
        description: "",
        monthStartDate: "",
        monthEndDate: "",
        yearStartDate: "",
        yearEndDate: "",
    })

    useEffect(() => {
        if(!error){
            if(called && !loading){
                UserContext.userRefetch().then((e) => {
                    toastSuccess("Success Add Education!" , 'top-right' , 'colored')
                    handleModalEducation()
                }).catch((error) => {
                    toastError(error , 'top-right' , 'colored')
                })
            }
        }else{
            toastError(`${error}` , 'top-right' , 'colored')
        }
    } , [called , loading])

    const handleEducationAdd = () => {
        educationAddMutation({variables : {
            userId:educationData.userId,
            school:educationData.school,
            degree:educationData.degree,
            fieldStudy:educationData.fieldStudy,
            grade:educationData.grade,
            activities:educationData.activities,
            description:educationData.description,
            monthStartDate:educationData.monthStartDate,
            monthEndDate:educationData.monthEndDate,
            yearStartDate:educationData.yearStartDate,
            yearEndDate:educationData.yearEndDate,
        }})
    }

    const handleModalEducation = () => {
        setModalEducation(false)
    }

    return (
        <div className='modal-container'>
            <div className='modal-content'>
                <div className='modal-content__title-container'>
                    <p className='title'>Add Education</p>
                    <button className='button1' onClick={handleModalEducation}>
                        <img src="../../src/assets/close.png" alt="" />
                    </button>
                </div>
                <div className='line-modal'></div>
                <div className='modal-content__content-container'>
                    <div className='content'>
                        <label htmlFor="School">School</label>
                        <input className='inputText' required type="text" placeholder='Ex: Binus University' value={educationData.school} onChange={(e) => setEducationData((prev) => ({ ...prev, school: e.target.value }))} />
                    </div>
                    <div className='content'>
                        <label htmlFor="Degree">Degree</label>
                        <input className='inputText' required type="text" placeholder='Ex: Bachelors ' value={educationData.degree} onChange={(e) => setEducationData((prev) => ({ ...prev, degree: e.target.value }))} />
                    </div>
                    <div className='content'>
                        <label htmlFor="fieldOfStudy">Field Of Study</label>
                        <input className='inputText' required type="text" placeholder='Ex: Computer Science' value={educationData.fieldStudy} onChange={(e) => setEducationData((prev) => ({ ...prev, fieldStudy: e.target.value }))} />
                    </div>
                    <div className='content'>
                        <label htmlFor="startDate">Start Date</label>
                        <div className='content__date'>
                            <select className='inputSelectDate' value={educationData.monthStartDate} onChange={(e) => setEducationData((prev) => ({ ...prev, monthStartDate: e.target.value }))}>
                                <option value="">Month</option>
                                {
                                    Object.keys(enumMonthType).map((monthData , i) => {
                                        return (<option value={monthData} key={i}>{monthData}</option>)
                                    })
                                }
                            </select>
                            <select className='inputSelectDate' value={educationData.yearStartDate} onChange={(e) => setEducationData((prev) => ({ ...prev, yearStartDate: e.target.value }))}>
                                <option value="">Year</option>
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
                    <div className='content'>
                        <label htmlFor="startDate">End Date (or exptected)</label>
                        <div className='content__date'>
                            <select className='inputSelectDate' value={educationData.monthEndDate} onChange={(e) => setEducationData((prev) => ({ ...prev, monthEndDate: e.target.value }))}>
                                <option value="">Month</option>
                                {
                                    Object.keys(enumMonthType).map((monthData) => {
                                        return (<option value={monthData}>{monthData}</option>)
                                    })
                                }
                            </select>
                            <select className='inputSelectDate' value={educationData.yearEndDate} onChange={(e) => setEducationData((prev) => ({ ...prev, yearEndDate: e.target.value }))}>
                                <option value="">Year</option>
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
                    <div className='content'>
                        <label htmlFor="Grade">Grade</label>
                        <input className='inputText' required type="text" placeholder='Ex: 3.7' value={educationData.grade} onChange={(e) => setEducationData((prev) => ({ ...prev, grade: e.target.value }))} />
                    </div>
                    <div className='content'>
                        <label htmlFor="activitiesAndSocieties">Activities and Societies</label>
                        <textarea placeholder='Ex : Volleyball , Competitive Programming , Marching Band' value={educationData.activities} onChange={(e) => setEducationData((prev) => ({...prev , activities : e.target.value}))}></textarea>
                    </div>
                    <div className='content'>
                        <label htmlFor="description">Description</label>
                        <textarea value={educationData.description} onChange={(e) => setEducationData((prev) => ({...prev , description : e.target.value}))}></textarea>
                    </div>       
                    <div className='button-container'>
                        <button onClick={handleEducationAdd} className='button-submit'>Add</button>
                    </div>             
                </div>
            </div>

        </div>
    )
}

export default EducationModalAdd