import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'


const Navbar = (props) => {
    const { auth, profile } = props;

    //ログインしてなければSigndOutLinksしていればSignedInLinks
    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />

    return (
        <nav className="nav-wrapper white initnav">
            <div className="container ">
                <Link to='/dashbord' className="brand-logo left red-text text-accent-1">Book Paddy</Link>
                {links}
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar);