import React from 'react'
import BookSummary from './BookSummary'
import { Link } from 'react-router-dom'

const BookList = ({books}) => {
    console.log(books)
    return (
        <div className="book-list section">
            { books && books.map(book => {
                return (
                    <Link to={'/'}>
                        <BookSummary book={book} />
                    </Link>
                )
            })}
        </div>
    )
}

export default BookList;