import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {ScreenNavigationProp} from '../interfaces/commons';

import {useNavigation} from '@react-navigation/native';
import Colors from '../theme/Colors';


const SidebarRightDrawer: React.FC<ScreenNavigationProp> = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <Text>ragac</Text>
    </View>
  );
};

export default SidebarRightDrawer;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: Colors.lightOrange,
        borderBottomRightRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 34,
      },
});
