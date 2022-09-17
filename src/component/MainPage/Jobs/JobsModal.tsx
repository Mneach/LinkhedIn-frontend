import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { mutationAddJobs } from '../../../lib/graphql/CreateQuery'
import { toastError, toastSuccess } from '../../../lib/toast/toast'
import { enumCountryType, enumEmploymentType, enumIndustryType, refectJobType, setBoolean } from '../../../model/FormModel'
import { JobsType } from '../../../model/model'

const JobsModal = ({ setModalJob, refechJob }: { setModalJob: setBoolean, refechJob: refectJobType }) => {

  const [jobAddMutation] = useMutation(mutationAddJobs)
  const [jobsData, setJobsData] = useState({
    title: "",
    companyName: "",
    workplace: "",
    city: "",
    country: "",
    employmentType: "",
    description: "",
  } as JobsType)

  const handleCloseModalJob = () => {
    setModalJob(false)
  }

  const validationInput = () => {
    if(jobsData.title == ""){
      toastError("You have to add the a title" , "top-right" , "colored")
    }else if(jobsData.companyName == ""){
      toastError("You have to add company name" , "top-right" , "colored")
    }else if(jobsData.workplace == ""){
      toastError("You have to add workplace" , "top-right" , "colored")
    }else if(jobsData.city == ""){
      toastError("You have to add city" , "top-right" , "colored")
    }else if(jobsData.country == ""){
      toastError("You have to add country" , "top-right" , "colored")
    }else if(jobsData.employmentType == ""){
      toastError("You have to add employment Type" , "top-right" , "colored")
    }else{
      handleAddJob()
    }
  }

  const handleAddJob = () => {
    jobAddMutation({
      variables: {
        title:jobsData.title , 
        companyName:jobsData.companyName , 
        workplace:jobsData.workplace , 
        city:jobsData.city , 
        country:jobsData.country , 
        employmentType:jobsData.employmentType , 
        description:jobsData.description
      }
    }).then((e) => {
      refechJob().then((e) => {
        toastSuccess("Success Add Job" , "top-right" , "colored")
        setModalJob(false)
      })
    }).catch((e) => {
      toastError((e) , "top-right" , "colored")
    })
  }

  return (
    <div className='modal-container'>
      <div className="modal-job-container">
        <div className="modal-job-title-container">
          <p className='title'>Add Job</p>
          <button className='button1' onClick={handleCloseModalJob}>
            <img src="../../src/assets/close.png" alt="" />
          </button>
        </div>
        <div className='line-modal'></div>
        <div className="modal-job-content-container">
          <div className='content'>
            <label htmlFor="title">Title</label>
            <input className='inputText' required type="text" placeholder='Ex: Software Engineer' value={jobsData.title} onChange={(e) => setJobsData((prev) => ({ ...prev, title: e.target.value }))} />
          </div>
          <div className='content'>
            <label htmlFor="companyName">CompanyName</label>
            <input className='inputText' required type="text" placeholder='Ex: Budipedia ' value={jobsData.companyName} onChange={(e) => setJobsData((prev) => ({ ...prev, companyName: e.target.value }))} />
          </div>
          <div className='content'>
            <label htmlFor="workplace">Workplace</label>
            <select className='inputSelect' value={jobsData.workplace} onChange={(e) => setJobsData((prev) => ({ ...prev, workplace: e.target.value }))}>
              <option value="">Select Your Workspace</option>
              <option value="Remote">Remote</option>
              <option value="On-Site">On-Site</option>
              <option value="Hybird">Hybird</option>
            </select>
          </div>
          <div className='content'>
            <label htmlFor="lastName">City</label>
            <select className='inputSelect' value={jobsData.city} onChange={(e) => setJobsData((prev) => ({ ...prev, city: e.target.value }))}>
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
            <label htmlFor="firstName">Country</label>
            <select className='inputSelect' value={jobsData.country} onChange={(e) => setJobsData((prev) => ({ ...prev, country: e.target.value }))}>
              <option value="" disabled>Select Your Country</option>
              {
                Object.keys(enumCountryType).map((countryType, id) => {
                  return (<option value={countryType} key={id}>{countryType}</option>)
                })
              }
            </select>
          </div>
          <div className='content'>
            <label htmlFor="lastName">Employment Type</label>
            <select className='inputSelect' value={jobsData.employmentType} onChange={(e) => setJobsData((prev) => ({ ...prev, employmentType: e.target.value }))}>
              <option value="" disabled>Select Your Type</option>
              {
                Object.keys(enumEmploymentType).map((employmentData, id) => {
                  return (<option value={employmentData} key={id}>{employmentData}</option>)
                })
              }
            </select>
          </div>
          <div className='button-container'>
            <button onClick={validationInput} className='button-submit'>Add</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobsModal