import React, { Component } from 'react'
import BookSummary from './BookSummary'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import M from "materialize-css";
import BookSearch from './BookSearch'

class BookCatalog extends Component {
    componentDidMount() {
        //var elems= document.querySelectorAll('.modal');
        //M.Modal.init(elems, {});
        M.AutoInit()
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
                    <BookSearch />
                    { this.props.tags.length === 0 ? null :<p class='search_condition'> (検索タグ:{this.props.tags.join('or')})</p> }
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
                <ul class="pagination">
                    <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
                    <li class="active"><a href="#!">1</a></li>
                    <li class="waves-effect"><a href="#!">2</a></li>
                    <li class="waves-effect"><a href="#!">3</a></li>
                    <li class="waves-effect"><a href="#!">4</a></li>
                    <li class="waves-effect"><a href="#!">5</a></li>
                    <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state,props) => {
    console.log(state.book.tags,'stateチェック');
    return {
        books: state.firestore.ordered.books,
        tags: state.book.tags,
        auth: state.firebase.auth
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) =>{
        console.log(props.tags,'チェック');
        var firebaseQueries = [];
        if (props.tags.length === 0){
            firebaseQueries = [{
                collection: 'books',
                orderBy:['createdAt','desc'],
                startAt:'4',
                limit:6
            }]
        }else{
            firebaseQueries = [{
                collection: 'books',
                orderBy:['createdAt','desc'],
                where:[
                    ['tag','array-contains-any', props.tags],
                ],
                //where:[['star','in', [5]],['tag','array-contains-any', ['啓発']]],
                //where:['tag','array-contains-any', ['啓発']],
                limit:6
            }]
        }
        return firebaseQueries
    }
    )
)(BookCatalog);
