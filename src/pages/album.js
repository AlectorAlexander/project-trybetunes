import propTypes from 'prop-types';
import React, { Component } from 'react';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import Loading from './loading';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      musicsObj: [],
      artistName: '',
      collectionName: '',
      checkeds: [],
    };
  }

  async componentDidMount() {
    await this.manListen();
  }

  manListenFavorites = async () => {
    await getFavoriteSongs()
      .then((stuf) => this.setState({ checkeds: stuf, loading: false }));
  }

  favorites = async ({ target }) => {
    this.setState({ loading: true });
    const { value } = target;
    const { checkeds } = this.state;
    const { checked } = target;
    if (checked) {
      await addSong(value);
      this.setState((prvStt) => ({
        checkeds: [...prvStt.checkeds, value],
        loading: false,
      }));
    }
    if (!checked) {
      await removeSong(value);
      const newChecks = checkeds.filter((check) => check !== value);
      await newChecks.map((check) => addSong(check));
      this.setState({ checkeds: newChecks }, this.setState({ loading: false }));
    }
  }

manListen = async () => {
  const { match: { params: { id } } } = this.props;
  const musicsObj = await getMusics(id);
  const { artistName } = await musicsObj[0];
  const { collectionName } = await musicsObj[0];
  this.setState({ musicsObj, artistName, collectionName },
    await this.manListenFavorites());
}

render() {
  const { artistName, collectionName, musicsObj, loading, checkeds } = this.state;
  return (
    <div data-testid="page-album">
      {loading ? <Loading /> : (
        <ol>
          <h1 data-testid="artist-name">{artistName}</h1>
          <h2 data-testid="album-name">{collectionName}</h2>
          <section className="musicCard">
            {musicsObj.map((obj, i) => i > 0 && (
              <li key={ i }>
                <MusicCard
                  checked={ checkeds.find((el) => parseInt(el, 10) === obj.trackId) }
                  trackName={ obj.trackName }
                  key={ obj.trackName }
                  previewUrl={ obj.previewUrl }
                  trackId={ obj.trackId }
                  onchange={ this.favorites }
                  name={ i }
                />
              </li>))}
          </section>
        </ol>)}
    </div>
  );
}
}

Album.propTypes = {
  match: propTypes.string.isRequired,
};

Album.defaultProps = {
};

export default Album;
