import React from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';

const firebase = require('firebase');
require('firebase/firestore');
require('firebase/auth');

export default class Screen2 extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: '',
      uid: '',
      isConnected: true
    };
// to get entry into the data base
    const firebaseConfig = {
      apiKey: "AIzaSyAhsnNVYW1Q7SLxej_YotqhWZw1jwtCuSY",
      authDomain: "meet-app-da2c9.firebaseapp.com",
      projectId: "meet-app-da2c9",
      storageBucket: "meet-app-da2c9.appspot.com",
      messagingSenderId: "316391670730",
      appId: "1:316391670730:web:f1a0c326742b3a421bc533",
      measurementId: "G-RTQF5PMVMG"
    }
    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }
    this.referenceChatMessages = firebase.firestore().collection('messages');
  };
  
  componentDidMount() {
    this.getMessages();
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
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        console.log('online');
      } else {
        console.log('offline');
      }
    });
    
  }

  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  componentWillUnmount() {

    this.authUnsubscribe();
  }
  // create a reference to the active user's documents ()
  onAuthStateChanged() {
    this.referenceChatMessagesUser = 
    firebase.firestore().collection('messages').where("uid", "==", this.state.uid);
  }

  // collects data in database in real-time
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
  
  // Adds messages to database
  addMessages() {
    const messages = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: messages._id,
      text: messages.text,
      createdAt: messages.createdAt,
      user: messages.user
    });
  }

  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }
  
  // Keeps messages in the chat 
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
    () => {
      this.addMessages();
      this.saveMessages();
    });
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

  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return(
        <InputToolbar
        {...props}
        />
      );
    }
  }
// where user can chat
  render() {
    return (
      <View style={{ flex: 1 }}>
         <GiftedChat 
         renderBubble={this.renderBubble.bind(this)}
         renderInputToolbar={this.renderInputToolbar.bind(this)}
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={ {_id: 1}
            }
          />
      </View>
    )
  }
}

