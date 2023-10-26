import React from 'react';
import './SearchResults.css';
import '../styles.css';
import Track from './Track';

function SearchResults({ results, onAdd, onNewSearch, offset, setOffset }) {  // Added setOffset here
  
  const handleForward = () => {
    setOffset(prevOffset => prevOffset + 10);  // Increment offset
  }

  const handleBack = () => {
    setOffset(prevOffset => Math.max(prevOffset - 10, 0));  // Decrement offset
  }
  
  return (
    <div className="SearchResults">
      <h2>Search Results:</h2>
      <ul>
        {results[0].map((result, index) => (
          <Track track={result} key={index} onAdd={onAdd} onNewSearch={onNewSearch} type={results[1]} />
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
