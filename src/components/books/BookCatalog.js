import React, { Component } from 'react'
import BookDetail from './BookDetail'
import M from "materialize-css";
import { Pagination } from '@material-ui/lab'
import firebase from '../../config/fbConfig'


export default class BookCatalog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1 //Paginationの現在のページ番号
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        //Paginationを使用するためMeterializeを初期化
        M.AutoInit()
    }

    handleSubmit(event, value) {
        this.setState({
            page: value
        })
    }

    render() {

        //booksは変更するためvarで宣言
        var { books } = this.props;
        if (!books || books.length === 0) {
            //bookが一つもない場合テストデータとして以下を出力させる。
            books = [{
                author: "サイト管理人　本田",
                title: '読書を行った本を追加してください。本の登録は右上の+より。',
                content: 'このような感じで表示されます。本の登録は右上の+よりしてください。',
                imgUrl: 'https://firebasestorage.googleapis.com/v0/b/home-90900.appspot.com/o/photo-1562232573-0305012a8818.jpeg?alt=media&token=0995e161-b092-4d6e-9fa1-70ccb4634c20',
                url: 'https://unsplash.com/s/photos/book',
                tag: ['その他'],
                star: 5,
                user: 'tester',
                createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
                init: true
            }]
        }

        //Paginationの処理の記述
        //elementNumは1つのページの要素数
        //allpageは全体のページ数
        const elementNum = 6
        var allpage = 1;
        if (books.length % elementNum === 0) {
            //要素がページにピッタリ割り切れた場合
            allpage = Math.floor(books.length / elementNum)
        } else {
            //要素がページにピッタリ割り切れなかった場合(割り切れないため分のページがあるため+1)
            allpage = Math.floor(books.length / elementNum) + 1
        }

        return (
            <div className="row">
                <div className="book-catalog">
                    {/* 現在のページ番号の要素のBookSummaryを表示させる*/}
                    {books && books.slice(
                        (this.state.page - 1) * elementNum, this.state.page * elementNum
                    ).map(book => {
                        return (
                            <BookDetail custumClass='catalog_summary' book={book} />
                        )
                    })}
                </div>
                {
                    allpage === 1
                        ?
                        null
                        :
                        <Pagination count={allpage} color="secondary" page={this.state.page} onChange={this.handleSubmit} />
                }
            </div>
        )
    }
}