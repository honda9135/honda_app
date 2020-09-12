import React, { Component } from 'react';
import { BrowserRouter,Switch , Route } from 'react-router-dom';
import { connect } from 'react-redux'

//ナビバー
import Navbar from './components/layout/Navbar';
//認証
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
//Page
import InitialPage from './components/pages/InitialPage';
import MyPage from './components/pages/MyPage'
import FollowPage from './components/pages/FollowPage';
import DashboardPage from './components/pages/DashboardPage';
//機能
import CreateBook from './components/books/CreateBook';
import EditBook from './components/books/EditBook';

//Modal
//どこでも良いけど直感的に分かるようにここに配置
import FollowModal from './components/follow/FollowModal'
import MyprofileModal from './components/profile/MyprofileModal';
import LibraryRegModal from './components/library/LibraryRegModal';




class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            {/* 認証 */}
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signup' component={SignUp} />
            {/* Page */}
            <Route exact path='/' component={InitialPage} />
            <Route exact path='/dashbord' component={DashboardPage} />
            <Route path='/mypage' component={MyPage} />  
            <Route path='/follow/:uid' component={FollowPage} />
            {/*機能*/}
            <Route exact path='/bookcreate' component={CreateBook} />
            <Route path='/editbook/:id' component={EditBook} />
          </Switch>
          {
            this.props.auth.uid&&this.props.profile.isLoaded
            ?
            <frameElement>
              <MyprofileModal profile={this.props.profile} />
              <FollowModal profile={this.props.profile} /> 
              <LibraryRegModal profile={this.props.profile} />
            </frameElement>
            :
            null
          }
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      auth: state.firebase.auth,
      profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(App);