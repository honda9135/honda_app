import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect} from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { searchBook } from '../../store/actions/bookActions'
import BookCatalog from '../books/BookCatalog'
import { NavLink } from 'react-router-dom'
import BookSearch from '../books/BookSearch'
import Loading from '../../config/Loading'


class MyPage extends Component {
    
    componentDidMount(){
        //検索の初期化
        this.props.searchBook([])
    }
    render() {
        const { auth } = this.props;
        //もしログインしてなかったらsigninにリダイレクト
        if (!auth.uid) return <Redirect to='/signin' />


        var add_button = ''
        if(this.props.books===undefined){
            add_button = ''
        }else if(this.props.books.length===0){
            add_button = (
                <NavLink to='/bookcreate' className="green-text right btn-floating pulse">
                    <i className="material-icons">add</i>
                </NavLink>
            )
        }else{
            add_button = (
                <NavLink to='/bookcreate' className="green-text right">
                    <i className="material-icons">add</i>
                </NavLink>
            )
        }

        return(
            <div className="bookCatalog container">
                <p className='profilename red-text text-accent-1'>
                    私の読書本一覧
                    {add_button}
                    <a className="waves-effect waves-light modal-trigger green-text right"　title='タグで検索する' href="#modal1"><i className="material-icons">search</i></a>
                    <BookSearch />

                    {/* 検索の内容を表示させる*/}
                    { this.props.tags.length === 0 ? null :<p className='search_condition'> (検索タグ:{this.props.tags.join('or')})</p> }
                </p>
                <hr />
                {
                    this.props.books===undefined
                ?
                    <Loading />
                :
                    <BookCatalog
                        books={this.props.books} 
                    />
                }
            </div>
        )
    }
}

const mapStateToProps = (state,props) => {
    return {
        books: state.firestore.ordered.books,
        tags: state.book.tags,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchBook: (tags) => dispatch(searchBook(tags))
    }
}


export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect((props) =>{
        
        //firestoreに要求するqueryを作成する
        var firebaseQueries = [];

        if(!props.auth.uid){
            firebaseQueries = []
        }else if (props.tags.length === 0){
            //条件なしの時
            firebaseQueries = [{
                collection: 'books',
                orderBy:['createdAt','desc'],
                where:[
                ['user','==',props.auth.uid]
                ]
            }]
        }else{
            //条件ありの時
            firebaseQueries = [{
                collection: 'books',
                orderBy:['createdAt','desc'],
                where:[
                    ['user','==',props.auth.uid],
                    ['tag','array-contains-any', props.tags],
                ],
            }]
        }

        return firebaseQueries
    }
    )
)(MyPage);
