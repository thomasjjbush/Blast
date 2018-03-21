import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { Icon } from 'react-native-elements';

import HomeScreen from './screens/HomeScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import LikesScreen from './screens/LikesScreen';
import BlastScreen from './screens/BlastScreen';
import SettingsScreen from './screens/SettingsScreen';

const icons = {
    Home: 'home',
    Discover: 'search',
    Likes: 'favorite',
    Blast: 'whatshot',
    Settings: 'settings'
};

export default TabNavigator(
  {
    Home: { screen: HomeScreen },
    Discover: { screen: DiscoverScreen },
    Likes: { screen: LikesScreen },
    Blast: { screen: BlastScreen },
    Settings: { screen: SettingsScreen }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        return <Icon name={icons[routeName]} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#d61d6b',
      inactiveTintColor: 'gray',
      style: {
        borderTopWidth: 0,
        backgroundColor: 'white'
      }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
  }
);