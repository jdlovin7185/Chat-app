import React from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const firebase = require('firebase');
require('firebase/firestore');

export default class Screen2 extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
    if (!firebase.apps.length){
      firebase.initializeApp({
        apiKey: "AIzaSyAhsnNVYW1Q7SLxej_YotqhWZw1jwtCuSY",
        authDomain: "meet-app-da2c9.firebaseapp.com",
        projectId: "meet-app-da2c9",
        storageBucket: "meet-app-da2c9.appspot.com",
        messagingSenderId: "316391670730",
        appId: "1:316391670730:web:f1a0c326742b3a421bc533",
        measurementId: "G-RTQF5PMVMG"
      });
    }
    this.referenceChatMessages = firebase.firestore().collection("messages");
  };
  
  componentDidMount() {
    this.referenceChatMessages = firebase.firestore().collection('messages');
    
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async(user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
      
      // update user state with currently active user data
      this.setState({
        uid: user.uid,
        messages: [],
      });
      this.unsubscribe = this.referenceChatMessages
      .orderBy("createdAt", "desc")
      .onSnapshot(this.onCollectionUpdate);
    });
    
  }
  
  componentWillUnmount() {
    this.unsubscribe();
  }
  // create a reference to the active user's documents ()
  onAuthStateChanged() {
    this.referenceChatMessagesUser = 
    firebase.firestore().collection('messages').where("uid", "==", this.state.uid);
  }

  
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        createdAt: data.createdAt.toDate(), 
        text: data.text,
        user: data.user
      });
    });
    this.setState({
      messages,
    });
  };
  
  addMessages() {
    this.referenceChatMessages.add({
      _id: messages._id,
      text: messages.text,
      createdAt: messages.createdAt,
      user: message.user
    });
  }
  
  // Keeps messages in the chat 
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }
  

  // Styles the chat bubble on the right side
  renderBubble(props) {
    return (
      <Bubble 
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#000'
        }
      }}
      />
      )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
         <GiftedChat 
         renderBubble={this.renderBubble.bind(this)}
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={ {_id: 1}
            }
          />
      </View>
    )
  }
}

