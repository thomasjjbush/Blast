import React, { Component } from 'react';
import { Platform, StatusBar, View, StyleSheet, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';

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
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
  }
  componentDidMount() {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  onChangeText(text) {
    // filter da tings based on da text
    console.log(this.props.likedCards, text);
  }

  renderGridItem(card) {
    const { item } = card;
    return <LikedCard onPress={this.setModal} key={item.key} card={item} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SearchBar
          cancelButtonTitle="Cancel"
          clearButtonMode="while-editing"
          lightTheme
          onChangeText={this.onChangeText}
          onClear={() => { console.log('yo'); }}
          placeholder="Search..."
          platform={Platform.OS}
          ref={(search) => { this.search = search; }}
          round
          searchIcon={{ size: 24 }}
          containerStyle={{ backgroundColor: 'rgba(0,0,0,0)' }}
        />
        <FlatList
          contentContainerStyle={styles.list}
          data={this.props.likedCards}
          renderItem={this.renderGridItem}
        />);
      </View>
    );
  }
}
