import React, { useState } from 'react'
import { AiFillHome, AiOutlineHome, AiOutlineMail } from 'react-icons/ai'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { MdOutlineArrowDropDown, MdOutlineWorkOutline } from 'react-icons/md'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../hooks/UserContext'
import { StorageKey } from '../../lib/keys/key'
import { useThemeContext } from '../../Provider/ThemeProvider'
import '../../sass/layout/MainPage/navbar.scss'
import { NavbarMenu } from './NavbarMenu'
import { IoSearchOutline } from 'react-icons/io5'

const Navbar = () => {

    const navigate = useNavigate()
    const UserContext = useUserContext()
    const [modalUser, setModalUser] = useState("hide")
    const [keyword, setKeywoard] = useState("")
    const ThemeContext = useThemeContext()

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

    const handleToggleTheme = () => {
        ThemeContext.changeCurrTheme()
    }

    const handleGotoHome = () => {
        navigate(`/mainPage`)
    }

    return (
        <nav className="navMainPage">
            <div className='navMainPage__leftContent'>
                <img className='logo-linkhedin' src={"/src/assets/linkedin.png"} alt="" onClick={handleGotoHome} />

                <div className='navMainPage__leftContent__form-search'>
                    {/* <img src="" alt="" /> */}
                    <input className='input__serch' value={keyword} onChange={(e) => setKeywoard(e.target.value)} type="text" placeholder='Search' />
                    <button onClick={handleSearch}>
                        <IoSearchOutline size={25} />
                    </button>
                </div>
            </div>
            <div className='navMainPage__rightContent'>
                <NavLink to={'/mainPage/home'} className={handleActiveMenu}>
                    <AiOutlineHome size={25} />
                    <p>Home</p>
                </NavLink>
                <NavLink to={'/mainPage/network'} className={handleActiveMenu}>
                    <HiOutlineUserGroup size={25} />
                    <p>My Network</p>
                </NavLink>
                <NavLink to={'/mainPage/jobs'} className={handleActiveMenu}>
                    <MdOutlineWorkOutline size={25} />
                    <p>Jobs</p>
                </NavLink>
                <NavLink to={'/mainPage/message/new'} className={handleActiveMenu}>
                    <AiOutlineMail size={25} />
                    <p>Message</p>
                </NavLink>
                <NavLink to={'/mainPage/notification'} className={handleActiveMenu}>
                    <IoMdNotificationsOutline size={25} />
                    <p>Notification</p>
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
                            <MdOutlineArrowDropDown size={25} />
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
                            <Link to={"#"}>
                                <p className='content' onClick={handleToggleTheme}>{localStorage.getItem(StorageKey.theme)} Theme</p>
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