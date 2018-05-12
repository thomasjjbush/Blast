import React, { Component } from 'react';
import { Animated, Easing, View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

class HomeScreenHero extends Component{
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }
  state = {
    spinValue: new Animated.Value(0),
  }

  spin() {
    Animated.loop(
      Animated.timing(
      this.state.spinValue,
      {
        toValue: 1,
        duration: 250000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }

  componentDidMount() {
    this.spin();
  }
  onPress() {
    this.props.navigation.navigate('Discover');
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
        <Image
          style={styles.manOverlay}
          source={require('../../../assets/img/man.png')}
        />
        <View style={styles.overlay}>
          <Text style={styles.title}> Discover new music</Text>
          <TouchableOpacity style={styles.button} onPress={this.onPress}>
            <Text style={styles.buttonText}>Start swiping</Text>
          </TouchableOpacity>
        </View>
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
    },
    overlay: {
      marginTop: 20,
      position: 'relative',
      paddingLeft: 10,
    },
    manOverlay: {
      position: 'absolute',
      width: Dimensions.get('window').width,
      height: 200,
      marginTop: 50
    },
    button: {
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 10,
      width: 160,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#d61d6b',
    },
    buttonText: {
      color: '#d61d6b'
    },
    title: {
      color: 'white',
      fontSize: 30,
      paddingBottom: 10,
      fontWeight: 'bold',
    }
});

export default withNavigation(HomeScreenHero);
