import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, access }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('track'); // Default to 'track'

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm, searchType, access);
    };

    return (
        <div className="SearchBar-Container">
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Enter A Song, Album, or Artist"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="SearchTypeDropdown"
                >
                    <option value="track">Track</option>
                    <option value="album">Album</option>
                    <option value="artist">Artist</option>
                </select>
                <button className="SearchButton" type="submit">SEARCH</button>
            </form>
        </div>
    );
}

export default SearchBar;
