import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from './../actions';

class UpdatePerson extends Component {

  static navigationOptions = {
    tabBarLabel: 'Add Person',
  };

  onUpdatePresss () {
    const { first_name, last_name, phone, email, company, project, notes, uid } = this.props;

    this.props.saveContact({ first_name, last_name, phone, email, company, project, notes, uid });
  }

  render () {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Text style={styles.title}>Update contact</Text>
          <Text>First Name:</Text>
          <TextInput style={styles.fieldStyles}
            placeholder={'First name...'}
            value={this.props.first_name}
            onChangeText={(value) => this.props.formUpdate({ prop: 'first_name', value })}
          />
          <Text>Last Name:</Text>
          <TextInput style={styles.fieldStyles}
            placeholder={'Last name...'}
            value={this.props.last_name}
            onChangeText={(value) => this.props.formUpdate({ prop: 'last_name', value })}
          />
          <Text>Phone Number:</Text>
          <TextInput style={styles.fieldStyles}
            placeholder={'Phone number...'}
            value={this.props.phone}
            onChangeText={(value) => this.props.formUpdate({ prop: 'phone', value })}
          />
          <Text>Company:</Text>
          <TextInput style={styles.fieldStyles}
            placeholder={'Company...'}
            value={this.props.company}
            onChangeText={(value) => this.props.formUpdate({ prop: 'company', value })}
          />
          <Text>Project:</Text>
          <TextInput style={styles.fieldStyles}
            placeholder={'Project...'}
            value={this.props.project}
            onChangeText={(value) => this.props.formUpdate({ prop: 'project', value })}
          />
          <Text>Notes:</Text>
          <TextInput style={styles.fieldStyles}
            placeholder={'Notes...'}
            value={this.props.notes}
            onChangeText={(value) => this.props.formUpdate({ prop: 'notes', value })}
          />
          <View style={styles.update}>
            <Button title={'UPDATE'} onPress={this.onUpdatePresss.bind(this)} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    paddingTop: 50,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
  },
  fieldStyles: {
    height: 40,
    color: 'orange',
  },
  addButton: {
    marginTop: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
  },
  update: {
    marginTop: 30,
  },
});

const mapStateToProps = (state) => {
  const { first_name, last_name, phone, email, company, project, notes, uid } = state;
  return { first_name, last_name, phone, email, company, project, notes, uid };
};

export default connect(mapStateToProps, actions)(UpdatePerson);
