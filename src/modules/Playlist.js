import React, { useState } from 'react';
import './Playlist.css';

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
            <img src={track.img} alt="Album Cover" />
            <div className="playlist-track-details">
              <span className="track-name-large">{track.name}</span><br />
              <span className="track-artist-medium">{track.artist}</span>
            </div>
            <button className="reusable-button" onClick={() => onRemove(track)}>Remove</button>
          </li>
        ))}
      </ul>
      <button className="complete-button" onClick={handleCompleteClick}>
        Complete Playlist
      </button>
    </div>
  );
}

export default Playlist;