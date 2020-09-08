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
            num:0,
            searchtag:false
        }
        this.getUser = this.getUser.bind(this)
    }

    getUser(uid){
        this.setState({
            num:this.state.num +1
        })
        var db = firebase.firestore()
        db.collection('users').doc(uid).get().then(
            snapshot => {
                var data = snapshot.data()
                console.log(this.state.follow_users,'data')
                this.setState({
                    follow_users:[...this.state.follow_users,{...data,uid:uid}]
                })
            }
        )
    }

    render(){
        console.log(this.props.profile.follow)
        console.log(this.state.follower_uid,'followers')
        console.log(this.state)
        if(this.props.profile.follow&&this.state.num===0){
             this.props.profile.follow.map(uid => {
                 this.getUser(uid);
                 return(null)
             })
        }

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
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">閉じる</a>
            </div>
            <FollowSearch />
        </div>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile:state.firebase.profile
    }
}

export default connect(mapStateToProps,null)(FollowModal);