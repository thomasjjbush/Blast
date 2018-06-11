import React, { Component } from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spotify from 'rn-spotify-sdk';

import * as spotifyUtils from '../utils/spotify/spotify-utils';
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
    Spotify.isInitializedAsync().then((isInitialized) => {
      this.setState({ spotifyInitialized: isInitialized });
    });
    if (!this.state.spotifyInitialized) {
      spotifyUtils.initialise().then((loggedIn) => {
        this.setState({ spotifyInitialized: true });
        if (loggedIn) {
          this.setState({ isLoggedIn: true });
        }
      }).catch((error) => {
        console.log(error);
      });
    } else {
      this.setState({
        spotifyInitialized: true,
      });
      Spotify.isLoggedInAsync().then((loggedIn) => {
        this.setState({ isLoggedIn: loggedIn });
      });
    }
  }

  onSwipeRight(card) {
    this.setState(prevState => ({
      likedCards: [...prevState.likedCards, card],
    }));
    spotifyUtils.addToPlaylist(card.tracks[0].link);
  }

  setLogInStatus(status) {
    this.setState({ isLoggedIn: status });
    spotifyUtils.createSpotifyPlaylistIfNeeded();
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
