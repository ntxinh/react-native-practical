import React from 'react';

import {
  StyleSheet,
  ListView
} from 'react-native';

import ColorButton from './ColorButton';
import ColorForm from './ColorForm';

class App extends React.Component {
  constructor () {
    super();

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    const availableColors = ['red', 'green', 'yellow'];

    this.state = {
      backgroundColor: 'blue',
      availableColors,
      dataSource: this.ds.cloneWithRows(availableColors)
    };
    this.changeColor = this.changeColor.bind(this);
    this.newColor = this.newColor.bind(this);
  }

  changeColor (backgroundColor) {
    this.setState({ backgroundColor });
  }

  newColor (color) {
    const availableColors = [
      ...this.state.availableColors,
      color
    ];
    this.setState({
      availableColors,
      dataSource: this.ds.cloneWithRows(availableColors)
    });
  }

  render () {
    const { backgroundColor, dataSource } = this.state;
    return (
      <ListView style={[styles.container, { backgroundColor }]}
        dataSource={dataSource}
        renderRow={(color) => (
          <ColorButton backgroundColor={color} onSelect={this.changeColor} />
        )}
        renderHeader={() => (
          <ColorForm onNewColor={this.newColor} />
        )}
      >

      </ListView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'lightgrey',
    paddingTop: 20,
    padding: 10,
    fontSize: 30,
    textAlign: 'center'
  }
});

export default App;
