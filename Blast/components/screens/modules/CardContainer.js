import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import Data from '../../../data/data.json';
import SwipeCard from './SwipeCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMoreCards: {
    color: '#d61d6b',
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    };
    this.handleYup = this.handleYup.bind(this);
  }

  componentWillMount() {
    this.setState({ cards: Data.cards });
  }

  onEnd() {
    return (
      <Text style={styles.noMoreCards}>Thats all folks!</Text>
    );
  }

  handleYup(card) {
    this.props.onSwipeRight(card);
  }

  render() {
    return (
      <View style={styles.container}>
        <SwipeCards
          cards={this.state.cards}
          renderCard={cardData => <SwipeCard {...cardData} />}
          renderNoMoreCards={this.onEnd}
          handleYup={this.handleYup}
          handleNope={this.handleNope}
          showYup={false}
          showNope={false}
        />
      </View>
    );
  }
}
