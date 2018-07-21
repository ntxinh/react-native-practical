import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Login from './Login';
import Navigation from './Navigation';
import Loader from './Loader';
import reducers from './../reducers/PeopleReducer';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default class App extends Component {

  state = { loggedIn: null };

  UNSAFE_componentWillMount () {
    firebase.initializeApp({
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderInitialView () {
    switch (this.state.loggedIn) {
      case true:
        return <Navigation />;
      case false:
        return <Login />;
      default:
        return <Loader size='large' />;
    }
  }

  render () {
    return (
      <Provider store={store}>
        {/* <View style={styles.container}> */}
          {this.renderInitialView()}
        {/* </View> */}
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
