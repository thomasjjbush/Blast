import React, { Component } from 'react';
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
        scopes: ['user-read-private', 'playlist-read', 'playlist-read-private', 'streaming'],
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
  }

  setLogInStatus(status) {
    this.setState({ isLoggedIn: status });
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
