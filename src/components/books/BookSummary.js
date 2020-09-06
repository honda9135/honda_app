import React,{Component} from 'react'
import moment from 'moment'
import ReactStarsRating from 'react-awesome-stars-rating';
import M from "materialize-css";

export default class BookSummary extends Component {
    componentDidMount() {
        var elem = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elem, {
            accordion:false
        });
      }
    render(){
        const {book,custumClass} = this.props;
        return (
            <div class="row">
                <div class="col">
                    <ul class="collapsible">
                        <li>
                        <div class="collapsible-header">
                        <div class="card horizontal" >
                            <div class="card-image">
                                <img class='dashbord_img' src={book.imgUrl} alt="アイコン" />
                            </div>
                            <div class='card-stacked'>
                                <div class={"card-content "+custumClass}>
                                    <span class="card-title">{book.title}</span>
                                    <p>著者: {book.author}</p>
                                    <p>タグ: {book.tag.join(",")}</p>
                                    <ReactStarsRating   size={15} isEdit={false} value={book.star} />
                                    <p className="grey-text">読了日:{moment(book.createdAt.toDate()).calendar()}</p>
                                    <a href={book.url} rel="noopener noreferrer" target="_blank"　>商品ページへGo(amazon)</a>
                                </div>    
                            </div>
                        </div>
                        </div>
                        <div class="collapsible-body">
                            <p class='book-content-title'>感想・コメント</p>
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
