import { generateRandomString, authorize, handleAuthorization, handleSearch, idSearch, createPlaylist } from './Spotify';
import 'jest-fetch-mock';

jest.mock('global/window', () => ({
  location: {
    hash: '#access_token=some_token&expires_in=3600',
  },
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ some: 'data' }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

test('generateRandomString generates a string of correct length', () => {
  const str = generateRandomString(5);
  expect(str.length).toBe(5);
});

test('authorize triggers a window location change', () => {
  const mockUrl = 'https://accounts.spotify.com/authorize?...'; // the full URL you expect
  global.window.location.href = '';
  authorize('client_id', 'redirect_uri');
  expect(global.window.location.href).toBe(mockUrl);
});

test('handleAuthorization sets access token and login status', () => {
  const setAccessToken = jest.fn();
  const setLoggedIn = jest.fn();
  handleAuthorization('some_state', setAccessToken, setLoggedIn);
  expect(setAccessToken).toHaveBeenCalledWith('some_token');
  expect(setLoggedIn).toHaveBeenCalledWith(true);
});

test('handleSearch makes a fetch call', async () => {
  await handleSearch('song', 'track', 'access_token', 0);
  expect(fetch).toHaveBeenCalledTimes(1);
});

test('idSearch makes a fetch call', async () => {
  await idSearch('id', 'artist', 'access_token', 0);
  expect(fetch).toHaveBeenCalledTimes(1);
});

test('createPlaylist makes multiple fetch calls', async () => {
  await createPlaylist('playlistName', [], 'access_token');
  expect(fetch).toHaveBeenCalledTimes(3);  // One call for user id, one for creating playlist, one for adding tracks
});
