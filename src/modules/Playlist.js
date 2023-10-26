import React, { useState } from 'react';
import './Playlist.css';
import '../styles.css';

function Playlist({ selectedTracks, onRemove, createPlaylist }) {
  const [playlistName, setPlaylistName] = useState('New Playlist');

  const handleNameChange = (e) => {
    setPlaylistName(e.target.value);
  };

  const handleCompleteClick = () => {
    createPlaylist(playlistName);
    console.log("Playlist completed");
  };

  return (
    <div className="Playlist">
      <h2 data-testid="playlist-header">Playlist</h2>
      <input 
        type="text" 
        value={playlistName} 
        onChange={handleNameChange}
        placeholder="Enter Playlist Name"
      />
      <ul>
        {selectedTracks.map((track, index) => (
          <li key={index} className="playlist-track">
            Song: {track.name}<br />
            Artist: {track.artist}<br />
            Album: {track.album}
            <button className="reusable-button" onClick={() => onRemove(track)}>Remove</button>
          </li>
        ))}
      </ul>
      <button className="reusable-button" onClick={handleCompleteClick}>
        Complete Playlist
      </button>
    </div>
  );
}

export default Playlist;