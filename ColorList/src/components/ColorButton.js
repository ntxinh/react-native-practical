import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';

const ColorButton = ({ backgroundColor, onSelect = f => f }) => (
  <TouchableHighlight style={styles.button} onPress={() => onSelect(backgroundColor)} underlayColor='orange'>

    <View style={styles.row}>
      <View style={[styles.sample, { backgroundColor }]} />
      <Text style={styles.text}>{backgroundColor}</Text>
    </View>

  </TouchableHighlight>
);

ColorButton.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255,255,255,.8)'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  sample: {
    height: 20,
    width: 20,
    borderRadius: 10,
    margin: 5,
    backgroundColor: 'white'
  },
  text: {
    fontSize: 30,
    margin: 5
  }
});

export default ColorButton;
