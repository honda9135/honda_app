import React,{Component} from 'react';
import { connect } from 'react-redux'
import firebase from '../../config/fbConfig'
import { NavLink } from 'react-router-dom'
import FollowSearch from './FollowSearch'

class FollowModal extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            follow_users:[],
            follow_uid:props.profile.follow
        }
        this.getUser = this.getUser.bind(this)
    }

    componentDidMount(){
        this.getUser()
    }

    getUser(){
        var db = firebase.firestore()
        var follow_users = []
        this.props.profile.follow.map(uid => {
            db.collection('users').doc(uid).get().then(
                snapshot => {
                    var data = snapshot.data()
                    follow_users = [...follow_users,{...data,uid:uid}]
                }
            ).then(() => {
                this.setState({
                    follow_users:follow_users
                })
            })
            return(null)
        })
    }

    componentDidUpdate(){
        this.FollowerUpdate(this.state.follow_uid,this.props.profile.follow)
    }

    FollowerUpdate(beforeFollower,afterFollower){
        console.log(beforeFollower.length,afterFollower.length,'beforeFollower.length!==afterFollower.length')
        if(beforeFollower.length===afterFollower.length){
            return null
        }else{
            this.getUser()
            this.setState({
                follow_uid:afterFollower
            })
        }
    }

    render(){
        console.log(this.props.profile,'profile')
        return (
        <div id="modal2" class="modal bottom-sheet">
            <div class="modal-content">
                <h3 className='header'>follower
                    <a className="green-text  modal-trigger" href="#modal3">
                        <i className="material-icons">search</i>
                    </a>
                </h3>
                <ul className='collection'>
                    {this.state.follow_users.map(user =>{
                        return (
                            <li className='collection-item '>
                                <NavLink to={'/follow/'+user.uid}>
                                    <p  className='btn btn-floating circl modal-close'>{user.initials}</p>
                                    <span className='modal-close'>{user.firstName+'・'+user.lastName}</span>
                                </NavLink>
                            </li>        
                        )
                    })} 
                </ul>
            </div>
            <div class="modal-footer">
                <a href="#!" class="modal-close btn pink lighten-1 z-depth-0">閉じる</a>
            </div>
            <FollowSearch profile={this.props.profile}/>
        </div>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps,null)(FollowModal);