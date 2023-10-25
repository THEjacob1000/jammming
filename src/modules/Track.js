import React from 'react';
import './Track.css';

function Track({ track, onAdd }) {
    const handleClick = () => {
      onAdd(track);
    };
  
    return (
      <li className="track">
        Song: {track.name}<br />
        Artist: {track.artist}<br />
        Album: {track.album}
        <button className="add-button" onClick={handleClick}>+</button>
      </li>
    );
  }

export default Track;