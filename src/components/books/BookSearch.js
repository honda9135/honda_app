import React, { Component } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import { searchBook } from '../../store/actions/bookActions'

class BookSearch extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            tag:[] //検索するタグ  
        }
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
        this.handleChangeStar = this.handleChangeStar.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChangeSelect(e){
        const newtag = [];
        if(e){
            //選択したtagをリストにする
            for (let i =0;i < e.length; i++){
                newtag.push(e[i].value);
            }
            this.setState({
                tag:newtag
            })
        }else{
            //eがnullの時はtagを初期化する。
            this.setState({
                tag:newtag
            })
        }
    }

    handleChangeStar(e){
        //評価の星のhandler
        this.setState({
            star:e
        })
    }

    handleSubmit(e){
        //検索の結果をactionクリエイターに飛ばす。
        e.preventDefault()
        this.props.searchBook(this.state.tag)
    }

    render(){

        //tagの内容(constructorに任せてもいいかも)
        const options = [
            {value: 'その他', label: 'その他'},
            { value: '技術', label: '技術' },
            { value: '啓発', label: '啓発' },
            { value: '経済', label: '経済' },
            { value: '哲学', label: '哲学' },
            { value: '宗教', label: '宗教' },
            {value:'test',label:'test'}
        ]
        
        return (
            <div id="modal1" className="modal">
                <form  className="white searh-form">
                    <div className="modal-content">
                        <Select isMulti  maxMenuHeight={150} className='tagarea_search'  options={options}  placeholder={'タグを選択してください'} onChange={this.handleChangeSelect} />
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                    <div className="modal-footer white">
                        <p className='orange-text search-text'>
                            ※
                            <a href="https://cloud.google.com/firestore/docs/query-data/queries?hl=ja" rel="noopener noreferrer" target="_blank">
                                firebaseの仕様上    
                            </a>
                            検索結果は10件までしか表示できません(Update予定)
                        </p>
                        <a href="#!" onClick= {this.handleSubmit} className="modal-close btn pink lighten-1 z-depth-0">検索</a>
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
