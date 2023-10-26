import React from 'react';
import './Track.css';

function Track({ track, onAdd, type, onNewSearch }) {
    const handleClick = () => {
      console.log("Button clicked", track);  // Debugging line
      onAdd(track);
    };
    const handleNewSearchClick = () => {
      console.log("New Search Button clicked for ", track.artistId || track.albumId);  // Debugging line
      onNewSearch(type, track.artistId || track.albumId);
    };
    if (type==='track') {
      return (
        <li className="track">
          Song: {track.name}<br />
          Album: {track.album}<br />
          {track.artist.includes(', ') ? "Artists" : "Artist"}: {track.artist}
          <button className="add-button" onClick={handleClick}>+</button>
        </li>
      );
    } else if (type==='artist') {
      return (
        <li className='track'>
          Name: {track.name}
          <button className="search-button" onClick={handleNewSearchClick}>Search</button>
        </li>
      )
    } else {
      return (
        <li className='track'>
          Name: {track.name}<br />
          {track.artist.includes(', ') ? "Artists" : "Artist"}: {track.artist}
          <button className="search-button" onClick={handleNewSearchClick}>Search</button>
        </li>
      )
    }
  
    
  }

export default Track;