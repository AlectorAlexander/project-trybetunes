import propTypes from 'prop-types';
import React, { Component } from 'react';
import MusicCard from '../components/MusicCard';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
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

  componentDidMount() {
    this.manListen();
  }

  favorites = async ({ target }) => {
    this.setState({ loading: true });
    const { value } = target;
    const { checked } = target;
    const { checkeds } = this.state;
    const { name } = target;
    checkeds[name] = { checked };
    if (checked) {
      await addSong(value);
      this.setState({ checkeds });
    }
    if (!checked) {
      await removeSong(value);
      this.setState({ checkeds });
    }
    this.setState({ loading: false });
  }

manListen = async () => {
  const { match } = this.props;
  const { params } = match;
  const { id } = params;
  const musicsObj = await getMusics(id);
  const checkeds = musicsObj.map(() => ({ checked: false }));
  const { artistName } = await musicsObj[0];
  const { collectionName } = await musicsObj[0];
  this.setState({ loading: false, musicsObj, artistName, collectionName, checkeds });
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
                  trackName={ obj.trackName }
                  key={ obj.trackName }
                  previewUrl={ obj.previewUrl }
                  trackId={ obj.trackId }
                  onchange={ this.favorites }
                  checked={ checkeds[i].checked }
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
