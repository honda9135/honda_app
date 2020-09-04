import React, { Component } from 'react'
import M from "materialize-css";
import { NavLink } from 'react-router-dom'

export default class Profile extends Component {
    componentDidMount() {
        var elem = document.querySelectorAll('.collapsible');
        var instance = M.Collapsible.init(elem, {
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
                        <div class="collapsible-header"><i class="material-icons">face</i>基本情報</div>
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
                        <div class="collapsible-header"><i class="material-icons">weekend</i>趣味</div>
                        <div class="collapsible-body">
                            <span>準備中</span>
                        </div>
                    </li>
                    <li>
                        <div class="collapsible-header"><i class="material-icons">hourglass_empty</i>経歴</div>
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
                        <div class="collapsible-header"><i class="material-icons">work</i>スキル</div>
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
                                        令和元年の10月の情報処理安全確保支援士の試験を受けたが午後２が5点足りずに不合格                
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