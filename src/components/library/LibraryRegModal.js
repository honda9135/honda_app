import React, { Component } from 'react';

import M from "materialize-css";

export default class LibraryRegModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            systemId: '',        //図書館コード
            area: '',         //件名

        }
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
    }

    componentDidMount() {
        M.AutoInit()
    }
    handleChangeSelect = (e) => {

        //タグの変化を保存する
        this.setState({
            area: e.target.value
        })
    }
    handleLibSearch = (e) => {
        e.preventDefault()

        const libSearchUrl = 'https://api.calil.jp/library?appkey=beb8cae3fc718d98f48917a6928a8373&pref=' + this.state.area;

        //openDbに本の情報を問い合わせる。
        //とってきた情報をstateに保存
        fetch(libSearchUrl, { headers: { origin: 'home-90900.web.app' } })
            .then(response => response.json())
            .then((data) => {

            }).catch((err) => {

            });
    }
    render() {
        return (
            <div id="modal5" class="modal">
                <div class="modal-content row">
                    <h4>図書館の登録</h4>
                    <form onSubmit={this.handleLibSearch} className="white createBookForm">
                        <select onChange={this.handleChangeSelect}>
                            <option value="" selected>都道府県</option>
                            <option value="北海道">北海道</option>
                            <option value="青森県">青森県</option>
                            <option value="岩手県">岩手県</option>
                            <option value="宮城県">宮城県</option>
                            <option value="秋田県">秋田県</option>
                            <option value="山形県">山形県</option>
                            <option value="福島県">福島県</option>
                            <option value="茨城県">茨城県</option>
                            <option value="栃木県">栃木県</option>
                            <option value="群馬県">群馬県</option>
                            <option value="埼玉県">埼玉県</option>
                            <option value="千葉県">千葉県</option>
                            <option value="東京都">東京都</option>
                            <option value="神奈川県">神奈川県</option>
                            <option value="新潟県">新潟県</option>
                            <option value="富山県">富山県</option>
                            <option value="石川県">石川県</option>
                            <option value="福井県">福井県</option>
                            <option value="山梨県">山梨県</option>
                            <option value="長野県">長野県</option>
                            <option value="岐阜県">岐阜県</option>
                            <option value="静岡県">静岡県</option>
                            <option value="愛知県">愛知県</option>
                            <option value="三重県">三重県</option>
                            <option value="滋賀県">滋賀県</option>
                            <option value="京都府">京都府</option>
                            <option value="大阪府">大阪府</option>
                            <option value="兵庫県">兵庫県</option>
                            <option value="奈良県">奈良県</option>
                            <option value="和歌山県">和歌山県</option>
                            <option value="鳥取県">鳥取県</option>
                            <option value="島根県">島根県</option>
                            <option value="岡山県">岡山県</option>
                            <option value="広島県">広島県</option>
                            <option value="山口県">山口県</option>
                            <option value="徳島県">徳島県</option>
                            <option value="香川県">香川県</option>
                            <option value="愛媛県">愛媛県</option>
                            <option value="高知県">高知県</option>
                            <option value="福岡県">福岡県</option>
                            <option value="佐賀県">佐賀県</option>
                            <option value="長崎県">長崎県</option>
                            <option value="熊本県">熊本県</option>
                            <option value="大分県">大分県</option>
                            <option value="宮崎県">宮崎県</option>
                            <option value="鹿児島県">鹿児島県</option>
                            <option value="沖縄県">沖縄県</option>
                        </select>
                        <button className="btn pink right lighten-1 z-depth-0">検索</button>
                    </form>
                </div>
                <div class="modal-footer">
                    <a href='https://calil.jp/doc/api.html' rel="noopener noreferrer" target="_blank">カーリルAPI</a>
                    を使用して図書館の登録を実装予定。(CORSの問題で未実装)
                    <button href="#!" class="modal-close btn   pink right lighten-1 z-depth-0">Agree</button>
                </div>
            </div>
        )
    }
}
