import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/album';
import Favorites from './pages/favorites';
import Login from './pages/login';
import Profile from './pages/profile';
import ProfileEdit from './pages/profileEdit';
import Seach from './pages/search';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={ Login } />
          <Route path="/search" component={ Seach } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile" exact component={ Profile } />
          <Route path="/profile/edit" exact component={ ProfileEdit } />
          <Route component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;
