import propTypes from 'prop-types';
import React, { Component } from 'react';

class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, onchange, trackId, checked, name } = this.props;
    return (
      <div>
        <h4>{trackName}</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="Favorita">
          <span>
            Favorita
          </span>
          <input
            type="checkbox"
            id="Favorita"
            data-testid={ `checkbox-music-${trackId}` }
            value={ trackId }
            onChange={ onchange }
            checked={ checked }
            name={ name }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
  trackName: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  onchange: propTypes.func.isRequired,
  checked: propTypes.bool.isRequired,
};

export default MusicCard;
