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

class DetailsView extends Component {

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
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => this.props.noneSelected()}>
            <Image source={require('./../images/close.png')} />
          </TouchableOpacity>
          {/* <Button onPress={() => this.props.noneSelected()} title={'CLOSE'} /> */}
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
            <TouchableOpacity
              style={styles.sections}
              onPress={() => { this.props.updateContact(this.props.person); }}>
              <Text>EDIT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sections}
              onPress={() => { this.props.deleteContact(this.props.person.uid); }}>
              <Text>DELETE</Text>
            </TouchableOpacity>
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
    top: 10,
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
  closeIcon: {
    position: 'absolute',
    top: 5,
    left: 295,
  },
  icon: {
    position: 'absolute',
    top: 15,
    left: 0,
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0)',
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
  editIcon: {
    color: '#26a6e4',
  },
  sections: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 10,
    width: 100,
  },
  deleteIcon: {
    color: '#e9a69a',
  },
  editDeleteArea: {
    flexDirection: 'row',
    paddingRight: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(211,211,211,0.3)',
    marginBottom: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    person: state.personSelected,
    toUpdate: state.toUpdate,
  };
};

export default connect(mapStateToProps, actions)(DetailsView);
