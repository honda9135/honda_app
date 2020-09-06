import React from 'react'
import BookSummary from './BookSummary'

const BookList = ({books}) => {
    console.log(books)
    return (
        <div className="book-list section">
            { books && books.map((book,index) => {
                return (
                        <BookSummary key={index} custumClass='' book={book} />
                )
            })}
        </div>
    )
}

export default BookList;