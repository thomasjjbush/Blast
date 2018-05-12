import React, { Component } from 'react';
import { View, TextInput, StyleSheet, StatusBar } from 'react-native';

import StatusBarBackground from './components/screens/widgets/StatusBar';
import TabNavigator from './components/navigation';


export default class App extends Component {    
    render() {
        return (
            <View style={styles.container}>
                {/* <StatusBarBackground /> */}
                {/* <StatusBar
        backgroundColor="blue"
        barStyle="light-content"
      /> */}
                <TabNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f2'
    }
});
