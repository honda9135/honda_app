import React,{Component} from 'react'
import moment from 'moment'
import ReactStarsRating from 'react-awesome-stars-rating';
import M from "materialize-css";

export default class BookSummary extends Component {
    componentDidMount() {
        M.AutoInit()
      }
    render(){
        const {book,custumClass} = this.props;
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
                                    <span className="card-title">{book.title}</span>
                                    <p>著者: {book.author}</p>
                                    <p>タグ: {book.tag.join(",")}</p>
                                    <ReactStarsRating   size={15} isEdit={false} value={book.star} />
                                    <p className="grey-text">読了日:{moment(book.createdAt.toDate()).calendar()}</p>
                                    <a href={book.url} rel="noopener noreferrer" target="_blank"　>商品ページへGo(amazon)</a>
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

//export default BookSummary;
