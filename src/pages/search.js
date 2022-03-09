import React, { Component } from 'react';

class Seach extends Component {
  constructor() {
    super();
    this.state = {
      search: 0,
    };
  }

  textLength = ({ target }) => {
    const { value } = target;
    const { length } = value;
    if (length >= 2) { this.setState({ search: value }); }
  }

  render() {
    const { search } = this.state;
    return (
      <div data-testid="page-search">
        <label htmlFor="search">
          <input
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
            onChange={ this.textLength }
            type="text"
            name="search"
          />
        </label>
        <button
          disabled={ search < 2 }
          onClick={ console.log('bla') }
          data-testid="search-artist-button"
          type="button"
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Seach;
