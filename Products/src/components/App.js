import React from 'react';

import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  Dimensions,
} from 'react-native';

export default class App extends React.Component {
  constructor () {
    super();
    this.state = {
      productImages: [],
      fetching: false,
    };
  }

  componentDidMount () {
    this.setState({ fetching: true });
    fetch('https://hplussport.com/api/products.php')
      .then(response => response.json())
      .then(products => products.map(product => product.image))
      .then(productImages => this.setState({
        productImages,
        fetching: false
      }))
      .catch(err => console.error('error fetching products', err))
  }

  render () {
    return (
      <ScrollView horizontal={true}>
        <ActivityIndicator size='large'
          animating={this.state.fetching} />
        {this.state.productImages.map((uri, i) => (
          <Image style={styles.thumb} key={i} source={{ uri }} />
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  spinner: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  thumb: {
    width: 375,
    resizeMode: 'cover'
  }
});
