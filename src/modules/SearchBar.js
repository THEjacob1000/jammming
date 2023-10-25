import React from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
    return (
        <div className="SearchBar-Container">
            <form onSubmit={(e) => { e.preventDefault(); onSearch(); }}>
                <input placeholder="Enter A Song, Album, or Artist" />
                <button className="SearchButton" type="submit">SEARCH</button>
            </form>
        </div>
    );
}

export default SearchBar;