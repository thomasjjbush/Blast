import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import HomeScreenHero from './widgets/HomeScreenHero';

export default class HomeScreen extends Component {
  	render() {
    	return (
      		<View style={styles.container}>
        		<HomeScreenHero />
      		</View>
    	);
  	}
}

const styles = StyleSheet.create({
	container: {
        flex: 1
    }
});