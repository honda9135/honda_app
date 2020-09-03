import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
    return (
            <ul className="right navbar">
            <li><NavLink to='/signup' className="red-text text-accent-1">Signup</NavLink></li>
            <li><NavLink to='/signin' className="red-text text-accent-1">Log In</NavLink></li>
        </ul>
    )
}

export default SignedOutLinks;