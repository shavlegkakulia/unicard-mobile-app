import React from 'react';
import {Animated, StyleSheet, useWindowDimensions, View} from 'react-native';
import Colors from '../theme/Colors';
import AppButton from './AppButton';

export interface IMessagesWrapperProp {
  pageNumber: number;
  dotCount: number;
}

const Paginator: React.FC<IMessagesWrapperProp> = props => {
  const {pageNumber, dotCount} = props;

  const _dotCount = (dotCount * 20) / 4;
  const dots = [];
  for (let p = 0; p < _dotCount; p++) {
    dots.push(
      <View style={[styles.circle, pageNumber === p && styles.activeCircle]} />,
    );
  }
  return (
    <View style={{flexDirection: 'row', height: 64}}>{dots.map(el => el)}</View>
  );
};
export default Paginator;

const styles = StyleSheet.create({
  circle: {
    width: 4,
    height: 4,
    backgroundColor: Colors.orange,
    marginLeft: 6,
    borderRadius: 50,
  },
  activeCircle: {
    backgroundColor: Colors.black,
  },
});
