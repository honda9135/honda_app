//uidを使用してUserの検索を行う。登録を行う。
import React,{Component} from 'react';
import { connect } from 'react-redux'
import firebase from '../../config/fbConfig'
// import { NavLink } from 'react-router-dom'
import { registFollow } from '../../store/actions/followActions'


class FollowSearch extends Component {
    constructor(props){
        super(props)
        this.state = {
            uid:'',
            user:{},
            errtext:'',
        }
    }

    handleChange = (e) => {
        this.setState({
            uid: e.target.value
        })
    }

    handleSearch = (e) => {
        e.preventDefault()
        if(!this.state.uid){
            this.setState({
                errtext:'IDを見つけることができません。'
            })
            return null
        }

        var db = firebase.firestore()
        db.collection('users').doc(this.state.uid).get().then(
            snapshot => {
                var data = snapshot.data()
                if(data){
                    this.setState({
                        user:data
                    })
                }else{
                    this.setState({
                        user:{},
                        errtext:'IDを見つけることができません。'
                    })
                }
            }
        ).catch((err) =>{
            this.setState({
                errtext:'IDを見つけることができません。'
            })
        })
    }
    
    handleClear = (e) => {
        e.preventDefault()
        console.log(this.props.profile)
        this.setState({
            uid:this.state.uid,
            user:{},
            errtext:''
        })
    }
    
    handleRegist = (e) => {
        e.preventDefault()
        this.setState({
            errtext:''
        })
        this.props.registFollow({uid:this.state.uid,profile:this.props.profile,auth:this.props.auth})
    }

    render(){
        return (
            <div id="modal3" class="modal bottom-sheet">
                <div class="modal-content">
                <form onSubmit={this.handleSearch} id='uid' className="white createBookForm">
                    <h3  className="header red-text text-accent-1">ID検索</h3>
                    <div className="input-field">
                        <label htmlFor="uid">followしたいuserのIDを入力</label>
                        {
                            !Object.keys(this.state.user).length
                            ?
                            <input type="text" form='uid' id="uid"   onChange={this.handleChange} />    
                            :
                            <input type="text" form='uid' id="uid"  readOnly value={this.state.uid} onChange={this.handleChange} />
                        }
                        <div className="red-text center">
                            { this.state.errtext&& !Object.keys(this.state.user).length ? <p>{this.state.errtext}</p> : null }
                        </div>
                    </div>
                    <div className="input-field">
                        {
                            Object.keys(this.state.user).length
                            ?
                            <input type="reset" form="uid" onClick={this.handleClear}  className="btn    pink lighten-1 z-depth-0 searchClear" value='Clear'/>
                            // <a href='#!' onClick={this.handleClear} className="btn pink lighten-1 z-depth-0 searchClear">Clear</a>    
                            :
                            <button className="btn   pink lighten-1 z-depth-0">検索</button>
                        }
                    </div>
                    {
                        (() =>{
                            if(!Object.keys(this.state.user).length){
                                return null
                            }else if(this.props.profile.follow.includes(this.state.uid)){
                                return (
                                    <frameElement>
                                    <ul className='collection'>
                                        <li className='collection-item '>
                                            <p  className='btn btn-floating   circl '>{this.state.user.initials}</p>
                                            <span >{this.state.user.firstName+'・'+this.state.user.lastName}</span>
                                        </li>        
                                    </ul>
                                    <div className="red-text center">
                                        <p>すでにfollowしています。</p>
                                    </div>
                                    </frameElement>
                                )
                            }else if(this.props.auth.uid===this.state.uid){
                                return (
                                    <frameElement>
                                    <ul className='collection'>
                                        <li className='collection-item '>
                                            <p  className='btn btn-floating   circl '>{this.state.user.initials}</p>
                                            <span >{this.state.user.firstName+'・'+this.state.user.lastName}</span>
                                        </li>        
                                    </ul>
                                    <div className="red-text center">
                                        <p>自分はfollowできません。</p>
                                    </div>
                                    </frameElement>
                                )
                            }else{
                                return (
                                    <frameElement>
                                    <ul className='collection'>
                                        <li className='collection-item '>
                                            <p  className='btn btn-floating   circl '>{this.state.user.initials}</p>
                                            <span >{this.state.user.firstName+'・'+this.state.user.lastName}</span>
                                        </li>        
                                    </ul>
                                    <form onSubmit={this.handleRegist} className="white createBookForm">
                                        <div className="input-field">
                                            <button className="btn pink   lighten-1 modal-close z-depth-0">登録</button>
                                        </div>
                                    </form >
                                    </frameElement>
                                    )
                            }
                        })()
                    }
                </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state,props) => {
    return {
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registFollow: (reg) => dispatch(registFollow(reg))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FollowSearch);
