import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';


export default class AddPerson extends Component {

  static navigationOptions = {
    tabBarLabel: 'Add Person',
  };

  render () {
    return (
      <View style={styles.container}>
        <Text>Add person</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    paddingTop: 20,
    backgroundColor: '#e5e5e5'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 10,
  },
  icon: {
    paddingTop: 2,
  },
});
