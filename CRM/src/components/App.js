import React, { Component } from 'react';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import Config from './../../app.json';
import Login from './Login';
import Navigation from './Navigation';
import Loader from './Loader';
import reducers from './../reducers/PeopleReducer';
import Thunk from 'redux-thunk';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(Thunk));

export default class App extends Component {

  state = { loggedIn: null };

  UNSAFE_componentWillMount () {
    firebase.initializeApp({
      apiKey: Config.apiKey,
      authDomain: Config.authDomain,
      databaseURL: Config.databaseURL,
      projectId: Config.projectId,
      storageBucket: Config.storageBucket,
      messagingSenderId: Config.messagingSenderId,
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
        {this.renderInitialView()}
      </Provider>
    );
  }
}
