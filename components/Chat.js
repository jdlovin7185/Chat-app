import React from 'react';
import { View, Text } from 'react-native';

export default class Screen2 extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      color: ''
    }
    };

  render() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: {this.state.color}}}>
        <Text>Hello, welcome to the View</Text>
      </View>
    )
  }
}