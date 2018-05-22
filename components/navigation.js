import React, { Component } from 'react';
import { NativeModules } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './screens/HomeScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import LikesScreen from './screens/LikesScreen';
import BlastScreen from './screens/BlastScreen';
import SettingsScreen from './screens/SettingsScreen';

const { SpotifyModule } = NativeModules;

const icons = {
  Home: 'home',
  Discover: 'search',
  Likes: 'thumbs-up',
  Blast: 'rocket',
  Settings: 'sliders',
};
export const Navigator = TabNavigator(
  {
    Home: { screen: props => <HomeScreen {...props} likedCards={props.screenProps.likedCards} /> },
    Discover: {
      screen: props => <DiscoverScreen {...props} onSwipeRight={props.screenProps.onSwipeRight} />,
    },
    Likes: { screen: LikesScreen },
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
    };
    this.onSwipeRight = this.onSwipeRight.bind(this);
  }

  componentDidMount() {
    SpotifyModule.initWithCredentials('d37857c44487439686430b93237f9c9b', 'blast-login://callback', ['streaming', 'user-read-currently-playing', 'user-read-playback-state', 'user-modify-playback-state'], (error) => {
      console.log('init');
      if (error) {
        console.log(`some ${error}`);
      }
    });
  }
  onSwipeRight(card) {
    this.setState(prevState => ({
      likedCards: [...prevState.likedCards, card],
    }));
  }
  render() {
    return (
      <Navigator screenProps={{
        likedCards: this.state.likedCards,
        onSwipeRight: this.onSwipeRight,
      }}
      />
    );
  }
}


// likedCards={this.state.likedCards} onSwipeRight={this.onSwipeRight
