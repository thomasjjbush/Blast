import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Navigation from './containers/navigation';
import StatusBarBackground from './containers/StatusBar'
export default class App extends Component {
    
    render() {
        return (
      
            <View style={styles.container}>
                <StatusBarBackground/>
                <Navigation/>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    }

});
