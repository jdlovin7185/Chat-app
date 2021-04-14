import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Screen1 from './components/Screen1';
import Screen2 from './components/Screen2';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  Text, 
  Button, 
  Alert,
  ScrollView 
} from 'react-native';

const Stack = createStackNavigator();

export default class HelloWorld extends React.Component {
  constructor(props) {
  super(props);
  this.state= { text: '' };
  }

  alertMyText (input = []) {
    Alert.alert(input.text);
  }

  render () {
  return (
    <NavigationContainer>
     <Stack.Navigator 
     initialRouteName="Screen1"
     >
      <Stack.Screen 
        name="Screen1"
        component={Screen1}
      />
      <Stack.Screen 
        name="Screen2"
        component={Screen2}
      />
     </Stack.Navigator>
  </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  
});
