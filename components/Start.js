import React from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground } from 'react-native';

const image = require('../assets/Background_Image.png');

export default class Screen1 extends React.Component {
  constructor(props) {
    super(props);
    this.state= { name: '' };
    }

  render() {
    return (
    <ImageBackground source={image} style={styles.backGround}>
      <View style={styles.container}>
        <View style={styles.topScreen}> 
          <Text style={styles.appTitle}>Chatty</Text>
        </View>
          <View style={styles.outerBox}>
              <TextInput style={styles.textBox} 
                onChangeText={(name) => 
                  this.setState({name})}
                  value={this.state.name}
                  placeholder='Type username here'
                  placeholderTextColor='#757083'
                  />
              <Text>You put: {this.state.name}</Text>
              <View style={styles.colorContainer}>
                <Text style={styles.colorPallette}>
                  Choose Background Color:
                </Text>
                <View style={styles.pallette.palletteOne}></View>
                <View style={styles.pallette.palletteTwo}></View>
                <View style={styles.pallette.palletteThree}></View>
                <View style={styles.pallette.palletteFour}></View>
              </View>
              <Button style={styles.chatButton}
                title = "Start Chatting"
                onPress = {() => this.props.navigation.navigate('Chat', 
                { name: this.state.name })}
                />
          </View>
      </View>
    </ImageBackground>
    )
  }
}
const width_proportion = '88%'
const height_proportion = '44%'
const topHeight = '56%'
const bckgrndHeight = '100%'
const bckgrondWidth= '100%'

const styles = StyleSheet.create({
  container: {
    flex:1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 15
  },
  outerBox: { 
    width: width_proportion,
    height: height_proportion,
    backgroundColor: 'white', 
    padding: 20
  },
  topScreen: {
    width: width_proportion,
    height: topHeight
  },
  chatButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: '#757083',
    position: 'relative'
  },
  appTitle: {
    fontSize: 45, 
    fontWeight: '600', 
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20
  },
  textBox: {
    borderColor: 'gray', 
    borderWidth: 1, 
    fontSize: 16, 
    fontWeight: '300', 
    opacity: 50,
    position: 'relative',
    padding: 5,
    margin: 20
  },
  backGround: {
    width: bckgrondWidth,
    height: bckgrndHeight
  },
  colorPallette: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 100
  },
  colorContainer: {
    margin: 20
  },
  pallette: {
    width: 50,
    borderRadius: 50/2,
  },
  palletteOne: {
    backgroundColor: '#090c08'
  },
  palletteTwo: {
    backgroundColor: '#474056'
  },
  palletteThree: {
    backgroundColor: '#8A95A5'
  },
  palletteFour: {
    backgroundColor: '#B9C6AE'
  }
});
