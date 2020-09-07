import React, { Component } from 'react';
import { BrowserRouter,Switch , Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateBook from './components/books/CreateBook';
import MyBookCatalog from './components/books/MyBookCatalog';
import Profile from './components/profile/Profile';
import Test from './config/test';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/bookcreate' component={CreateBook} />
            <Route path='/bookcatalog' component={MyBookCatalog} />
            <Route path='/profile' component={Profile} />
            <Route path='/test' component={Test} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;