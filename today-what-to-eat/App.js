import React, { Component } from "react";
import { View, FlatList } from "react-native";
import {
  Header,
  Button,
  ThemeProvider,
  ListItem,
  Input,
  ButtonGroup
} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import * as firebase from "firebase";
import { Keyboard } from "react-native";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID
} from "react-native-dotenv";

// Firebase config
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID
};
firebase.initializeApp(firebaseConfig);

let data = [];

export default class App extends Component {
  constructor(props) {
    super(props);
    console.log("----- constructor -----");

    this.input = React.createRef();

    this.state = {
      list: data,
      newItem: "",
      openForm: false,
      quantity: 0
    };
  }

  componentDidMount() {
    console.log("----- componentDidMount -----");

    var that = this;
    firebase
      .database()
      .ref("menu")
      .on(
        "value",
        function(snapshot) {
          let result = snapshot.val();
          that.setState({
            list: result,
            quantity: !!result ? Object.keys(result).length : 1
          });
        },
        function(errorObject) {
          console.log("The read failed: " + errorObject.code);
        }
      );
  }

  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  choose = () => {
    const randomIndex = this.getRandomInt(1, this.state.quantity);

    var ref = firebase.database().ref("menu");

    ref
      .limitToFirst(randomIndex)
      .once("value")
      .then(snapshot => {
        this.setState({ list: snapshot.val() });
      });
  };

  reload = () => {
    var that = this;
    firebase
      .database()
      .ref("menu")
      .once(
        "value",
        function(snapshot) {
          let result = snapshot.val();
          that.setState({
            list: result,
            quantity: !!result ? Object.keys(result).length : 1
          });
        },
        function(errorObject) {
          console.log("The read failed: " + errorObject.code);
        }
      );
  };

  add = newItem => {
    var key = firebase
      .database()
      .ref("menu")
      .push().key;
    firebase
      .database()
      .ref("menu")
      .child(key)
      .set({
        name: newItem,
        avatar_url: "http://lorempixel.com/200/200/food/"
      });
    this.setState({ newItem: "" });
    this.input.current.clear();
    Keyboard.dismiss();
  };

  remove = async key => {
    await firebase
      .database()
      .ref("menu/" + key)
      .set(null);
  };

  _FlatListData = data =>
    // data recieved from firebase is (collection) an object with individual tasks
    // as separate objects with firebase-defined-id as the key and actual task object as value
    // Object.entries breaks down the collection into an array of arrays with 2 elements each
    // [0] as the key and [1] as value which is then mapped to get an array of objects combining
    // the data and the key value into a single object
    Object.entries(data)
      .map(d => {
        return { ...d[1], key: d[0] };
      })
      .reverse();

  handleClick = selectedIndex => {
    switch (selectedIndex) {
      case 0:
        this.choose();
        break;
      case 1:
        this.reload();
        break;
      case 2:
        this.setState({ openForm: !this.state.openForm });
        break;
      default:
        break;
    }
  };

  render() {
    const buttons = ["Choose", "Reload", "Form"];
    const { selectedIndex } = this.state;
    return (
      <ThemeProvider>
        <Header
          placement="left"
          backgroundColor="#ff6666"
          leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{
            text: "TODAY WHAT TO EAT?",
            style: { color: "#fff" }
          }}
        />

        <ButtonGroup
          onPress={selectedIndex => this.handleClick(selectedIndex)}
          selectedIndex={selectedIndex}
          buttons={buttons}
        />

        {!!this.state.openForm && (
          <View>
            <Input
              ref={this.input}
              placeholder="Add a menu..."
              onChangeText={newItem => this.setState({ newItem })}
            />
            <Button
              title="Add"
              buttonStyle={{ backgroundColor: "#ffcc00" }}
              onPress={() => this.add(this.state.newItem)}
            />
          </View>
        )}

        <View>
          {/* render FlatList only if state.tasks is !empty*/}
          {!!this.state.list && (
            <FlatList
              /* Since the data fetched from firebase is not an array but an 
              object it needs to be converted into a workable array first */
              data={this._FlatListData(this.state.list)}
              renderItem={({ item }) => (
                <ListItem
                  title={item.name}
                  leftAvatar={{ source: { uri: item.avatar_url } }}
                  bottomDivider
                  rightElement={
                    <Button
                      buttonStyle={{ backgroundColor: "#cc0066" }}
                      icon={<Icon name="trash" size={15} color="white" />}
                      onPress={() => this.remove(item.key)}
                    />
                  }
                />
              )}
              keyExtractor={item => item.key.toString()}
            />
          )}
        </View>
      </ThemeProvider>
    );
  }
}
