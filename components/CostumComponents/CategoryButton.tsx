import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Colors from '../../theme/Colors';

export interface ICatBtnProps {
  onPress: () => void;
  title: string | undefined;
}

const CategoryButton: React.FC<ICatBtnProps> = props => {
  const {onPress, title} = props;

  return (
    <TouchableOpacity style={[styles.btnStyle]} onPress={onPress}>
      <Text style={styles.btnTitle}>{title}</Text>
    </TouchableOpacity>
  );
};
export default CategoryButton;

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: Colors.bgGreenLight,
    height: 35,
    width: 265,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTitle: {
    fontSize: 10,
    color: Colors.white,
    lineHeight: 14.4,
    fontFamily: 'BPG DejaVu Sans Mt',
  },
});
