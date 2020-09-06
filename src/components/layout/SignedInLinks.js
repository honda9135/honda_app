import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
    return (
            <ul className="right">
            <li><NavLink to='/bookcatalog' className="red-text text-accent-1">読書本一覧</NavLink></li>
            <li><a href="#!" className="red-text text-accent-1" onClick={props.signOut}>Log Out</a></li>
            <li><NavLink to='/' className="btn btn-floating">{props.profile.initials}</NavLink></li>
            
            {/*
            <li><NavLink to='/test' className="btn btn-floating">tt</NavLink></li>
            */}
            
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);