import React,{Component} from 'react';
import M from "materialize-css";
import { connect } from 'react-redux'

class MyprofileModal extends Component{
    
    componentDidMount(){
        M.AutoInit()
    }
    render(){
        console.log(this.props.profile)
        return (
            <div id="modal4" class="modal">
              <div class="modal-content red-text text-accent-1">
                <h4>ようこそ 本Hisへ</h4>
                <hr />
                <p>{this.props.profile.firstName}・{this.props.profile.lastName}さんのIDは</p>
                <h6 className='black-text'>
                    {this.props.auth.uid}
                    <a href="#!"  onClick={() => navigator.clipboard.writeText(this.props.auth.uid)}><i className="material-icons">content_copy</i></a>
                </h6>
                <p>友達や気になる人とIDを交換して楽しもう</p>
              </div>
              <div class="modal-footer">
                <a href="#!" class="modal-close btn pink lighten-1 z-depth-0">閉じる</a>
              </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps)(MyprofileModal);