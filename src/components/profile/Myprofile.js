import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Myprofile extends Component {
    render() {
        return(
            <ul class="collection with-header myprofile">
                <li class="collection-header">
                    <div class="card horizontal myprofile-card">
                        <div class="card-image">
                            <img className='myimg'  src="https://firebasestorage.googleapis.com/v0/b/home-90900.appspot.com/o/image.png?alt=media&token=3889fe4c-d29d-44b5-bbc0-744a750715d3" alt="宇宙服" />
                        </div>
                        <div class="card-stacked">
                            <p className='myimg-Name'><i class="material-icons">person</i>本田大悟</p>
                            <p>
                                <i class="material-icons">email</i>
                                honda91350629@gmail.com
                                <br />
                                <br />
                                <i class="material-icons">local_phone</i>
                                070-8300-6062
                            </p>
                        </div>
                    </div>
                </li>
                <li class="collection-item">
                    <div>
                        自己紹介及び技術スキル
                        <NavLink to='/profile' className="secondary-content"><i class="material-icons">send</i></NavLink>
                    </div>
                </li>
                <li class="collection-item">
                    <div>
                        学生時代の研究内容
                        <NavLink to='/bookcreate' className="secondary-content"><i class="material-icons">send</i></NavLink>
                    </div>
                </li>
                <li class="collection-item">
                    <div>
                        前会社での仕事
                        <NavLink to='/bookcreate' className="secondary-content"><i class="material-icons">send</i></NavLink>
                    </div>
                </li>

          </ul>
        )
    }
}