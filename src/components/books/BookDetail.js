import React,{Component} from 'react'
import moment from 'moment'
import ReactStarsRating from 'react-awesome-stars-rating';
import M from "materialize-css";
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import firebase from '../../config/fbConfig'

class BookDetail extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            user_name:null
        }
        this.getUser = this.getUser.bind(this)
    }

    componentDidMount() {
        //collasibleを使用するためMeterializeを初期化
        M.AutoInit()
    }

    getUser(){
        var db = firebase.firestore()
        db.collection('users').doc(this.props.book.user).get().then(
                snapshot => {
                    var data = snapshot.data()
                    this.setState({
                        user_name:data.firstName +'・'+ data.lastName
                    })
                }
            )
        return(null)
    }

    render(){

        //custumClassはCompornentによってクラスを変更し、
        //表示を少し変えるため。
        const {book,custumClass} = this.props;
        if(this.props.auth.uid!==book.user&&book.user!=='tester'){
            console.log(this.props.book.user)
            this.getUser()
        }
        console.log(book,'book')
        
        return (
            <div className="row">
                <div className="col">
                    <ul className="collapsible">
                        <li>
                            <div className="collapsible-header">
                                <div className="card horizontal" >
                                    <div className="card-image">
                                        <img className='dashbord_img' src={book.imgUrl} alt="アイコン" />
                                    </div>
                                    <div className='card-stacked'>
                                        <div className={"card-content " + custumClass}>
                                            {/*↑classNameを変更できるようにした。cssで見た目を変える*/}
                                            <span className="card-title">{book.title}</span>
                                            <hr />
                                            <p>著者: {book.author}</p>
                                            <p>タグ: {book.tag.join(",")}</p>
                                            <ReactStarsRating   size={15} isEdit={false} value={book.star} />
                                            <p className="grey-text">読了日:{moment(book.createdAt.toDate()).calendar()}</p>
                                            <a href={book.url} rel="noopener noreferrer" target="_blank">商品ページへGo(amazon)</a>
                                            {
                                                book.user==='tester'
                                                ?
                                                    <p>
                                                        投稿者：tester
                                                    </p>
                                                :
                                                null
                                            }
                                            {
                                                book.user!=='tester' && this.state.user_name===null
                                                ?
                                                    <p>
                                                        投稿者：私
                                                        <NavLink to={'/editbook/'+book.id} className="green-text right">
                                                        <i className="material-icons">edit</i>
                                                        </NavLink>
                                                    </p>
                                                :
                                                null
                                            }
                                            {
                                                book.user!=='tester' &&this.state.user_name!==null
                                                ?
                                                <p>
                                                    投稿者：{this.state.user_name}
                                                    <NavLink to={'/follow/'+book.user} className="green-text right">
                                                        <i className="material-icons">face</i>
                                                    </NavLink>
                                                
                                                </p>
                                                :
                                                null
                                            }
                                        </div>    
                                    </div>
                                </div>
                            </div>
                            <div className="collapsible-body">
                            <p className='book-content-title'>感想・コメント</p>
                            {book.content}
                        </div>
                        </li>
                    </ul>
                </div>
        </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, null)(BookDetail)
