import React, { Component } from 'react'
import Select from 'react-select'
//import ReactStarsRating from 'react-awesome-stars-rating';
import { connect } from 'react-redux'
import { searchBook } from '../../store/actions/bookActions'

class BookSearch extends Component {
    state = {
        tag:[],
        star:0
    }
    handleChangeSelect = (e) =>{
        const newtag = [];
        if(e){
            for (let i =0;i < e.length; i++){
                newtag.push(e[i].value);
            }
            this.setState({
                tag:newtag
            })
        }else{
            //eがnullの時の処理
            this.setState({
                tag:newtag
            })
        }
    }

    handleChangeStar = (e) =>{
        this.setState({
            star:e
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        console.log(e)
        this.props.searchBook(this.state.tag)
    }

    render(){
        const options = [
            {value: 'その他', label: 'その他'},
            { value: '技術', label: '技術' },
            { value: '啓発', label: '啓発' },
            { value: '経済', label: '経済' },
            { value: '哲学', label: '哲学' },
            { value: '宗教', label: '宗教' }
        ]
        return (
            <div id="modal1" class="modal bottom-sheet">
                <form onSubmit={console.log(this.state.tag)} className="white searh-form">
                <div class="modal-content">
                            <Select isMulti  maxMenuHeight={150} className='tagarea_search'  options={options}  placeholder={'タグを選択してください'} onChange={this.handleChangeSelect} />
                            <br />
                            <br />
                            <br />
                            <br />
                </div>
                <div class="modal-footer white">
                <p class='orange-text search-text'>
                ※
                <a href="https://cloud.google.com/firestore/docs/query-data/queries?hl=ja" rel="noopener noreferrer" target="_blank">
                firebaseの仕様上    
                </a>
                検索結果は10件までしか表示できません(Update予定)
                </p>
                <a href="#!" onClick= {this.handleSubmit} class="modal-close waves-effect waves-green btn-flat orange">検索</a>
                </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchBook: (tags) => dispatch(searchBook(tags))
    }
}

export default connect(null, mapDispatchToProps)(BookSearch)
