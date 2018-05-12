import React, { Component } from 'react';
import { ScrollView, Text, View, Image, Button, StatusBar } from 'react-native';

export default class DiscoverScreen extends Component {
  state = {
    data: ''
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
    // fetch('https://api.spotify.com/v1/search?q=stevie%20wonder&type=track', {
    //   method: 'GET',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer BQBkv20v2Am2WgtSClTLmmPJHeSjMsrw7JEq0Ft-Qje75Tg0cuCXCC7MINUvhGgspuv6t6-guI45dv8i6Or5DDIfvmtbSOT2o1x-rlcC5c184-6dGnedq-g_APvdaSsgF09m4irnFf6ELSU'
    //   },
    // })
    // .then((response) => response.json())
    //   .then((responseJson) => {
    //      console.log(responseJson);
         
    //      this.setState({
    //         data: responseJson
    //      })
    //   })
    //   .catch((error) => {
    //      console.error(error);
    //   });
   }

   componentWillUnmount() {
    this._navListener.remove();
  }


  render() {
    return (
      <ScrollView centerContent={true}>
        <Text>Discover!</Text>
        { this.state.data.tracks && this.state.data.tracks.items.map((item, index) => {
            return(
              <View key={item.id}>
                <Text>
                  {item.name}
                </Text>
                <Image style={{width: 250, height: 250}} source={{uri: item.album.images[0].url}}/>
                <Text>
                  {item.preview_url}
                  </Text>
            </View>
          )
        })}
      </ScrollView>
    );
  }
}