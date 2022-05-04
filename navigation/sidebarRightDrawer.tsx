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
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.mainText}>კატალოგი</Text>
      </View>
    </ScrollView>
  );
};

export default SidebarRightDrawer;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    borderBottomLeftRadius: 40,
    borderTopLeftRadius: 40,
    paddingHorizontal: 34,
    backgroundColor: Colors.bgGreen,
  },
  main: {
    marginTop: 61,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 14,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
    color: Colors.white,
  },
});
