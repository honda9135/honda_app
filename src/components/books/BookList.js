import React from 'react'
import BookSummary from './BookSummary'

const BookList = ({books}) => {
    return (
        <div className="book-list section">
            { books && books.map((book,index) => {
                return (
                        <BookSummary key={index} custumClass='catalog_summary' book={book} />
                )
            })}
        </div>
    )
}

export default BookList;