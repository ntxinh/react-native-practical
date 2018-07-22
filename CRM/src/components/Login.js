import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';
import firebase from 'firebase';

import Loader from './Loader';

export default class App extends Component {

  state = {
    email: '',
    password: '',
    loading: false,
  }

  onButtonPress () {
    const { email, password } = this.state;
    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onAuthSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onAuthSuccess.bind(this))
          .catch(this.onAuthFailed.bind(this));
      });
  }

  onAuthSuccess () {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false,
    });
  }

  onAuthFailed () {
    this.setState({
      error: 'Authentication failed',
      loading: false,
    });
  }

  renderLoader () {
    if (this.state.loading) {
      return <Loader size='large' />;
    } else {
      return <Button
        onPress={this.onButtonPress.bind(this)}
        title='LOGIN' />;
    }
  }

  render () {
    const { container, welcome, fieldStyles, loginButtonArea, errorMessage } = styles;
    return (
      <View style={container}>
        <Text style={welcome}>Welcome to the CRM!</Text>
        <TextInput
          style={fieldStyles}
          onChangeText={(email) => this.setState({ email })}
          placeholder={'Email...'} />
        <TextInput
          style={fieldStyles}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password...'} />
        <Text style={errorMessage}>{this.state.error}</Text>
        <View style={loginButtonArea}>
          {this.renderLoader()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  // form: {
  //   paddingBottom: 10,
  //   width: 200,
  // },
  fieldStyles: {
    height: 40,
    color: 'black',
    width: 200,
  },
  loginButtonArea: {
    marginTop: 20,
  },
  errorMessage: {
    marginTop: 15,
    fontSize: 15,
    color: 'red',
    alignSelf: 'center',
  },
});
