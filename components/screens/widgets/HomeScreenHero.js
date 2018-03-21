import React, { Component } from 'react';
import {Animated, Easing, View, Text, ImageBackground, StyleSheet, Dimensions} from 'react-native';

export default class HomeScreenHero extends Component{
  
  state = {
    spinValue: new Animated.Value(0),
  }

  spin() {
    Animated.loop(
      Animated.timing(
      this.state.spinValue,
      {
        toValue: 1,
        duration: 45000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }

  componentDidMount() {
    this.spin();
  }

    render(){
      let spin = this.state.spinValue.interpolate({
            inputRange: [0,1],
            outputRange: ['0deg', '360deg']
        });
      return(
        <View style={styles.container}>
          <Animated.Image 
           style={[styles.hero, {transform: [{rotate: spin}] }]}
           source={require('../../../assets/img/universe.jpg')}>
          </Animated.Image>
          <Text>Cunt</Text>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
      width: Dimensions.get('window').width,
      height: 200,
      overflow: 'hidden'
    },
    hero: {
      position: 'absolute',
      top: -100,
      width: Dimensions.get('window').width * 2,
      height: 600,
      alignSelf: 'center'
    }
});
