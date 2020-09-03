import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
    return (
            <ul className="right">
            <li><NavLink to='/' className="red-text text-accent-1">読破本一覧</NavLink></li>
            <li><NavLink to='/bookcreate' className="red-text text-accent-1">読破本の登録</NavLink></li>
            <li><button onClick={props.signOut} className="red-text text-accent-1">Log Out</button></li>
            <li><NavLink to='/' className="btn btn-floating">{props.profile.initials}</NavLink></li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);