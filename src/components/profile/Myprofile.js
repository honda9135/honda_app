import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Myprofile extends Component {
    render() {
        return(
            <ul className="collection with-header myprofile">
                <li className="collection-header">
                    <div className="card horizontal myprofile-card">
                        <div className="card-image">
                            <img className='myimg'  src="https://firebasestorage.googleapis.com/v0/b/home-90900.appspot.com/o/image.png?alt=media&token=3889fe4c-d29d-44b5-bbc0-744a750715d3" alt="宇宙服" />
                        </div>
                        <div className="card-stacked">
                            <p className='myimg-Name'><i className="material-icons">person</i>本田大悟</p>
                            <p>
                                <i className="material-icons">email</i>
                                honda91350629@gmail.com
                                <br />
                                <br />
                                <i className="material-icons">local_phone</i>
                                070-8300-6062
                            </p>
                        </div>
                    </div>
                </li>
                <li className="collection-item">
                    <div>
                        自己紹介及び技術スキル
                        <NavLink to='/profile' className="secondary-content"><i className="material-icons">send</i></NavLink>
                    </div>
                </li>
                <li className="collection-item">
                    <div>
                        学生時代の研究内容
                        <NavLink to='/' className="secondary-content"><i className="material-icons">send</i></NavLink>
                    </div>
                </li>
                <li className="collection-item">
                    <div>
                        前会社での仕事
                        <NavLink to='/' className="secondary-content"><i className="material-icons">send</i></NavLink>
                    </div>
                </li>

          </ul>
        )
    }
}