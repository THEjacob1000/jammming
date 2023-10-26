import React, { useState, useEffect } from 'react';
import logo from './Logo.png';
import './App.css';
import './styles.css';
import SearchBar from './modules/SearchBar';
import SearchResults from './modules/SearchResults';
import Playlist from './modules/Playlist';
import { authorize, handleAuthorization, handleSearch as SpotifyHandleSearch, idSearch as SpotifyIdSearch } from './modules/Spotify';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [offset, setOffset] = useState(0);
  const [lastSearchTerm, setLastSearchTerm] = useState('');
  const [lastSearchType, setLastSearchType] = useState('');

  const client_id = "c9d7d7dc40aa430e8b27d120f0301c16";
  const redirect_uri = "http://localhost:3000";

  useEffect(() => {
    const savedState = localStorage.getItem('spotify_auth_state');
    if (savedState) {
      handleAuthorization(savedState, setAccessToken, setLoggedIn);
    }
  }, []);

  const logIntoSpotify = () => {
    authorize(client_id, redirect_uri);
  };
  const handleSearch = async (searchTerm, searchType) => {
    setLastSearchTerm(searchTerm);
    setLastSearchType(searchType);
    const newResults = await SpotifyHandleSearch(searchTerm, searchType, accessToken, offset);
    setSearchResults(newResults);
  };
  const handleNewSearch = async (searchType, id) => {
    const newResults = await SpotifyIdSearch(id, searchType, accessToken, offset);
    setSearchResults(newResults);
  };
  const onAdd = (track) => {
    setSelectedTracks([...selectedTracks, track]);
  };
  const onRemove = (track) => {
    const newSelectedTracks = selectedTracks.filter(
      selectedTrack => selectedTrack.songId !== track.songId
    );
    setSelectedTracks(newSelectedTracks);
  };

  useEffect(() => {
    console.log("searchResults updated:", searchResults);
  }, [searchResults]);
  useEffect(() => {
    if (lastSearchTerm && lastSearchType) {
      handleSearch(lastSearchTerm, lastSearchType);
    }
  }, [offset]);
  

  return (
    <div className="App">
      <header className="App-header">
        <img className='App-logo' src={logo} alt="Logo" />
      </header>
      {loggedIn ? (
        <>
          <SearchBar onSearch={handleSearch} access={accessToken} />
          <div className="content">
            {searchResults.length > 0 && (
              <SearchResults results={searchResults} onAdd={onAdd} onNewSearch={handleNewSearch} offset={offset} setOffset={setOffset} />  // Passed setOffset here
            )}
            <Playlist selectedTracks={selectedTracks} onRemove={onRemove} />
          </div>
        </>
      ) : (
        <button onClick={logIntoSpotify}>Log Into Spotify</button>
      )}
    </div>
  );
}

export default App;
