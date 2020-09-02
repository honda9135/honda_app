import React from 'react'
import moment from 'moment'
import ReactStarsRating from 'react-awesome-stars-rating';

const BookSummary = ({book}) => {

    return (
        <div className="card z-depth-0 project-summary ">
            <div className="card-content grey-text text-darken-3 row">
                <img src={book.imgUrl}   width='20%' height='20%' alt="アイコン" align='right' style={{display :"block"}}/>
                <span className="card-title" >{book.title.split('\\n').map(str => {
                    console.log({str})
                    return(<p>{str}</p>)
                })}</span>
                <p>著者: {book.author}</p>
                <p>タグ: {book.tag.map(t => t.value).join(",")}</p>
                <ReactStarsRating   size={15} isEdit={false} value={book.star} />
                <p className="grey-text">読了日:{moment(book.createdAt.toDate()).calendar()}</p>
            </div>
        </div>
    )
}

export default BookSummary;
