import React,{Component} from 'react'
import moment from 'moment'
import ReactStarsRating from 'react-awesome-stars-rating';
import M from "materialize-css";
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'

class BookSummary extends Component {
    
    componentDidMount() {
        //collasibleを使用するためMeterializeを初期化
        M.AutoInit()
    }

    render(){

        //custumClassはCompornentによってクラスを変更し、
        //表示を少し変えるため。
        const {book,custumClass} = this.props;

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
                                            <p>著者: {book.author}</p>
                                            <p>タグ: {book.tag.join(",")}</p>
                                            <ReactStarsRating   size={15} isEdit={false} value={book.star} />
                                            <p className="grey-text">読了日:{moment(book.createdAt.toDate()).calendar()}</p>
                                            <a href={book.url} rel="noopener noreferrer" target="_blank">商品ページへGo(amazon)</a>
                                            {
                                                this.props.auth.uid===book.user
                                                ?
                                                    <NavLink to={'/editbook/'+book.id} className="green-text right">
                                                        <i className="material-icons">edit</i>
                                                    </NavLink>
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

export default connect(mapStateToProps, null)(BookSummary)
