import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spotify from 'rn-spotify-sdk';

import HomeScreen from './screens/HomeScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import LikesScreen from './screens/LikesScreen';
import BlastScreen from './screens/BlastScreen';
import SettingsScreen from './screens/SettingsScreen';

const icons = {
  Home: 'home',
  Discover: 'search',
  Likes: 'thumbs-up',
  Blast: 'rocket',
  Settings: 'sliders',
};
export const Navigator = TabNavigator(
  {
    Home: {
      screen: props =>
        (<HomeScreen
          {...props}
          spotifyInitialized={props.screenProps.spotifyInitialized}
          isLoggedIn={props.screenProps.isLoggedIn}
          likedCards={props.screenProps.likedCards}
        />),
    },
    Discover: {
      screen: props =>
        (<DiscoverScreen
          {...props}
          spotifyInitialized={props.screenProps.spotifyInitialized}
          isLoggedIn={props.screenProps.isLoggedIn}
          onSwipeRight={props.screenProps.onSwipeRight}
          setLogInStatus={props.screenProps.setLogInStatus}
        />),
    },
    Likes: {
      screen: props =>
        <LikesScreen {...props} likedCards={props.screenProps.likedCards} />,
    },
    Blast: { screen: BlastScreen },
    Settings: { screen: SettingsScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        return <Icon name={icons[routeName]} size={30} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#d61d6b',
      inactiveTintColor: 'gray',
      style: {
        borderTopWidth: 0,
        backgroundColor: 'white',
      },
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
    lazy: true,
  },
);
export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likedCards: [],
      isLoggedIn: false,
      spotifyInitialized: false,
      playlistId: '',
    };
    this.onSwipeRight = this.onSwipeRight.bind(this);
    this.setLogInStatus = this.setLogInStatus.bind(this);
  }

  componentDidMount() {
    // move to spotify utils file pls if we can
    Spotify.isInitializedAsync().then((isInitialized) => {
      this.setState({ spotifyInitialized: isInitialized });
    });
    // initialize Spotify if it hasn't been initialized yet
    if (!this.state.spotifyInitialized) {
      // initialize spotify
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
      Spotify.initialize(spotifyOptions).then((loggedIn) => {
        // update UI state
        this.setState({ spotifyInitialized: true });
        // handle initialization
        if (loggedIn) {
          // this.goToPlayer();
          this.setState({ isLoggedIn: true });
        }
      }).catch((error) => {
        console.log(error);
        // Alert.alert('Error', error.message); DO SOMETHING HERE
      });
    } else {
      // update UI state
      this.setState({
        spotifyInitialized: true,
      });
      // handle logged in
      Spotify.isLoggedInAsync().then((loggedIn) => {
        this.setState({ isLoggedIn: loggedIn });
      });
    }
  }

  onSwipeRight(card) {
    this.setState(prevState => ({
      likedCards: [...prevState.likedCards, card],
    }));
    AsyncStorage.getItem('@app:playlistId').then((playlistId) => {
      Spotify.getMe().then((user) => {
        console.log(`v1/users/${user.id}/playlists/${playlistId}/tracks`);
        console.log(card.tracks[0].link);
        Spotify.sendRequest(
          `v1/users/${user.id}/playlists/${playlistId}/tracks`, 'POST',
          { uris: `spotify:track:${card.tracks[0].link}` }, false,
        ).then(res => console.log(res));
      });
    });
  }

  setLogInStatus(status) {
    this.setState({ isLoggedIn: status });
    this.spotifyPlaylistCheck();
  }

  spotifyPlaylistCheck() {
    Spotify.getAuthAsync().then((auth) => {
      console.log('auth: ', auth, this);
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
            console.log('playlist dont exist');
            Spotify.getMe().then((user) => {
              Spotify.sendRequest(`v1/users/${user.id}/playlists`, 'POST', { name: 'My Blast Playlist', public: false }, true).then((playlist) => {
                console.log('create', playlist);
                AsyncStorage.setItem('@app:playlistId', playlist.id);
              }).catch((error) => { console.log(error); });
            });
          } else {
            console.log('playlist does exist');
          }
        });
    });
  }

  render() {
    return (
      <Navigator screenProps={{
        likedCards: this.state.likedCards,
        onSwipeRight: this.onSwipeRight,
        spotifyInitialized: this.state.spotifyInitialized,
        isLoggedIn: this.state.isLoggedIn,
        setLogInStatus: this.setLogInStatus,
      }}
      />
    );
  }
}
