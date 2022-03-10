import propTypes from 'prop-types';
import React, { Component } from 'react';
import MusicCard from '../components/MusicCard';
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
    };
  }

  componentDidMount() {
    this.manListen();
  }

manListen = async () => {
  const { match } = this.props;
  const { params } = match;
  const { id } = params;
  const musicsObj = await getMusics(id);
  const { artistName } = await musicsObj[0];
  const { collectionName } = await musicsObj[0];
  this.setState({ loading: false, musicsObj, artistName, collectionName });
}

render() {
  const { artistName, collectionName, musicsObj, loading } = this.state;
  return (
    <div data-testid="page-album">
      {loading ? <Loading /> : (
        <ol>
          <h1 data-testid="artist-name">{artistName}</h1>
          <h2 data-testid="album-name">{collectionName}</h2>
          <section className="musicCard">
            {musicsObj.map((obj, i) => i > 0 && (
              <li>
                <MusicCard
                  trackName={ obj.trackName }
                  key={ obj.trackName }
                  previewUrl={ obj.previewUrl }
                />
              </li>))}
          </section>
        </ol>)}
    </div>
  );
}
}

Album.propTypes = {
  id: propTypes.number.isRequired,
  match: propTypes.string.isRequired,
};

export default Album;
