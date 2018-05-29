import React, { Component } from 'react';
import { Modal, Text, View, TouchableHighlight } from 'react-native';

export default class MoreInfoModal extends Component {
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.check}
        onRequestClose={() => {
            console.log('Modal has been closed.');
          }}
      >
        <View style={{ marginTop: 22 }}>
          <View>
            <Text>Hello World!</Text>
            <TouchableHighlight onPress={this.props.toggle} >
              <Text>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}
