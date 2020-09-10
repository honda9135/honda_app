import React, { Component } from 'react'
//import Notification from './Notification'
import BookList from '../books/BookList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import Loading from '../../config/Loading'

class Dashboard extends Component {
    render() {
        const { books, auth } = this.props;
        
        //もしログインしてなかったら/にリダイレクト
        if (!auth.uid) return <Redirect to='/' />
        if(this.props.profile.isLoaded&&this.props.profile.follow!==undefined&&this.props.profile.follow.length===0) {
            return <Redirect to='/mybookcatalog' />
        }

        return (
            <div className="dashboard container">
                <div className="row">
                <p className='profilename red-text text-accent-1'>
                    最新の読書情報
                </p>
                <hr />
                        {
                            books===undefined||books.length===0
                            ?
                            <Loading />
                            :
                            <BookList books={books} />
                        }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.firestore.ordered.books,
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) =>{
        if(props.profile.isLoaded&&props.profile.follow!==undefined){
            return (
                [{ 
                    collection: 'books',
                    orderBy:['createdAt','desc'],
                    where:['user','in',[...props.profile.follow,props.auth.uid]],
                    limit:6
                }]
            )
        }else{
            return []
        }
})
)(Dashboard);