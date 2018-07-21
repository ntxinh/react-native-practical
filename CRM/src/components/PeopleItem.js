import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';

import * as actions from './../actions';

const PeopleItem = (props) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => props.selectPerson(props.people)}
    >
      <View style={styles.card}>
        <Image style={styles.image} source={require('./../images/background.jpg')} />
        <Text style={styles.title}>{props.people.first_name} {props.people.last_name}</Text>
        <Text style={styles.action}>{props.people.company}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
  },
  image: {
    height: 100,
  },
  action: {
    backgroundColor: 'black',
    color: 'white',
  },
  icon: {
    position: 'absolute',
    top: 15,
    left: 0,
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0)',
  },
});

export default connect(null, actions)(PeopleItem);
