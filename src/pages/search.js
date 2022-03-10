import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './loading';

class Seach extends Component {
  constructor() {
    super();
    this.state = {
      search: 0,
      value: '',
      loading: false,
      searchClick: false,
      nameArtist: '',
      artistsObject: [],
    };
  }

  componentDidMount() {
  //  this.setState({ searchClick: false, artistsObject: [] });
  }

  searchBand = async () => {
    this.setState({ searchClick: true, loading: true });
    const { value } = this.state;
    const artists = await searchAlbumsAPI(value);
    this.setState({ loading: false, search: 0, value: '', artistsObject: artists });
    // this.setState((estadoAnterior) => ({
    //   artistsObject: [estadoAnterior, artists],
    // }), console.log(artists));
  }

  textLength = ({ target }) => {
    const { value } = target;
    const { length } = value;
    this.setState({ search: length, value, nameArtist: value });
  }

  render() {
    const { value, search, loading, searchClick, nameArtist, artistsObject } = this.state;
    const ultimateAnswer = artistsObject.length === 0 && searchClick
      ? (<p>Nenhum álbum foi encontrado</p>)
      : '';
    return (
      <div data-testid="page-search">
        {loading ? <Loading />
          : (
            <>
              <label htmlFor="search">
                <input
                  data-testid="search-artist-input"
                  value={ value }
                  placeholder="Nome do Artista"
                  onChange={ this.textLength }
                  type="text"
                  name="search"
                />
              </label>
              <button
                disabled={ search < 2 }
                onClick={ this.searchBand }
                data-testid="search-artist-button"
                type="button"
              >
                Pesquisar
              </button>
            </>)}
        {searchClick && artistsObject.length > 0
          ? (
            <div className="searchArtists">
              <p>
                {`Resultado de álbuns de: ${nameArtist}`}
              </p>
              <div className="artistsContainer">
                {artistsObject.map((band) => (
                  <>
                    <img
                      src={ band.artworkUrl100 }
                      alt={ band.collectionName }
                      key={ band.collectionId }
                    />
                    <Link
                      data-testid={ `link-to-album-${band.collectionId}` }
                      to={ `/album/${band.collectionId}` }
                    >
                      <h4>{band.artistName}</h4>
                    </Link>
                    <h5>{band.collectionName}</h5>
                  </>
                ))}
              </div>
            </div>) : ultimateAnswer}
      </div>
    );
  }
}

export default Seach;
