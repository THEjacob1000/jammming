import React, { useState, useEffect } from 'react';
import logo from './Logo.png';
import './App.css';
import SearchBar from './modules/SearchBar';
import SearchResults from './modules/SearchResults';
import Playlist from './modules/Playlist';

// Function to generate random state
const generateRandomString = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  
  const client_id = "c9d7d7dc40aa430e8b27d120f0301c16";
  const redirect_uri = "http://localhost:3000";
  
  const state = generateRandomString(16);
  const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${encodeURIComponent(state)}`;

  useEffect(() => {
    // Check for Spotify token in URL here to update loggedIn state
    // setLoggedIn(true) if token exists
  }, []);

  const handleSearch = () => {
    // Simulated search results
    setSearchResults([{ name: 'Song 1', artist: 'Artist 1', album: 'Album 1' }, { name: 'Song 2', artist: 'Artist 2', album: 'Album 2' }, { name: 'Song 3', artist: 'Artist 3', album: 'Album 3' }]);
  };

  const handleAddTrack = (track) => {
    if (!selectedTracks.some(selectedTrack => selectedTrack.name === track.name)) {
      setSelectedTracks([...selectedTracks, track]);
    }
  };

  const handleRemoveTrack = (trackToRemove) => {
    const updatedTracks = selectedTracks.filter(track => track.name !== trackToRemove.name);
    setSelectedTracks(updatedTracks);
  };

  const logIntoSpotify = () => {
    // Redirect to Spotify login
    window.location.href = url;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img className='App-logo' src={logo} alt="Logo" />
      </header>
      {loggedIn ? (
        <>
          <SearchBar onSearch={handleSearch} />
          <div className="content">
            {searchResults.length > 0 && <SearchResults results={searchResults} onAdd={handleAddTrack} />}
            <Playlist selectedTracks={selectedTracks} onRemove={handleRemoveTrack} />
          </div>
        </>
      ) : (
        <button onClick={logIntoSpotify}>Log Into Spotify</button>
      )}
    </div>
  );
}

export default App;
