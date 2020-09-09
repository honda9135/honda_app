import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import ReactStarsRating from 'react-awesome-stars-rating';
import firebase from '../../config/fbConfig'
import { editBook,deleBook } from '../../store/actions/bookActions'
import { Redirect } from 'react-router-dom';

class EditBook extends Component {
    constructor(props){
        super(props)
        this.state = {
            isbn: '',
            title:  '',         //本のタイトル
            author: '',         //本の著者
            url:    '',         //本のURL
            imgUrl: '',         //本の画像のURL
            tag:    [],         //関連するタグ
            content:'',         //本の感想
            star:   0 ,         //本の評価
            errtext:'',         //エラー文
            id:props.match.params.id, //本のid
            user:''   ,         //user情報
            createdAt:null      //時間の情報
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
        this.handleChangeStar = this.handleChangeStar.bind(this)
        this.handleEditSubmit = this.handleEditSubmit.bind(this)
        this.handleDeleSubmit = this.handleDeleSubmit.bind(this)
    }
    
    componentDidMount(){
        var db = firebase.firestore()
        db.collection('books').doc(this.state.id).get().then(
            snapshot => {
                var data = snapshot.data()
                console.log(data)
                if(data){
                    this.setState({...data})
                }
            }
        ).catch((err) =>{
            console.log('検索エラー')
            this.setState({
                errtext:'本を検索できませんでした'
            })
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleChangeSelect = (e) =>{
        //タグの変化を保存する
        const newtag = [];
        for (let i =0;i < e.length; i++){
            newtag.push(e[i].value);
        }
        this.setState({
            tag:newtag
        })
    }

    handleChangeStar = (e) =>{
        //評価の保存
        this.setState({
            star:e
        })
    }

    handleEditSubmit = (e) => {
        e.preventDefault()
        const bookInfo =  {
            title:  this.state.title,       //本のタイトル
            author: this.state.author,      //本の著者
            url:    this.state.url,         //本のURL
            imgUrl: this.state.imgUrl,      //本の画像のURL
            tag:    this.state.tag,         //関連するタグ
            content:this.state.content,     //本の感想
            star:   this.state.star ,       //本の評価
            user:   this.state.user ,       //user情報
            isbn:   this.state.isbn ,       //isbn情報
            id :    this.state.id   ,       //本のID
            createdAt:this.state.createdAt
        }
        this.props.editBook(bookInfo)
        this.props.history.push('/')
    }
    
    handleDeleSubmit = (e) => {
        e.preventDefault()
        this.props.deleBook(this.state.id)
        this.props.history.push('/')
    }

    isbn13ToIsbn10(isbn13) {
        //ISBN13からISBN10へ変換を行う。
        //amazonはISBN10でしか検索できないから
        if (isbn13.length !==　13){ 
            //入力されたものがISBN13ではない場合はそのまま返す。
            return isbn13;
        }else{
            //入力されたものがISBN13の場合
            //以下計算式
            var lastNum = 11-(
                isbn13.charAt(3)*10 +
                isbn13.charAt(4)*9  +
                isbn13.charAt(5)*8  +
                isbn13.charAt(6)*7  +
                isbn13.charAt(7)*6  +
                isbn13.charAt(8)*5  +
                isbn13.charAt(9)*4  +
                isbn13.charAt(10)*3 +
                isbn13.charAt(11)*2 
                )%11;
        if (lastNum === 11){
            lastNum = 0;
        }else if(lastNum === 10){
            lastNum = 'X'
        }
        return (isbn13.slice(0,12) + lastNum.toString()).slice(3);   
        }
    }

    handleSubmitIsbn = (e) =>{
        e.preventDefault()
        
        //入力されたISBNを整形する。
        //想定('-'が入っていたり、大文字や小文字の'ISBN'が入っていたり)
        const encodeIsbn = this.state.isbn.trim().toLowerCase().replace('isbn','').split('-').join('')

        //openDbUrlに問い合わせを行うURLを作成
        const openDbUrl = 'https://api.openbd.jp/v1/get?isbn='+encodeIsbn;

        //amazon商品ページ用のISBN10を作成
        const isbn10 = this.isbn13ToIsbn10(encodeIsbn);

        //openDbに本の情報を問い合わせる。
        //とってきた情報をstateに保存
        fetch(openDbUrl)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    title : data[0]['summary']['title'],
                    author:data[0]['summary']['author'],
                    url:'https://www.amazon.co.jp/dp/'+isbn10,
                    imgUrl:data[0]['summary']['cover'],
                    errtext:''
                })
        }).catch((err) => {
            this.setState({
                errtext:'ISBNの入力を見直してください。'
            })
        });
    }

    render() {
        console.log(this.state)
        const { auth } = this.props;
        //ログインしているかチェック
        if (!auth.uid) return <Redirect to='/signin' />
        
        //tagの準備
        const options = [
            { value: '小説', label: '小説'},
            { value: '技術', label: '技術' },
            { value: '啓発', label: '啓発' },
            { value: '経済', label: '経済' },
            { value: '哲学', label: '哲学' },
            { value: '宗教', label: '宗教' },
            {value: '政治', label: '政治'},
            {value: '社会', label: '社会'},
            {value: 'その他', label: 'その他'}
          ]

        return (
            <div className="container">

                {/*ISBN検索用のフォーム */}
                <form onSubmit={this.handleSubmitIsbn} className="white createBookForm">
                    <h5 className="red-text text-accent-1"><a href='https://blog.qbist.co.jp/?p=3071' rel="noopener noreferrer" target="_blank">ISBN</a>での検索</h5>
                    <div className="input-field">
                        <label htmlFor="isbn">ISBNの入力(例978-4-87311-565-8)</label>
                        <input type="text" id="isbn"  value={this.state.isbn} onChange={this.handleChange} />
                        <div className="red-text center">
                            {/*ISBNのエラーを表示 */}
                            { this.state.errtext ? <p>{this.state.errtext}</p> : null }
                        </div>
                    </div>
                    <div className="input-field">
                        {/*ISBNの検索ボタン*/}
                        <button className="btn pink lighten-1 z-depth-0">検索</button>
                    </div>
                </form>

                {/*本の情報登録用のフォーム */}
                <form onSubmit={this.handleEditSubmit} className="white createBookForm">
                    <h5 className="red-text text-accent-1">読書本の修正</h5>
                    <div className="input-field">
                        <label htmlFor="title">本の名前</label>
                        <input type="text" id="title" value={this.state.title} onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="author">著者</label>
                        <input type="text" id="author" value={this.state.author} onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="url">商品のURL</label>
                        <input type="url" id="url" value={this.state.url} onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="imgUrl">イメージのURL</label>
                        <input type="url" id="imgUrl" value={this.state.imgUrl} onChange={this.handleChange} />
                    </div>
                    <h5 className="red-text text-accent-1">本の評価</h5>
                    <div className="input-field">
                        <label htmlFor="content">感想・コメント</label>
                        <textarea id="content" className="materialize-textarea"  value={this.state.content} onChange={this.handleChange}></textarea>
                    </div>
                    <div>
                        <Select isMulti className='tagarea_create'  options={options}  placeholder={'タグを選択してください'} onChange={this.handleChangeSelect} />
                        <div className='star'>
                        <p className='startext red-text text-accent-1'>評価</p>
                        <ReactStarsRating  onChange={this.handleChangeStar}  isEdit={true} value={this.state.star} />
                        </div>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">修正</button>
                        <a href='#!' onClick={this.handleDeleSubmit} className="btn red white-text z-depth-0 right delbook">本の削除 <i className="material-icons">delete</i></a>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editBook: (book) => dispatch(editBook(book)),
        deleBook: (id) => dispatch(deleBook(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditBook)