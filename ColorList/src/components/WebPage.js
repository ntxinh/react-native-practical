import React from 'react';

import {
  WebView,
  StyleSheet
} from 'react-native';

const WebPage = ({ navigation }) => (
  <WebView style={styles.container}
    source={navigation.state.params}
    contentInset={{ top: -650 }} />
  // <WebView style={styles.container}
  //   source={{ uri: 'https://github.com' }} />
);

WebPage.navigationOptions = {
  title: 'All Colors'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default WebPage;
