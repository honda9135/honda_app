import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { createProject } from '../../store/actions/projectActions'

//book特有
import Select from 'react-select'
import ReactStarsRating from 'react-awesome-stars-rating';
import { createBook } from '../../store/actions/bookActions'

class CreateBook extends Component {
    state = {
        isbn:'',
        title: '',
        author:'',
        url:'',
        imgUrl:'',
        tag:[],
        content:'',
        star:0,
        errtext:''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleChangeSelect = (e) =>{
        const newtag = [];
        for (let i =0;i < e.length; i++){
            newtag.push(e[i].value);
        }
        this.setState({
            tag:newtag
        })
        console.log(e)
    }

    handleChangeStar = (e) =>{
        this.setState({
            star:e
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        console.log(e)
        this.props.createBook(this.state)
        this.props.history.push('/bookcatalog')
    }
    isbn13ToIsbn10(isbn13) {
        console.log(isbn13.length)
        if (isbn13.length ===　13){ 
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
            }
            return (isbn13.slice(0,12) + lastNum.toString()).slice(3);   
        }else{
            return isbn13;
        }
    }

    handleSubmitIsbn = (e) =>{
        e.preventDefault()
        console.log(this.state.isbn)
        const encodeIsbn = this.state.isbn.trim().toLowerCase().replace('isbn','').split('-').join('')
        console.log(encodeIsbn,'encode')
        const openDbUrl = 'https://api.openbd.jp/v1/get?isbn='+encodeIsbn;
        const isbn10 = this.isbn13ToIsbn10(encodeIsbn);
        fetch(openDbUrl)
            .then(response => response.json())
            .then((data) => {
                console.log(data[0])
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
        //const { auth } = this.props;
        //if (!auth.uid) return <Redirect to='/signin' />
        const options = [
            {value: 'その他', label: 'その他'},
            { value: '技術', label: '技術' },
            { value: '啓発', label: '啓発' },
            { value: '経済', label: '経済' },
            { value: '哲学', label: '哲学' },
            { value: '宗教', label: '宗教' }
          ]
        return (
            <div className="container">
                <form onSubmit={this.handleSubmitIsbn} className="white createBookForm">
                    <h5 className="red-text text-accent-1"><a href='https://blog.qbist.co.jp/?p=3071' rel="noopener noreferrer" target="_blank">ISBN</a>での検索</h5>
                    <div className="input-field">
                    <label htmlFor="isbn">ISBNの入力(例978-4-87311-565-8)</label>
                        <input type="text" id="isbn"  onChange={this.handleChange} />
                        <div className="red-text center">
                            { this.state.errtext ? <p>{this.state.errtext}</p> : null }
                        </div>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">検索</button>
                    </div>
                </form>
                <form onSubmit={this.handleSubmit} className="white createBookForm">
                <h5 className="red-text text-accent-1">読書本の手動登録</h5>
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
                        <button className="btn pink lighten-1 z-depth-0">登録</button>
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
        createBook: (book) => dispatch(createBook(book))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBook)