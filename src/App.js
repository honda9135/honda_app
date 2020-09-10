import React, { Component } from 'react';
import { BrowserRouter,Switch , Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateBook from './components/books/CreateBook';
import MyBookCatalog from './components/books/MyBookCatalog';
import FollowCatalogDisplay from './components/follow/FollowCatalogDisplay'
import FollowSearch from './components/follow/FollowSearch';
import FollowModal from './components/follow/FollowModal'
import { connect } from 'react-redux'
import MyprofileModal from './components/profile/MyprofileModal';
import EditBook from './components/books/EditBook';
import LibraryRegModal from './components/books/LibraryRegModal';
import InitialPage from './components/dashboard/InitialPage';



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={InitialPage} />
            <Route exact path='/dashbord' component={Dashboard} />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/bookcreate' component={CreateBook} />
            <Route exact path='/mybookcatalog' component={MyBookCatalog} />
            {/* <Route exact path='/profile' component={Profile} /> */}
            <Route path='/follow/:uid' component={FollowCatalogDisplay} />
            <Route path='/editbook/:id' component={EditBook} />
            {/* <Route path='/test/:uid' component={Test} />  */}
            <Route path='/search' component={FollowSearch} />
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