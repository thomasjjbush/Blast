import React, { Component } from 'react';
import { Animated, Easing, View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

const universe = require('../../../assets/img/universe.jpg');
const man = require('../../../assets/img/man.png');

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: 200,
    overflow: 'hidden',
    marginBottom: 10,
  },
  hero: {
    position: 'absolute',
    top: -100,
    width: Dimensions.get('window').width * 2,
    height: 600,
    alignSelf: 'center',
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
    marginTop: 50,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    width: 160,
    borderRadius: 5,
    borderColor: '#d61d6b',
  },
  buttonText: {
    color: '#d61d6b',
  },
  title: {
    color: 'white',
    fontSize: 30,
    paddingBottom: 10,
    fontWeight: 'bold',
  },
});
class HomeScreenHero extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.state = {
      spinValue: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.spin();
  }
  onPress() {
    this.props.navigation.navigate('Discover');
  }
  spin() {
    Animated.loop(Animated.timing(
      this.state.spinValue,
      {
        toValue: 1,
        duration: 250000,
        easing: Easing.linear,
        useNativeDriver: true,
      },
    )).start();
  }
  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <View style={styles.container}>
        <Animated.Image
          style={[styles.hero, { transform: [{ rotate: spin }] }]}
          source={universe}
        />
        <Image
          style={styles.manOverlay}
          source={man}
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

export default withNavigation(HomeScreenHero);
