import React from 'react'
import moment from 'moment'
import ReactStarsRating from 'react-awesome-stars-rating';

const BookSummary = ({book}) => {

    return (
        <div class="row">
            <div class="col">
                <div class="card horizontal" >
                    <div class="card-image">
                        <img src={book.imgUrl} alt="アイコン" />
                    </div>
                    <div class='card-stacked'>
                        <div class="card-content">
                            <span class="card-title">{book.title}</span>
                            <p>著者: {book.author}</p>
                            <p>タグ: {book.tag.map(t => t.value).join(",")}</p>
                            <ReactStarsRating   size={15} isEdit={false} value={book.star} />
                            <p className="grey-text">読了日:{moment(book.createdAt.toDate()).calendar()}</p>
                        </div>    
                        <div class="card-action">
                            <a href={book.url}>This is a link</a>
                        </div>
                    </div>
                </div>
            </div>
      </div>

       
    )
}

export default BookSummary;
