import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../../hooks/UserContext'
import { mutationAddExperience } from '../../../lib/graphql/query'
import { toastError, toastSuccess } from '../../../lib/toast/toast'
import { enumCountryType, enumEmploymentType, enumIndustryType, enumMonthType, setBoolean } from '../../../model/FormModel'
import { EducationType } from '../../../model/model'

const ExperienceModalAdd = ({ modalExperience, setModalExperience }: { modalExperience: boolean, setModalExperience: setBoolean }) => {


    const UserContext = useUserContext()
    const [experienceAddMutation, { loading, error, called }] = useMutation(mutationAddExperience)

    const [experienceData, setExperienceData] = useState({
        id: "",
        userId: UserContext.User.id,
        title: "",
        employmentType: "",
        companyName: "",
        country: "",
        city: "",
        isActive: false,
        industry: "",
        monthStartDate: "",
        monthEndDate: "",
        yearStartDate: "",
        yearEndDate: "",
    })

    useEffect(() => {
        if (!error) {
            if (called && !loading) {
                UserContext.userRefetch().then((e) => {
                    toastSuccess("Success Add Experience!", 'top-right', 'colored')
                    handlemodalExperience()
                }).catch((error) => {
                    toastError(error, 'top-right', 'colored')
                })
            }
        } else {
            toastError(`${error}`, 'top-right', 'colored')
        }
    }, [called, loading])

    const handleExperienceAdd = () => {
        experienceAddMutation({
            variables: {
                userId: experienceData.userId,
                title: experienceData.title,
                employmentType: experienceData.employmentType,
                companyName: experienceData.companyName,
                country: experienceData.country,
                city: experienceData.city,
                isActive: experienceData.isActive,
                industry: experienceData.industry,
                monthStartDate: experienceData.monthStartDate,
                monthEndDate: experienceData.monthEndDate,
                yearStartDate: experienceData.yearStartDate,
                yearEndDate: experienceData.yearEndDate,
            }
        })
    }

    const handlemodalExperience = () => {
        setModalExperience(false)
    }

    return (
        <div className='modal-container'>
            <div className='modal-content'>
                <div className='modal-content__title-container'>
                    <p className='title'>Add Education</p>
                    <button className='button1' onClick={handlemodalExperience}>
                        <img src="../../src/assets/close.png" alt="" />
                    </button>
                </div>
                <div className='line-modal'></div>
                <div className='modal-content__content-container'>
                    <div className='content'>
                        <label htmlFor="Title">Title</label>
                        <input className='inputText' required type="text" placeholder='Ex: Software Engineer' value={experienceData.title} onChange={(e) => setExperienceData((prev) => ({ ...prev, title: e.target.value }))} />
                    </div>
                    <div className='content'>
                        <label htmlFor="lastName">Employment Type</label>
                        <select className='inputSelect' value={experienceData.employmentType} onChange={(e) => setExperienceData((prev) => ({ ...prev, employmentType: e.target.value }))}>
                            <option value="" disabled>Select Your Type</option>
                            {
                                Object.keys(enumEmploymentType).map((employmentData, id) => {
                                    return (<option value={employmentData} key={id}>{employmentData}</option>)
                                })
                            }
                        </select>
                    </div>
                    <div className='content'>
                        <label htmlFor="company">Company</label>
                        <input className='inputText' required type="text" placeholder='Ex: Microsoft' value={experienceData.companyName} onChange={(e) => setExperienceData((prev) => ({ ...prev, companyName: e.target.value }))} />
                    </div>
                    <div className='content'>
                        <label htmlFor="firstName">Country</label>
                        <select className='inputSelect' value={experienceData.country} onChange={(e) => setExperienceData((prev) => ({ ...prev, country: e.target.value }))}>
                            <option value="" disabled>Select Your Country</option>
                            {
                                Object.keys(enumCountryType).map((countryType, id) => {
                                    return (<option value={countryType} key={id}>{countryType}</option>)
                                })
                            }
                        </select>
                    </div>
                    <div className='content'>
                        <label htmlFor="lastName">City</label>
                        <select className='inputSelect' value={experienceData.city} onChange={(e) => setExperienceData((prev) => ({ ...prev, city: e.target.value }))}>
                            <option value="">Select Your City</option>
                            <option value="Jakarta">Jakarta</option>
                            <option value="West Java">West Java</option>
                            <option value="East Java">East Java</option>
                            <option value="Central Java">Central Java</option>
                            <option value="West Kalimantan">West Kalimantan</option>
                            <option value="South Kalimantan">South Kalimantan</option>
                            <option value="Central Kalimantan">Central Kalimantan</option>
                            <option value="West Sumatra">West Sumatra</option>
                            <option value="South Sumatra">South Sumatra</option>
                            <option value="North Sumatra">North Sumatra</option>
                            <option value="Bali">Bali</option>
                            <option value="Banten">Banten</option>
                        </select>
                    </div>
                    <div className='content'>
                        <div className='content__checkbox-container'>
                            <input checked={experienceData.isActive} className='inputCheckbox' type="checkbox" id='checkbox_id' onChange={(e) => setExperienceData((prev) => ({...prev , isActive : e.target.checked}))} />
                            <label htmlFor="checkbox_id">I am currently working in this role</label>
                        </div>
                    </div>
                    <div className='content'>
                        <label htmlFor="startDate">Start Date</label>
                        <div className='content__date'>
                            <select className='inputSelectDate' value={experienceData.monthStartDate} onChange={(e) => setExperienceData((prev) => ({ ...prev, monthStartDate: e.target.value }))}>
                                <option value="">Month</option>
                                {
                                    Object.keys(enumMonthType).map((monthData, i) => {
                                        return (<option value={monthData} key={i}>{monthData}</option>)
                                    })
                                }
                            </select>
                            <select className='inputSelectDate' value={experienceData.yearStartDate} onChange={(e) => setExperienceData((prev) => ({ ...prev, yearStartDate: e.target.value }))}>
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
                            <select className='inputSelectDate' value={experienceData.monthEndDate} onChange={(e) => setExperienceData((prev) => ({ ...prev, monthEndDate: e.target.value }))}>
                                <option value="">Month</option>
                                {
                                    Object.keys(enumMonthType).map((monthData) => {
                                        return (<option value={monthData}>{monthData}</option>)
                                    })
                                }
                            </select>
                            <select className='inputSelectDate' value={experienceData.yearEndDate} onChange={(e) => setExperienceData((prev) => ({ ...prev, yearEndDate: e.target.value }))}>
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
                        <label htmlFor="industry">Industry</label>
                        <select className='inputSelect' value={experienceData.industry} onChange={(e) => setExperienceData((prev) => ({ ...prev, industry: e.target.value }))}>
                            <option value="" disabled>Select Your Industry</option>
                            {
                                Object.keys(enumIndustryType).map((industryType, id) => {
                                    return (<option value={industryType} key={id}>{industryType}</option>)
                                })
                            }
                        </select>
                    </div>
                    <div className='button-container'>
                        <button className='button-submit' onClick={handleExperienceAdd}>Add</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ExperienceModalAdd