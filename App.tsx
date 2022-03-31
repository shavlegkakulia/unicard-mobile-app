/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {LogBox, StyleSheet, View} from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import Navigation from './navigation/navigation';
import store from './Store';
import SplashScreen from 'react-native-splash-screen';
import Colors from './theme/Colors';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <View style={styles.container}>
       <StatusBar barStyle={'light-content'} />
      <Provider store={store}>
        <Navigation />
      </Provider>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});