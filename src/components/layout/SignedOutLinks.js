import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
    return (
            <ul className="right">
            <li><NavLink to='/signup'>Signup</NavLink></li>
            <li><NavLink to='/signin'>Log In</NavLink></li>
            <li><NavLink to='/bookcreate'>本の登録</NavLink></li>
        </ul>
    )
}

export default SignedOutLinks;