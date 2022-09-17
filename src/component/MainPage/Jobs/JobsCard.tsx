import React from 'react'
import { JobsType } from '../../../model/model'

const JobsCard = ({ job }: { job: JobsType }) => {
    return (
        <div className="job-mid-content-container">
            <div className='jobs-card-container'>
                <p className='title'>{job.title} - {job.employmentType}</p>
                <p className='company-name'>{job.companyName}</p>
                <p className='location'>{job.city} , {job.country} , ({job.workplace}) </p>
            </div>
        </div>
    )
}

export default JobsCard