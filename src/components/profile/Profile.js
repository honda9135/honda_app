import React, { Component } from 'react'
import M from "materialize-css";
import { NavLink } from 'react-router-dom'

export default class Profile extends Component {
    componentDidMount() {
        var elem = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elem, {
            accordion:false
        });
      }
    render() {
        return(
            <div class='container'>
                <p class='profilename red-text text-accent-1'>自己紹介</p>
                <hr />
                <ul class="collapsible">
                    <li>
                        <div class="collapsible-header blue lighten-4"><i class="material-icons">face</i>基本情報</div>
                        <div class="collapsible-body">
                        <table border="1" rules="cols">
                                <tr>
                                    <td>出身地</td>
                                    <td>宮崎県新富町</td>
                                </tr>
                                <tr>
                                    <td>生年月日(年齢)</td>
                                    <td>1994年6月29日(26歳)</td>
                                </tr>
                                <tr>
                                    <td>血液型・星座</td>
                                    <td>O型・蟹座</td>
                                </tr>
                            </table>
                        </div>
                    </li>
                    <li>
                        <div class="collapsible-header blue lighten-4"><i class="material-icons">weekend</i>趣味</div>
                        <div class="collapsible-body">
                            <table border="1" rules="cols">
                                <tr>
                                    <td>読書</td>
                                    <td>
                                        週に1冊以上は読書している気がする。<br />
                                        ジャンルは問わず様々な本を読む(小説はあまり読まないが、、)。<br />
                                        住むなら図書館に近い所がいいな。<br />
                                        読んだ本を記録する
                                        <NavLink to='/bookCatalog'>
                                        webアプリ
                                        </NavLink>
                                        を作成したので、参考にしてほしい。
                                    </td>
                                </tr>
                                <tr>
                                    <td>便利家電</td>
                                    <td>
                                        家電オタクで便利な家電を集めるのが好き<br />
                                        ルンバ・ドラム式洗濯乾燥機など<br />
                                    </td>
                                </tr>
                                <tr>
                                    <td>ミニマリズム</td>
                                    <td>
                                        必要最低限のもので生きていきたい。<br />
                                        <a href='https://firebasestorage.googleapis.com/v0/b/home-90900.appspot.com/o/myhome.jpg?alt=media&token=1188705c-9ac4-467e-85ea-d4fc845ac048'>Myhome</a>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </li>
                    <li>
                        <div class="collapsible-header blue lighten-4"><i class="material-icons">hourglass_empty</i>経歴</div>
                        <div class="collapsible-body">
                            <table border="1" rules="cols">
                                <tr>
                                    <th>年月</th>
                                    <th>学歴・職歴</th>
                                </tr>
                                <tr>
                                    <td>平成25年3月</td>
                                    <td>宮崎県立妻高等学校　普通科　卒業</td>
                                </tr>
                                <tr>
                                    <td>平成25年4月</td>
                                    <td>宮崎大学　工学部　電子物理工学科　入学</td>
                                </tr>
                                <tr>
                                    <td>平成29年3月</td>
                                    <td>宮崎大学　工学部　電子物理工学科　卒業</td>
                                </tr>
                                <tr>
                                    <td>平成29年4月</td>
                                    <td>宮崎大学　工学研究科　工学専攻　エネルギー系コース　入学</td>
                                </tr>
                                <tr>
                                    <td>平成31年3月</td>
                                    <td>宮崎大学　工学研究科　工学専攻　エネルギー系コース　卒業</td>
                                </tr>
                                <tr>
                                    <td>平成31年4月</td>
                                    <td>株式会社富士通九州システムズ　就職</td>
                                </tr>
                                <tr>
                                    <td>令和2年7月</td>
                                    <td>株式会社富士通九州システムズ　退職</td>
                                </tr>
                            </table>
                        </div>
                    </li>
                    <li>
                        <div class="collapsible-header blue lighten-4"><i class="material-icons">work</i>スキル</div>
                        <div class="collapsible-body">
                        <table border="1" rules="cols">
                                <tr>
                                    <th>スキル</th>
                                    <th>歴・コメント</th>
                                </tr>
                                <tr>
                                    <td>python</td>
                                    <td>
                                        大学院の2年間研究で使用。主にデータ解析などを行う。<br />
                                        jupyterlab・pandas・matplotlibなど(データ解析全般使用できる)<br />
                                        Djangoも独学で勉強経験あり、基本的概念は抑えている程度。
                                    </td>
                                </tr>
                                <tr>
                                    <td>Linux</td>
                                    <td>
                                        大学の3年間Ubuntuを使用及びメンテナンスを行っていた。<br />
                                        OSのインストールからCUI操作の基本まで行うことができる。<br />
                                    </td>
                                </tr>
                                <tr>
                                    <td>サイバーセキュリティ<br />(バックエンド)</td>
                                    <td>
                                        約1年間の間、前回会社でサイバーセキュリティの業務に従事した(詳細は<NavLink to='/profile'>こちら</NavLink>)。<br />
                                        令和元年10月の情報処理安全確保支援士の試験を受けたが午後２が5点足りずに不合格                
                                    </td>
                                </tr>
                                <tr>
                                    <td>React.js</td>
                                    <td>
                                        2ヶ月間独学で勉強。<br />
                                        このサイトもReactとfirebaseを使用してSPAで作成した。<br />
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}