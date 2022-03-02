/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import { LogBox, StyleSheet } from 'react-native';

 LogBox.ignoreLogs([
   "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
 ]);

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Provider } from 'react-redux'
import Navigation from './navigation/navigation';
import store from './Store';

const App = () => {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <Provider store={store}>
        <Navigation />
      </Provider>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  }
});
