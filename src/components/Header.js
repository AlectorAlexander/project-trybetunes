import React, { Component } from 'react';
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
    </header>
  );
}
}

export default Header;
