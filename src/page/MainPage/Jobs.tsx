import { useQuery } from '@apollo/client'
import { isArray } from '@apollo/client/cache/inmemory/helpers'
import React, { useEffect, useState } from 'react'
import Footer from '../../component/MainPage/Footer'
import PostCard from '../../component/MainPage/Home/PostCard'
import JobsCard from '../../component/MainPage/Jobs/JobsCard'
import JobsModal from '../../component/MainPage/Jobs/JobsModal'
import Navbar from '../../component/MainPage/Navbar'
import { queryJobs } from '../../lib/graphql/SelectQuery'
import { JobsType } from '../../model/model'

import '../../sass/page/jobs.scss'

const Jobs = () => {

  const { loading: loadingJobs, data: dataJobs, error: errorJobs, refetch: refecthJobs } = useQuery(queryJobs)
  const [modalJobs, setModalJobs] = useState(false)

  useEffect(() => {
    refecthJobs()
  },)


  if (loadingJobs) return

  const jobsData = dataJobs.Jobs as Array<JobsType>

  const handleJobsModal = () => {
    setModalJobs(true);
  }

  return (
    <>
      {
        modalJobs === true && <JobsModal refechJob={refecthJobs} setModalJob={setModalJobs} />
      }
      <div style={{ backgroundColor: "var(--primary-color-1)", transitionDuration : "1s", minHeight: "100vh" }}>
        <Navbar />
        <div className='job-content-container'>
          <div className='job-container'>
            <div className="job-top-container">
              <button className='button2' onClick={handleJobsModal}>Create Job</button>
            </div>
            <div className="job-mid-container">
              <div className="job-mid-title">
                <p>Jobs For You</p>
              </div>

              {
                isArray(jobsData) && jobsData.map((job, index) => {
                  return (
                    <>

                      <JobsCard job={job} />

                      {
                        index === jobsData.length - 1 ? (null) : (<div className='line'></div>)
                      }
                    </>
                  )
                })
              }

            </div>
          </div>
          <div className="jobs-left-container">
            <Footer />
          </div>
        </div>

      </div>

    </>
  )
}

export default Jobs