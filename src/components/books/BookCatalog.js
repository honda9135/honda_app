import React, { Component } from 'react'
import BookSummary from './BookSummary'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

class BookCatalog extends Component {
    render() {
        const { books, auth } = this.props;
        console.log(books)

        //もしログインしてなかったらsigninにリダイレクト
        if (!auth.uid) return <Redirect to='/signin' />

        return (
            <div className="bookCatalog container">
                <div className="row">
                    <div className="book-catalog">
                        { books && books.map(book => {
                            return (
                                <Link to={'/'}>
                                    <BookSummary book={book} />
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        books: state.firestore.ordered.books,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { 
            collection: 'books',
            orderBy:['createdAt','desc'],
            limit:6
         }
    ])
)(BookCatalog);