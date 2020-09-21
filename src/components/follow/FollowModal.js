import React, { Component } from 'react';
import { connect } from 'react-redux'
import firebase from '../../config/fbConfig'
import { NavLink } from 'react-router-dom'
import FollowSearch from './FollowSearch'
import M from "materialize-css";


class FollowModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            follow_users: [],
            follow_uid: []
        }
        this.getUser = this.getUser.bind(this)
    }

    componentDidMount() {
        this.FollowerUpdate(this.state.follow_uid, this.props.profile.follow)
        M.AutoInit()
    }
    componentDidUpdate() {
        this.FollowerUpdate(this.state.follow_uid, this.props.profile.follow)
    }

    getUser() {
        var db = firebase.firestore()
        var follow_users = []
        this.props.profile.follow.map(uid => {
            db.collection('users').doc(uid).get().then(
                snapshot => {
                    var data = snapshot.data()
                    follow_users = [...follow_users, { ...data, uid: uid }]
                }
            ).then(() => {
                this.setState({
                    follow_users: follow_users
                })
            })
            return (null)
        })
    }

    FollowerUpdate(beforeFollower, afterFollower) {
        if (beforeFollower.length === afterFollower.length) {
            //followerの変更なし
            return null
        } else if (afterFollower.length === 0) {
            //followerの変更が行われてfollowerがいなくなった時
            this.setState({
                follow_uid: [],
                follow_users: []
            })
        } else {
            //followerの変更が行われた時
            this.getUser()
            this.setState({
                follow_uid: afterFollower
            })
        }
    }


    render() {
        return (
            <div id="modal2" class="modal bottom-sheet">
                <div class="modal-content">
                    <h3 className='header'>follower
                    <a className="green-text  modal-trigger" href="#modal3">
                            <i className="material-icons">search</i>
                        </a>
                    </h3>
                    <ul className='collection'>
                        {this.state.follow_users.map(user => {
                            return (
                                <li className='collection-item follow-modal'>
                                    <NavLink to={'/follow/' + user.uid}>
                                        <p className='btn btn-floating   circl modal-close'>{user.initials}</p>
                                        <span className='modal-close'>{user.firstName + '・' + user.lastName} </span>
                                    </NavLink>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div class="modal-footer">
                    <a href="#!" class="modal-close btn pink   lighten-1 z-depth-0">閉じる</a>
                </div>
                <FollowSearch profile={this.props.profile} />
            </div>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}


export default connect(mapStateToProps, null)(FollowModal);