import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Button,
} from 'react-native';
import { connect } from 'react-redux';

import * as actions from './../actions'

class PeopleDetail extends Component {

  handleClick = (link) => {
    Linking.canOpenURL(link)
      .then((supported) => {
        if (supported) {
          Linking.openURL(link);
        } else {
          console.log('Don\'t know how to open URI:', link);
        }
      });
  }

  render () {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Image
            source={require('./../images/background.jpg')}
            style={styles.image}
          />
          <Text style={styles.title1} onPress={() => this.props.noneSelected()}>CLOSE</Text>
          {/* <Button onPress={() => this.props.noneSelected()} title='CLOSE' />; */}
          <Text style={styles.title1}>{this.props.person.first_name} {this.props.person.last_name}</Text>
          <Text style={styles.title2}>from {this.props.person.company}</Text>
          <View style={styles.textArea}>
            <Text>Phone: {this.props.person.phone}</Text>
          </View>
          <View style={styles.textArea}>
            <Text>Email: {this.props.person.email}</Text>
          </View>
          <View style={styles.textArea}>
            <Text>Assignment: {this.props.person.project}</Text>
          </View>
          <View style={styles.textArea}>
            <Text>Mode Edit:{this.props.person.notes}</Text>
          </View>
          <View style={styles.actionArea}>
            <TouchableOpacity onPress={() => { this.handleClick(`tel:${this.props.person.phone}`); }}>
              <Image
                style={styles.actionImage}
                source={require('./../images/call.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.handleClick(`sms:${this.props.person.phone}`); }}>
              <Image
                style={styles.actionImage}
                source={require('./../images/sms.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.handleClick(`mailto:${this.props.person.email}`); }}>
              <Image
                style={styles.actionImage}
                source={require('./../images/email.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.actionArea}>
            <Text>Call</Text>
            <Text>SMS</Text>
            <Text>Email</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    paddingBottom: 20,
    marginBottom: 20,
    borderColor: 'lightgrey',
    borderWidth: 0.5,
  },
  title1: {
    top: 10,
    left: 80,
    fontSize: 24,
  },
  title2: {
    top: 35,
    left: 82,
    fontSize: 18,
  },
  image: {
    flex: 0,
    height: 100,
    width: 333,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textArea: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingTop: 10,
    width: 260,
  },
  textIcons: {
    color: '#26a69a',
  },
  actionArea: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    person: state.personSelected,
  };
};

export default connect(mapStateToProps, actions)(PeopleDetail);
