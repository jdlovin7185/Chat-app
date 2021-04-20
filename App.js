import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Start from './components/Start';
import Chat from './components/Chat';
import {  
  Alert,
  FlatList
} from 'react-native';

const firebase = require('firebase');
require('firebase/firestore');

const Stack = createStackNavigator();

export default class HelloWorld extends React.Component {
  constructor() {
    super();
    this.state = {
      lists: []
    };
    if (!firebase.apps.length) {
      firebase.initializeApp({
      apiKey: "AIzaSyA6Nir3fe8XKkgApAw99eXphk1n-CZ8Zbo",
      authDomain: "chatty-385eb.firebaseapp.com",
      projectId: "chatty-385eb",
      storageBucket: "chatty-385eb.appspot.com",
      messagingSenderId: "731287727870",
      appId: "1:731287727870:web:646f0d6d8bdb0a987effaf",
      measurementId: "G-0ZTFYX1BMR"
    });
    }
    this.referenceShoppingLists = 
    firebase.firestore().collection('shoppinglists').doc('list2');
  };
  
  componentDidMount() {
    this.referenceShoppingLists = firebase.firestore().collection('shoppinglists');
    this.unsubscribe = this.referenceShoppingLists.onSnapshot(this.onCollectionUpdate)
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const lists = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      var data = doc.data();
      lists.push({
        name: data.name,
        items: data.items.toString(),
      });
    });
    this.setState({
      lists,
    });
  };

  addList() {
    this.referenceShoppingLists.add({
      name: 'TestList',
      items: ['eggs', 'pasta', 'veggies'],
    });
  }


  alertMyText (input = []) {
    Alert.alert(input.text);
  }

  render () {
  return (
    <NavigationContainer>
     <Stack.Navigator 
     initialRouteName="Start"
     >
      <Stack.Screen 
        name="Start"
        component={Start}
      />
      <Stack.Screen 
        name="Chat"
        component={Chat}
      />
     </Stack.Navigator>
  </NavigationContainer>
    );
  }
}

