import React, { Component } from 'react';
import { StatusBar, View, StyleSheet, FlatList } from 'react-native';

// import MoreInfoModal from './modules/MoreInfoModal';
import LikedCard from './modules/LikedCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  item: {
    backgroundColor: 'red',
    margin: 3,
    width: 100,
  },
});

export default class LikesScreen extends Component {
  componentDidMount() {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }
  componentWillUnmount() {
    this.navListener.remove();
  }
  renderGridItem(card) {
    const { item } = card;
    return <LikedCard onPress={this.setModal} key={item.key} card={item} />;
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <FlatList
          contentContainerStyle={styles.list}
          data={this.props.likedCards}
          renderItem={this.renderGridItem}
        />);
      </View>
    );
  }
}
