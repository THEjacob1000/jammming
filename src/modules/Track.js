import React from 'react';
import './Track.css';
import '../styles.css';

function Track({ track, onAdd, type, onNewSearch }) {
  // const handleClick = () => {
  //   console.log("Button clicked", track);  // Debugging line
  //   onAdd(track);
  // };
  const handleNewSearchClick = () => {
    console.log("New Search Button clicked for ", track.artistId || track.albumId);  // Debugging line
    onNewSearch(type, track.artistId || track.albumId);
  };
  if (type === 'track') {
    return (
      <li className='track'>
        <img src={track.img} alt="Album Cover" />
        <div>
          <span className="track-name-large">{track.name}</span><br />
          <span className="track-album-small">{track.album}</span><br />
          <span className="track-artist-medium">{track.artist}</span>
        </div>
        <button className="reusable-button" onClick={() => onAdd(track)}>Add</button>
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
    )
  } else {
    return (
      <li className='track'>
        <img src={track.img} alt="Album Cover" />
        <div>
          <span className="track-name-large">{track.name}</span><br />
          <span className="track-artist-medium">{track.artist}</span>
        </div>
        <button className="search-button" onClick={handleNewSearchClick}>Search</button>
      </li>
    )
  }


}

export default Track;