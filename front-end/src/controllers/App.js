import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NavBar from './NavBar/NavBar';
import Home from './Home';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import PostDetails from './PostDetails/PostDetails';

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <NavBar />
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/signin' exact component={SignIn} />
            <Route path='/signup' exact component={SignUp} />
            <Route path='/post/:id' exact component={PostDetails} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
