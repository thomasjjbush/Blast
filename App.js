import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import StatusBarBackground from './containers/StatusBar';
import ContentContainer from './containers/ContentContainer'
import Navigation from './containers/navigation';


export default class App extends Component {    
    render() {
        return (
            <View style={styles.container}>
                <StatusBarBackground />
                <ContentContainer />
                <Navigation />
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
