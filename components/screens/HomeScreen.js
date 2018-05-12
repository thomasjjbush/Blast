import React, { Component } from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';

import HomeScreenHero from './widgets/HomeScreenHero';

export default class HomeScreen extends Component {

	componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
	}
	
	render() {
		return (
				<View style={styles.container}>
				<StatusBar barStyle="light-content"/>
					<HomeScreenHero/>
					<View style={styles.row}>
						<Text> Your likes
						</Text>
					</View>
					<View style={styles.row}>
						<Text> Your super likes or whatever
						</Text>
					</View>
				</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
        flex: 1
	},
	row: {
		backgroundColor: '#DCDCDC',
		height: 200,
		marginBottom: 10
	}
});