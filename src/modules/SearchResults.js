import React, { useState } from 'react';
import './SearchResults.css';
import Track from './Track';

function SearchResults({ results, onAdd }) {  // Added onAdd here
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="SearchResults">
      <h2>Search Results:</h2>
      <ul>
        {currentItems.map((result, index) => {
          return (
            <Track track={result} key={index} onAdd={onAdd} />  // onAdd is passed down here
          );
        })}
      </ul>
      <div className="pagination-buttons">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Back</button>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage * itemsPerPage >= results.length}>Forward</button>
      </div>
    </div>
  );
}

export default SearchResults;
