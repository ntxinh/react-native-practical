import React from 'react';

import {
  StyleSheet,
  ScrollView
} from 'react-native';

import ColorButton from './ColorButton';

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      backgroundColor: 'blue'
    };
    this.changeColor = this.changeColor.bind(this);
  }

  changeColor (backgroundColor) {
    this.setState({ backgroundColor });
  }

  render () {
    const { backgroundColor } = this.state;
    return (
      <ScrollView style={[styles.container, { backgroundColor }]}>

        <ColorButton backgroundColor='red' onSelect={this.changeColor} />
        <ColorButton backgroundColor='blue' onSelect={this.changeColor} />
        <ColorButton backgroundColor='green' onSelect={this.changeColor} />
        <ColorButton backgroundColor='salmon' onSelect={this.changeColor} />
        <ColorButton backgroundColor='#00FF00' onSelect={this.changeColor} />
        <ColorButton backgroundColor='rgb(255,0,255)' onSelect={this.changeColor} />

        {/* Repeat to use ScrollView */}
        <ColorButton backgroundColor='red' onSelect={this.changeColor} />
        <ColorButton backgroundColor='blue' onSelect={this.changeColor} />
        <ColorButton backgroundColor='green' onSelect={this.changeColor} />
        <ColorButton backgroundColor='salmon' onSelect={this.changeColor} />
        <ColorButton backgroundColor='#00FF00' onSelect={this.changeColor} />
        <ColorButton backgroundColor='rgb(255,0,255)' onSelect={this.changeColor} />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});

export default App;
