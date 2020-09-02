import React, { Component } from 'react'
//import Notification from './Notification'
import BookList from '../books/BookList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
//import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
    render() {
        //const { books, auth } = this.props;
        const { books } = this.props;
        console.log(books)

        //もしログインしてなかったらsigninにリダイレクト
        //if (!auth.uid) return <Redirect to='/signin' />

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <BookList books={books} />
                    </div>
                    {/*
                    <div className="col s12 m5 offset-m1">
                        <Notification />
                    </div>
                    */}
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
            orderBy:['createdAt','desc']
         }

    ])
)(Dashboard);