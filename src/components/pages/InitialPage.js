import React,{Component} from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class InitialPage extends Component{
    render(){
        const { auth } = this.props;
        
        //もしログインしてなかったらsigninにリダイレクト
        if (auth.uid) return <Redirect to='/dashbord' />

        return (
            <div>
                <h3>WellCome to 本His(β版)</h3>
                <p className='center initContent'>
                    読書は食事と同じです。
                    <br />
                   あなたがこれまでに食べたものは体を作ります
                   <br />
                   あなたが読んだ本はあなたの性格・心を作っています
                </p>
                <img className='center initialImage'
                    src='https://firebasestorage.googleapis.com/v0/b/home-90900.appspot.com/o/initialPage.png?alt=media&token=f8b25104-d415-4a70-bfca-e087568069b2' 
                    alt='heart' />
                <p className='center initContent'>
                   あなたの心はどのような本達で形作られていますか
                   <br />
                   本Hisであなたの読書(心)の記録をして、友達とシェアしましょう。
                   <br />
                   <NavLink to='/signup' className="btn   pink lighten-1 z-depth-0  pulse center">
                    SignUp
                    </NavLink>
                </p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, null)(InitialPage)
