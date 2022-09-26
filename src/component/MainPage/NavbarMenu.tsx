import React from 'react'

import '../../sass/layout/MainPage/navbar.scss'

import { AiFillHome } from 'react-icons/ai'

export const NavbarMenu = ({ icon, text }: { icon: string, text: string }) => {
    return (
        <>
            <img src={icon} alt="" />
            <p>{text}</p>
        </>
    )
}