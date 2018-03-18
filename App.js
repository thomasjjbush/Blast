import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import StatusBarBackground from './components/StatusBar';
import TabNavigator from './components/navigation';


export default class App extends Component {    
    render() {
        return (
            <View style={styles.container}>
                <StatusBarBackground />
                <TabNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});
