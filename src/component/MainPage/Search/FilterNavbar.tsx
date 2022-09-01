import React, { useState } from 'react'
import { setString } from '../../../model/FormModel'
import '../../../sass/layout/MainPage/filterNavbar.scss'

const FilterNavbar = ({setFilter} : {setFilter : setString}) => {

    const [buttonUser , setButtonUser] = useState("button1")
    const [buttonPost , setButtonPost] = useState("button1")
    const [buttonFilter , setButtonFilter] = useState("button1")

    const changeFilterUser = () => {
        setFilter("User")
        setButtonUser("button-active")
        setButtonPost("button1")
        setButtonFilter("button1")
    }

    const changeFilterPost = () => {
        setFilter("Post")
        setButtonUser("button1")
        setButtonPost("button-active")
        setButtonFilter("button1")
    }

    const resetFilter = () => {
        setFilter("")
        setButtonUser("button1")
        setButtonPost("button1")
        setButtonFilter("button-active")
    }

    return (
        <div className='navbar-filter-container'>
            <div className='button-container'>
                <button className={`${buttonUser}`} onClick={changeFilterUser}>Users</button>
                <button className={`${buttonPost}`} onClick={changeFilterPost}>Posts</button>
                <button className={`${buttonFilter}`} onClick={resetFilter}>All Filter</button>
            </div>
        </div>
    )
}

export default FilterNavbar