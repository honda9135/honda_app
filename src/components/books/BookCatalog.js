import React, { Component } from 'react'
import BookSummary from './BookSummary'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import M from "materialize-css";
import BookSearch from './BookSearch'
import { Pagination } from '@material-ui/lab'


class BookCatalog extends Component {
    constructor(props){
        super(props);
        this.state ={
            page:1
        }
    }
    componentDidMount() {
        //var elems= document.querySelectorAll('.modal');
        //M.Modal.init(elems, {});
        M.AutoInit()
    }
    handleSubmit = (event, value) => {
        console.log(value)
        this.setState({
            page:value
        })
    }

    render() {
        const { books, auth } = this.props;
        const elementNum = 6
        
        var allpage = 1;
        if(books.length%elementNum ===0){
            //要素がページにピッタリ割り切れた場合
            allpage = Math.floor(books.length/elementNum)   
        }else{
            //要素がページにピッタリ割り切れなかった場合
            allpage = Math.floor(books.length/elementNum) + 1
        }
        console.log(allpage,'allpage');

        let  pagenationJsx = [];
        if (allpage > 0){
            //'<'の処理
            if (this.state.page===1){
                pagenationJsx.push(
                    <li class="disabled">
                        <a href="#!" >
                            <i class="material-icons" >chevron_left</i>
                        </a>
                    </li>)
            }else{
                pagenationJsx.push(
                    <li class="waves-effect">
                        <a href="#!" onClick={this.handleSubmit} value={-1}>
                            <i class="material-icons" >chevron_left</i>
                        </a>
                    </li>)
            }

            //page番号の処理
            for (let i = 1;i<=allpage;i++){
                if (i===this.state.page){
                    pagenationJsx.push(
                    <li class="active">
                        <a href="#!" >
                            {i}
                        </a>
                    </li>)
                }else{
                    pagenationJsx.push(
                        <li class="waves-effect">
                            <a href="#!" onClick={this.handleSubmit} value={i}>
                                {i}
                            </a>
                            {/*
                            <input type='submit' id='pageNum' value={i}>{i}</input>
                            */}
                            
                        </li>)
                }
            }
            
            //'>'の処理
            if (this.state.page===allpage){
                pagenationJsx.push(
                    <li class="disabled">
                        <a href="#!" >
                            <i class="material-icons">chevron_right</i>
                        </a>
                    </li>)
            }else{
                pagenationJsx.push(
                    <li class="waves-effect">
                        <a href="#!" onClick={this.handleSubmit} >
                            <i class="material-icons">chevron_right</i>
                        </a>
                    </li>)
            }
        }
        //もしログインしてなかったらsigninにリダイレクト
        if (!auth.uid) return <Redirect to='/signin' />

        console.log(this.state.page,'test')
        
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
                        { books && books.slice(
                            (this.state.page-1)*elementNum,this.state.page*elementNum
                            ).map(book => {
                            return (
                                    <BookSummary custumClass='catalog_summary' book={book} />
                            )
                        })}
                    </div>
                </div>
                {/* 
                <form onSubmit={this.handleSubmit}>
                    <ul class="pagination">
                        {pagenationJsx}
                    </ul>
                </form>
                */}
                <Pagination count={allpage} color="secondary" page={this.state.page} onChange={this.handleSubmit} />
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
            }]
        }
        return firebaseQueries
    }
    )
)(BookCatalog);
