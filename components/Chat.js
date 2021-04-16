import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
    let color = this.props.route.params.color;
    this.props.navigation.setOptions({ title: name, backgroundColor: color });
    return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: color}}>
          <Text>Hello, welcome to the View</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({

});
