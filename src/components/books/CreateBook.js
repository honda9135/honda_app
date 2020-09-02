import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { createProject } from '../../store/actions/projectActions'
//import { Redirect } from 'react-router-dom'

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
        this.setState({
            tag:e
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
        //this.props.history.push('/')
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
                    <h5 className="grey-text text-darken-3">読破本の登録</h5>
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
                        <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    </div>
                    <div >
                        <Select isMulti options={options}  placeholder={'タグを選択してください'} onChange={this.handleChangeSelect} />
                        <ReactStarsRating onChange={this.handleChangeStar}  isEdit={true} value={this.state.star} />
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