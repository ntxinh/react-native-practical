// eslint-disable-next-line
import React from 'react';

import { StackNavigator } from 'react-navigation';

import ColorList from './ColorList';
import ColorInfo from './ColorInfo';
import Webpage from './WebPage';

const App = StackNavigator({
  Home: { screen: ColorList },
  Details: { screen: ColorInfo },
  Web: { screen: Webpage },
});

export default App;
