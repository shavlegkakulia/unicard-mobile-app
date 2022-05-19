import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import AppButton from '../../components/CostumComponents/AppButton';
import AppTextInput from '../../components/CostumComponents/AppTextInput';

import {ScreenNavigationProp} from '../../interfaces/commons';
import {authRoutes} from '../../navigation/routes';

import Colors from '../../theme/Colors';

const SearchScreen: React.FC<ScreenNavigationProp> = props => {
  const icon = require('../../assets/img/searchSmallGreen.png');
  return (
    <>
      <KeyboardAvoidingView style={styles.center}>
        <AppTextInput placeholder="ძებნა" icon={icon} onChange={() => {}} />
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
});

export default SearchScreen;
