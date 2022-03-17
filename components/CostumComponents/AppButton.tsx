import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export interface IAppBtnProps {
  onPress: () => void;
  title: string;
  backgroundColor: string;
}

const AppButton: React.FC<IAppBtnProps> = props => {
  const {onPress, title, backgroundColor} = props;

  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={[styles.btnStyle, {backgroundColor: backgroundColor}]}
        onPress={onPress}>
        <Text style={styles.btnTitle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default AppButton;

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStyle: {
    width: 327,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  btnTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
