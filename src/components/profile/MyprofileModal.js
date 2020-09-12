import React,{Component} from 'react';
import M from "materialize-css";
import { connect } from 'react-redux'

class MyprofileModal extends Component{
    
    componentDidMount(){
        M.AutoInit()
    }
    render(){
        
        return (
            <div id="modal4" class="modal">
              <div class="modal-content red-text text-accent-1">
                <h4>ようこそ 本Hisへ</h4>
                <hr />
                <p>{this.props.profile.firstName}・{this.props.profile.lastName}さんのIDは</p>
                <h6 className='black-text'>
                    {this.props.auth.uid}
                    <a href="#!"  
                        onClick={() => {if(navigator.clipboard){
                            navigator.clipboard.writeText(this.props.auth.uid)
                            }else{
                                alert('ブラウザがクリップボードのコピーに対応していません')
                            }}}>
                            <i className="material-icons copy-icons">content_copy</i>
                    </a>
                </h6>
                <p>友達や気になる人とIDを交換して楽しもう</p>
                <hr />

                <p className='officialAccount'>公式アカウント管理人本田のID(良かったらfollowしてね)</p>
                <p className='officialAccount-content'>
                    xKRUXBDbMrh7Kl386ltK3YUKNmB2
                    <a href="#!"  
                        onClick={() => {if(navigator.clipboard){
                            navigator.clipboard.writeText('xKRUXBDbMrh7Kl386ltK3YUKNmB2')
                            }else{
                                alert('ブラウザがクリップボードのコピーに対応していません')
                            }}}>
                            <i className="material-icons copy-icons">content_copy</i>
                    </a>
                </p>
              </div>
              <div class="modal-footer">
                <a href="#!" class="modal-close btn   pink lighten-1 z-depth-0">閉じる</a>
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