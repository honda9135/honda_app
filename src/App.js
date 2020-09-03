import React, { Component } from 'react';
import { BrowserRouter,Switch , Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDetails from './components/projects/ProjectDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/projects/CreateProject';
import CreateBook from './components/books/CreateBook';
import BookCatalog from './components/books/BookCatalog';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/project/:id' component={ProjectDetails} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create' component={CreateProject} />
            <Route path='/bookcreate' component={CreateBook} />
            <Route path='/bookcatalog' component={BookCatalog} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;