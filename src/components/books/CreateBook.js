import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { createProject } from '../../store/actions/projectActions'

//book特有
import Select from 'react-select'
import ReactStarsRating from 'react-awesome-stars-rating';
import { createBook } from '../../store/actions/bookActions'

class CreateBook extends Component {
    state = {
        title: '',
        author:'',
        url:'',
        imgUrl:'',
        tag:[],
        content:'',
        star:0
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
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="red-text text-accent-1">読破本の登録</h5>
                    <div className="input-field">
                        <label htmlFor="title">本の名前</label>
                        <input type="text" id="title" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="author">著者</label>
                        <input type="text" id="author" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="url">商品のURL</label>
                        <input type="url" id="url" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="imgUrl">イメージのURL</label>
                        <input type="url" id="imgUrl" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="content">感想・コメント</label>
                        <textarea id="content" class="materialize-textarea"  onChange={this.handleChange}></textarea>
                    </div>
                    <div>
                        <Select isMulti className='tagarea'  options={options}  placeholder={'タグを選択してください'} onChange={this.handleChangeSelect} />
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