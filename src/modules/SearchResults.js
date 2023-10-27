import React from 'react';
import './SearchResults.css';
import '../styles.css';
import Track from './Track';

function SearchResults({ results, onAdd, onNewSearch, offset, setOffset, selectedTracks }) {  // Added setOffset here
  const selectedIds = selectedTracks.map(track => track.songId);
  const handleForward = () => {
    setOffset(prevOffset => prevOffset + 5);  // Increment offset
  }

  const handleBack = () => {
    setOffset(prevOffset => Math.max(prevOffset - 5, 0));  // Decrement offset
  }
  
  return (
    <div className="SearchResults">
      <h2>Search Results:</h2>
      <ul>
        {results[0].map((result, index) => (
          <Track track={result} key={index} onAdd={onAdd} onNewSearch={onNewSearch} type={results[1]} selectedIds={selectedIds}/>
        ))}
      </ul>
      <div className="pagination-buttons">
        <button className="reusable-button" onClick={handleBack} disabled={offset === 0}>Back</button>
        <button className="reusable-button" onClick={handleForward}>Forward</button>
      </div>
    </div>
  );
}

export default SearchResults;
