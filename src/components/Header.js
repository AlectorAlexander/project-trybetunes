import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
  }

  componentDidMount() {
    this.nameUser();
  }

nameUser = async () => {
  const { name } = await getUser();
  this.setState({ name });
}

render() {
  const { name } = this.state;
  return (
    <header data-testid="header-component">
      <span data-testid="header-user-name">{name === '' ? <Loading /> : name}</span>
      <Link data-testid="link-to-search" to="/search"> Search </Link>
      <Link data-testid="link-to-favorites" to="/favorites"> Favoritas </Link>
      <Link data-testid="link-to-profile" to="/profile"> Perfil </Link>
    </header>
  );
}
}

export default Header;
