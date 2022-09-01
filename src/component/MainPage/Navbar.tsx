import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../hooks/UserContext'
import { StorageKey } from '../../lib/keys/key'

import '../../sass/layout/MainPage/navbar.scss'
import { NavbarMenu } from './NavbarMenu'

const Navbar = () => {

    const navigate = useNavigate()
    const UserContext = useUserContext()
    const [modalUser, setModalUser] = useState("hide")
    const [keyword, setKeywoard] = useState("")

    const handleActiveMenu = (state: any) => {
        if (state.isActive) {
            return 'navMainPage__rightContent__menu__active'
        } else {
            return 'navMainPage__rightContent__menu'
        }
    }

    const showModalUser = () => {
        if (modalUser === "hide") {
            setModalUser("show")
        } else {
            setModalUser("hide")
        }
    }

    const signOutHandler = () => {
        localStorage.removeItem(StorageKey.JwtTokenKey)
        navigate('/')
    }

    const viewProfileHandler = () => {
        navigate(`/mainPage/profile/${UserContext.User.id}`)
    }

    const handleSearch = () => {
        navigate(`/mainPage/search/${keyword}`)
    }

    return (
        <nav className="navMainPage">
            <div className='navMainPage__leftContent'>
                <img src={"/src/assets/linkedin.png"} alt="" />

                <div className='navMainPage__leftContent__form-search'>
                    {/* <img src="" alt="" /> */}
                    <input className='input__serch' value={keyword} onChange={(e) => setKeywoard(e.target.value)} type="text" placeholder='Search' />
                    <button onClick={handleSearch}>
                        <img src="../../src/assets/search.png" alt="" />
                    </button>
                </div>
            </div>
            <div className='navMainPage__rightContent'>
                <NavLink to={'/mainPage/home'} className={handleActiveMenu}>
                    <NavbarMenu icon='/src/assets/home.png' text='Home' />
                </NavLink>
                <NavLink to={'/mainPage/network'} className={handleActiveMenu}>
                    <NavbarMenu icon='/src/assets/network.png' text='My Network' />
                </NavLink>
                <NavLink to={'/mainPage/job'} className={handleActiveMenu}>
                    <NavbarMenu icon='/src/assets/job.png' text='Jobs' />
                </NavLink>
                <NavLink to={'/mainPage/message'} className={handleActiveMenu}>
                    <NavbarMenu icon='/src/assets/message.png' text='Message' />
                </NavLink>
                <NavLink to={'/mainPage/notification'} className={handleActiveMenu}>
                    <NavbarMenu icon='/src/assets/notification.png' text='Notification' />
                </NavLink>
                <button onClick={showModalUser} className={"navMainPage__rightContent__button-profile"}>
                    <div className='navMainPage__rightContent__menu__user'>
                        {
                            UserContext.User.profileImageUrl ?
                                (<img src={UserContext.User.profileImageUrl} alt="" />)
                                :
                                (<img src="../../src/assets/dummy_avatar.jpg" alt="" />)
                        }
                        <div className='navMainPage__rightContent__menu__user__text-container'>
                            <p>Me</p>
                            <img src="/src/assets/arrow_down.png" alt="" />
                        </div>
                    </div>
                    <div className={`navMainPage__rightContent__modal-user ${modalUser}`}>
                        <div className='navMainPage__rightContent__modal-user__profile'>
                            <div>
                                {
                                    UserContext.User.profileImageUrl ?
                                        (<img src={UserContext.User.profileImageUrl} alt="" />)
                                        :
                                        (<img src="../../src/assets/dummy_avatar.jpg" alt="" />)
                                }
                            </div>
                            <div className='navMainPage__rightContent__modal-user__profile__text'>
                                <p className='title'>{UserContext.User.firstName} {UserContext.User.lastName}</p>
                                {
                                    Array.isArray(UserContext.User.Educations !== null) ?
                                        (<p>{UserContext.User.Educations[0].school}</p>) : (null)
                                }
                            </div>
                        </div>
                        <div className='navMainPage__rightContent__modal-user__button-container'>
                            <button className='__button__signin' onClick={viewProfileHandler}>view profile</button>
                        </div>
                        <div className='line'></div>
                        <div className='navMainPage__rightContent__modal-user__manage-container'>
                            <p className='title'>Manage</p>
                            <Link to={"/post"}>
                                <p className='content'>Post & Activity</p>
                            </Link>
                            <Link to={"/"}>
                                <p className='content'>Job Posting Account</p>
                            </Link>
                        </div>
                        <div className='line'></div>
                        <div className='navMainPage__rightContent__modal-user__signout-container'>
                            <button onClick={signOutHandler}>
                                <p>Sign Out</p>
                            </button>
                        </div>
                    </div>
                </button>

            </div>
        </nav>
    )
}

export default Navbar