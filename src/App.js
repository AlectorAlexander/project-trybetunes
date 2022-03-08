import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Album from './pages/album';
import Favorites from './pages/favorites';
import Login from './pages/login';
import Profile from './pages/profile';
import ProfileEdit from './pages/profileEdit';
import Seach from './pages/search';
import NotFound from './pages/NotFound';
import Loading from './pages/loading';
import { createUser } from './services/userAPI';
import Header from './components/Header';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      logado: false,
      name: '',
    };
  }

  saveUser = async () => {
    this.setState({ loading: true });
    const { name } = this.state;
    await createUser({ name });
    this.setState({ logado: true, loading: false });
  }

  textLength = ({ target }) => {
    const { value } = target;
    const { length } = value;
    if (length >= (2 + 1)) { this.setState({ name: value }); }
  }

  render() {
    const { loading, name, logado } = this.state;
    return (
      <div>
        <Header />
        <Switch>
          {loading && <Loading />}
          <Route path="/" exact>
            {logado ? <Redirect to="/search" /> : <Login
              onChange={ this.textLength }
              disabled={ name.length < (2 + 1) }
              onClick={ this.saveUser }
            />}
          </Route>
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
