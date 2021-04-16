import React from 'react';
import { View, Text, Button } from 'react-native';

export default class Screen1 extends React.Component {
  render() {
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Hello! Welcome to the Chat!</Text>
        <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} 
          onChangeText={(name) => 
          this.setState({name})}
          value={this.state.name}
          placeholder='Type username here'
        />
        <Button 
          title = "Go to Chatroom"
          onPress = {() => this.props.navigation.navigate('Chat', 
          { name: this.state.name })}
        />
        <Text>You put: {this.state.name}</Text>
      </View>
    )
  }
}