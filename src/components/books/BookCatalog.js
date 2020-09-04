import React, { Component } from 'react'
import BookSummary from './BookSummary'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import M from "materialize-css";

class BookCatalog extends Component {
    componentDidMount() {
        var elems= document.querySelectorAll('.modal');
        M.Modal.init(elems, {});
    }
    render() {
        const { books, auth } = this.props;
        console.log(books)

        //もしログインしてなかったらsigninにリダイレクト
        if (!auth.uid) return <Redirect to='/signin' />

        return (
            <div className="bookCatalog container">
                <p class='profilename red-text text-accent-1'>
                    読書した本の一覧
                    <NavLink to='/bookcreate' className="green-text right"><i class="material-icons">add</i></NavLink>
                    <a class="waves-effect waves-light modal-trigger green-text right" href="#modal1"><i class="material-icons">search</i></a>
                    <div id="modal1" class="modal">
                        <div class="modal-content">
                        <h4>Modal Header</h4>
                        <p>A bunch of text</p>
                        </div>
                        <div class="modal-footer">
                        <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
                        </div>
                     </div>
                </p>
                <hr />
                <div className="row">
                    <div className="book-catalog">
                        { books && books.map(book => {
                            return (
                                    <BookSummary book={book} />
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
            //where: ['tag', 'array-contains', '技術'],
            orderBy:['createdAt','desc'],
            limit:6
         }
    ])
)(BookCatalog);
