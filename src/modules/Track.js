import React, { useState } from 'react';
import './Track.css';
import '../styles.css';

function Track({ track, onAdd, type, onNewSearch, selectedIds }) {
  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = useState(false);

  const handleAudioPlay = () => {
    if (!audio) {
      const audioObj = new Audio(track.preview);
      setAudio(audioObj);
      audioObj.addEventListener('ended', () => setPlaying(false));
      audioObj.play();
      setPlaying(true);
    } else {
      if (!playing) {
        audio.play();
        setPlaying(true);
      } else {
        audio.pause();
        setPlaying(false);
      }
    }
  };

  const handleNewSearchClick = () => {
    console.log("New Search Button clicked for ", track.artistId || track.albumId);
    onNewSearch(type, track.artistId || track.albumId);
  };

  if (type === 'track' && !selectedIds.includes(track.songId)) {
    return (
      <li className='track'>
        <img src={track.img} alt="Album Cover" />
        <div className="track-details">
          <span className="track-name-large">{track.name}</span><br />
          <span className="track-album-small">{track.album}</span><br />
          <span className="track-artist-medium">{track.artist}</span>
        </div>
        <div className="button-container">
          <button className="reusable-button" onClick={() => onAdd(track)}>Add</button>
          <button className="preview-button" onClick={handleAudioPlay}>{playing ? 'Pause' : 'Preview'}</button>
        </div>
      </li>
    );
  } else if (type === 'artist') {
    return (
      <li className='track'>
        <img src={track.img} alt="Artist" />
        <div>
          <span className="track-name-large">{track.name}</span>
        </div>
        <button className="search-button" onClick={handleNewSearchClick}>Search</button>
      </li>
    );
  } else if (type === 'album') {
    return (
      <li className='track'>
        <img src={track.img} alt="Album Cover" />
        <div>
          <span className="track-name-large">{track.name}</span><br />
          <span className="track-artist-medium">{track.artist}</span>
        </div>
        <button className="search-button" onClick={handleNewSearchClick}>Search</button>
      </li>
    );
  }
}

export default Track;
