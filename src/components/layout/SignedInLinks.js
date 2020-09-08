import React,{Component} from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import M from "materialize-css";
import FollowModal from '../follow/FollowModal'


class SignedInLinks extends Component{
    componentDidMount() {
        //var elems = document.querySelectorAll('.modal');
        //M.Modal.init(elems,{});
        //Paginationを使用するためMeterializeを初期化
        M.AutoInit()
    }
    render(){
        console.log(this.props.profile.isLoaded,'isLoaded')
        return (
            <frameElement>
                <ul className="right">
                <li><NavLink to='/mybookcatalog' className="red-text text-accent-1">読書本一覧</NavLink></li>
                <li><a class="modal-trigger red-text text-accent-1" href="#modal2">follow</a></li>
                <li><a href="#!" className="red-text text-accent-1" onClick={this.props.signOut}>Log Out</a></li>
                <li><NavLink to='/' className="btn btn-floating">{this.props.profile.initials}</NavLink></li>
                {/* <li><NavLink to='/test' className="btn btn-floating">tt</NavLink></li> */}
                </ul>
                {
                    this.props.profile.isLoaded
                    ?
                    <FollowModal profile={this.props.profile} /> 
                    :
                    null
                } 
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