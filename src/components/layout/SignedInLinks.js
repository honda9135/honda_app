import React,{Component} from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import M from "materialize-css";
//import FollowModal from '../follow/FollowModal'


class SignedInLinks extends Component{
    componentDidMount() {
        //Paginationを使用するためMeterializeを初期化
        M.AutoInit()
    }
    render(){
        return (
            <frameElement>
                <ul className="right">
                <li><NavLink to='/mypage' className="red-text text-accent-1">読書本一覧</NavLink></li>
                <li><a className="modal-trigger red-text text-accent-1" href="#modal2">follow</a></li>
                <li><a className="modal-trigger red-text text-accent-1" href="#modal5">図書館登録</a></li>
                <li><a href="#!" className="red-text text-accent-1" onClick={this.props.signOut}>Log Out</a></li>
                <li><a className="modal-trigger btn   btn-floating" href="#modal4">{this.props.profile.initials}</a></li>
                </ul>
            </frameElement>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);