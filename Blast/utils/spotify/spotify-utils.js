import { AsyncStorage } from 'react-native';
import Spotify from 'rn-spotify-sdk';

export function initialise() {
  const spotifyOptions = {
    clientID: 'd37857c44487439686430b93237f9c9b',
    sessionUserDefaultsKey: 'SpotifySession',
    redirectURL: 'blast-login://callback',
    scopes: [
      'user-read-private',
      'playlist-read',
      'playlist-read-private',
      'streaming',
      'playlist-modify-public',
      'playlist-modify-private',
    ],
  };
  return Spotify.initialize(spotifyOptions);
}

export function addToPlaylist(track) {
  AsyncStorage.getItem('@app:playlistId').then((playlistId) => {
    Spotify.getMe().then((user) => {
      Spotify.sendRequest(
        `v1/users/${user.id}/playlists/${playlistId}/tracks`,
        'GET',
        { fields: 'items(track(id))' },
        false,
      ).then((tracks) => {
        const trackExistsInPlaylist =
        tracks.items.some(item => item.track.id === track);
        if (!trackExistsInPlaylist) {
          Spotify.sendRequest(
            `v1/users/${user.id}/playlists/${playlistId}/tracks`, 'POST',
            { uris: `spotify:track:${track}` }, false,
          ).then(res => console.log(res));
        }
      });
    });
  });
}

export function createSpotifyPlaylistIfNeeded() {
  Spotify.getAuthAsync().then((auth) => {
    // eslint-disable-next-line no-undef
    fetch('https://api.spotify.com/v1/me/playlists', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then((response) => {
        const playlistExists = response.items.some(playlist => playlist.name === 'My Blast Playlist');
        if (!playlistExists) {
          Spotify.getMe().then((user) => {
            Spotify.sendRequest(`v1/users/${user.id}/playlists`, 'POST', { name: 'My Blast Playlist', public: false }, true).then((playlist) => {
              console.log(playlist);
            }).catch((error) => { console.log(error); });
          });
        }
      });
  });
}

export function playTrack(track) {
  Spotify.playURI(`spotify:track:${track}`, 0, 0).then((error) => {
    console.log(error);
  });
}
