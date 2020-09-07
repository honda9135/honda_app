import React, { Component } from 'react'
import BookSummary from './BookSummary'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
// import { NavLink } from 'react-router-dom'
import M from "materialize-css";
import BookSearch from './BookSearch'
import { Pagination } from '@material-ui/lab'
import firebase from '../../config/fbConfig'


class FollowBookCatalog extends Component {
    
    constructor(props){
        super(props);
        this.state ={
            page:1 //Paginationの現在のページ番号
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        //Paginationを使用するためMeterializeを初期化
        M.AutoInit()
    }

    handleSubmit(event, value){
        this.setState({
            page:value
        })
    }

    render() {
        const { auth , follower } = this.props;
        console.log(auth.uid,'auth')
        console.log(follower.uid,'follower')
        //もしログインしてなかったらsigninにリダイレクト
        if (!auth.uid) return <Redirect to='/signin' />
        console.log(auth.uid,'uid')

        //booksは変更するためvarで宣言
        var { books } = this.props;
        if (!books || books.length ===0){
            //bookが一つもない場合テストデータとして以下を出力させる。
            books = [{
                author: "サイト管理人　本田",
                title:'読書を行った本を追加してください。本の登録は右上の+より。',
                content: 'このような感じで表示されます。本の登録は右上の+よりしてください。',
                imgUrl:'https://firebasestorage.googleapis.com/v0/b/home-90900.appspot.com/o/photo-1562232573-0305012a8818.jpeg?alt=media&token=0995e161-b092-4d6e-9fa1-70ccb4634c20',
                url:'https://unsplash.com/s/photos/book',
                tag:['その他'],
                star:5,
                createdAt: firebase.firestore.Timestamp.fromDate(new Date())
            }]
        }

        //Paginationの処理の記述
        //elementNumは1つのページの要素数
        //allpageは全体のページ数
        const elementNum = 6
        var allpage = 1;
        if(books.length%elementNum ===0){
            //要素がページにピッタリ割り切れた場合
            allpage = Math.floor(books.length/elementNum)   
        }else{
            //要素がページにピッタリ割り切れなかった場合(割り切れないため分のページがあるため+1)
            allpage = Math.floor(books.length/elementNum) + 1
        }

        return (
            <div className="bookCatalog container">
                <p className='profilename red-text text-accent-1'>
                    {follower.firstName}・{follower.lastName}の読書本一覧
                    {/* <NavLink to='/bookcreate' className="green-text right"><i className="material-icons">add</i></NavLink> */}
                    <a className="waves-effect waves-light modal-trigger green-text right" href="#modal1"><i className="material-icons">search</i></a>
                    <BookSearch />

                    {/* 検索の内容を表示させる*/}
                    { this.props.tags.length === 0 ? null :<p className='search_condition'> (検索タグ:{this.props.tags.join('or')})</p> }

                </p>
                <hr />
                <div className="row">
                    <div className="book-catalog">

                        {/* 現在のページ番号の要素のBookSummaryを表示させる*/}
                        { books && books.slice(
                            (this.state.page-1)*elementNum,this.state.page*elementNum
                            ).map(book => {
                            return (
                                    <BookSummary custumClass='catalog_summary' book={book} />
                            )
                        })}

                    </div>
                </div>
                
                <Pagination count={allpage} color="secondary" page={this.state.page} onChange={this.handleSubmit} />

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


export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) =>{
        
        //firestoreに要求するqueryを作成する
        var firebaseQueries = [];

        if (props.tags.length === 0){
            //条件なしの時
            firebaseQueries = [{
                collection: 'books',
                orderBy:['createdAt','desc'],
                where:[
                ['user','==',props.follower.uid]
                ]
            }]
        }else{
            //条件ありの時
            firebaseQueries = [{
                collection: 'books',
                orderBy:['createdAt','desc'],
                where:[
                    ['user','==',props.follower.uid],
                    ['tag','array-contains-any', props.tags],
                ],
            }]
        }

        return firebaseQueries
    }
    )
)(FollowBookCatalog);
