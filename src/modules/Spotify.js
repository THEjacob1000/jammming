export const generateRandomString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export const authorize = (client_id, redirect_uri) => {
    const state = generateRandomString(16);
    localStorage.setItem('spotify_auth_state', state); // Save state to localStorage
    const scope = 'playlist-modify-public playlist-modify-private'; // Add scopes here
    const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${client_id}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${encodeURIComponent(state)}`;
    window.location.href = url;
  };

export const handleAuthorization = (savedState, setAccessToken, setLoggedIn) => {
    const hash = window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            let parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
            return initial;
        }, {});

    if (hash.access_token && hash.expires_in) {
        setAccessToken(hash.access_token);
        setLoggedIn(true);
    }

    if (hash.state !== savedState) {
        console.error('Security Breach Detected');
        setLoggedIn(false);
        setAccessToken('');
    }

    localStorage.removeItem('spotify_auth_state'); // Remove state after it's used
};


export const handleSearch = async (search, searchType, accessToken, offset) => {
    console.log("Inside Spotify handleSearch", search, searchType, accessToken);  // Debugging line
    const searchFormatted = search.split(' ').join('+');
    const headers = {
        'Authorization': `Bearer ${accessToken}`
    };
    const response = await fetch(`https://api.spotify.com/v1/search?q=${searchFormatted}&type=${searchType}&market=AU&limit=5&offset=${offset}`, { headers });
    console.log("Fetch response: ", response);  // Debugging line

    if (response.ok) {
        const jsonResponse = await response.json();
        console.log("JSON response: ", jsonResponse);  // Debugging line
        let resultArray = [];

        if (searchType === 'track') {
            const result = jsonResponse.tracks.items;
            for (let i = 0; i < result.length; i++) {
                const artists = result[i].artists.map(artist => artist.name).join(', ');
                resultArray.push({
                    name: result[i].name,
                    album: result[i].album.name,
                    artist: artists,
                    songId: result[i].id,
                    img: result[i].album.images[2].url
                });
            }
        } else if (searchType === 'artist') {
            const result = jsonResponse.artists.items;
            for (let i = 0; i < result.length; i++) {
                resultArray.push({
                    name: result[i].name,
                    artistId: result[i].id,
                    img: result[i].images[2].url
                });
            }
        } else {
            const result = jsonResponse.albums.items;
            for (let i = 0; i < result.length; i++) {
                const artists = result[i].artists.map(artist => artist.name).join(', ');
                resultArray.push({
                    name: result[i].name,
                    artist: artists,
                    albumId: result[i].id,
                    img: result[i].images[2].url
                });
            }
        }
        console.log(resultArray);
        console.log(Array.isArray(resultArray))
        return [resultArray, searchType]
    } else {
        console.log('Fetch failed');
    }
}

export const idSearch = async (id, searchType, accessToken, offset) => {
    // Initialize headers
    const headers = {
        'Authorization': `Bearer ${accessToken}`
    };
    // Initialize result array
    let resultArray = [];

    // Handle 'artist' search type
    if (searchType === 'artist') {
        const response = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=AU`, { headers });
        if (response.ok) {
            const jsonResponse = await response.json();
            const result = jsonResponse.tracks;
            // Check if result and result.length are defined
            if (result && result.length) {
                for (let i = 0; i < result.length && i < 6; i++) {
                    const artists = result[i].artists.map(artist => artist.name).join(', ');
                    resultArray.push({
                        name: result[i].name,
                        album: result[i].album.name,
                        artist: artists,
                        songId: result[i].id,
                        img: result[i].album.images[2].url
                    });
                }
            }
        } else {
            console.log('Fetch failed for artist');
        }

        // Handle 'album' search type
    } else if (searchType === 'album') {
        const response = await fetch(`https://api.spotify.com/v1/albums/${id}/tracks?market=AU&limit=5&offset=${offset}`, { headers });
        if (response.ok) {
            const jsonResponse = await response.json();
            const result = jsonResponse.items;
            // Check if result and result.length are defined
            if (result && result.length) {
                for (let i = 0; i < result.length; i++) {
                    const artists = result[i].artists.map(artist => artist.name).join(', ');
                    resultArray.push({
                        name: result[i].name,
                        album: result[i].album.name,
                        artist: artists,
                        songId: result[i].id,
                        img: result[i].album.images[2].url
                    });
                }
            }
        } else {
            console.log('Fetch failed for album');
        }
    }
    console.log(resultArray);
    console.log(Array.isArray(resultArray))
    return [resultArray, 'track'];
};

export const createPlaylist = async (name, items, accessToken) => {
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    };

    // Getting the current user's ID
    const userDataResponse = await fetch(`https://api.spotify.com/v1/me`, { headers });
    const userData = await userDataResponse.json();
    const userID = userData.id;

    // Creating the Playlist
    const requestOptions = {
        method: 'POST',
        headers,
        body: JSON.stringify({ name })
    };

    const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, requestOptions);
    const playlistData = await playlistResponse.json();
    const playlistId = playlistData.id;
    console.log('UserID:', userID);
    console.log('PlaylistData:', playlistData);
    console.log('Request Options:', requestOptions);


    // Updating the playlist to include the items
    const uris = items.map(item => `spotify:track:${item.songId}`);

    const itemRequestOptions = {
        method: 'POST',
        headers,
        body: JSON.stringify({ uris })
    };

    const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, itemRequestOptions);
    const addTracksData = await addTracksResponse.json();

    console.log(addTracksData);
    return addTracksData;
};
