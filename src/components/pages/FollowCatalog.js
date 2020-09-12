import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
// import { NavLink } from 'react-router-dom'
import { searchBook } from '../../store/actions/bookActions'
import { deleFollow } from '../../store/actions/followActions'
import BookCatalog from '../books/BookCatalog'
import BookSearch from '../books/BookSearch'


class FollowCatalog extends Component {
    
    constructor(props){
        super(props);
        this.handleDeleSubmit = this.handleDeleSubmit.bind(this)
        
        //検索の初期化
        this.props.searchBook([])
    }

    handleDeleSubmit(e){
        e.preventDefault()
        
        this.props.deleFollow(this.props.auth,this.props.profile,this.props.follower.id)
        this.props.history.push('/')
    }
    render() {
        const { auth,follower } = this.props;
        //もしログインしてなかったらsigninにリダイレクト
        if (!auth.uid) return <Redirect to='/signin' />

        return (
            <div className="bookCatalog container">
                <p className='profilename red-text text-accent-1'>
                    {follower.firstName}・{follower.lastName}の読書本一覧
                    {/* <NavLink to='/bookcreate' className="green-text right"><i className="material-icons">add</i></NavLink> */}
                    <a href='#!'  className='right red-text' title='followを外す' onClick={this.handleDeleSubmit}><i className="material-icons">clear</i></a>
                    <a className="waves-effect waves-light modal-trigger green-text right" title='タグで検索する' href="#modal1"><i className="material-icons">search</i></a>
                    <BookSearch />

                    {/* 検索の内容を表示させる*/}
                    { this.props.tags.length === 0 ? null :<p className='search_condition'> (検索タグ:{this.props.tags.join('or')})</p> }

                </p>
                <hr />
                <BookCatalog
                        books={this.props.books} 
                />
            </div>
            )
    }
}

const mapStateToProps = (state,props) => {
    return {
        books: state.firestore.ordered.books,
        users: state.firestore.ordered.users,
        profile: state.firebase.profile,
        tags: state.book.tags,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchBook: (tags) => dispatch(searchBook(tags)),
        deleFollow: (auth,profile,delUid) => dispatch(deleFollow(auth,profile,delUid))
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect((props) =>{
        
        
        //firestoreに要求するqueryを作成する
        var firebaseQueries = []

        if (props.tags.length === 0){
            //条件なしの時
            firebaseQueries = [{
                collection: 'books',
                orderBy:['createdAt','desc'],
                where:[
                ['user','==',props.follower.id]
                ]
            }]
        }else{
            //条件ありの時
            firebaseQueries = [{
                collection: 'books',
                orderBy:['createdAt','desc'],
                where:[
                    ['user','==',props.follower.id],
                    ['tag','array-contains-any', props.tags],
                ],
            }]
        }
        return firebaseQueries
    }
    )
)(FollowCatalog);
