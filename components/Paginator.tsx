import React from 'react';
import {Animated, StyleSheet, useWindowDimensions, View} from 'react-native';
import Colors from '../theme/Colors';
import AppButton from './AppButton';

export interface IMessagesWrapperProp {
  data: any;
  scrollX: any;
}

const Paginator: React.FC<IMessagesWrapperProp> = props => {
  const {data, scrollX} = props;

  const {width} = useWindowDimensions();

  return (
    <View style={{flexDirection: 'row', height: 64}}>
      {data?.map((_: any, i: any) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [5, 5, 5],
          //   extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
        });
        return (
          <Animated.View
            style={[styles.circle, {width: dotWidth, opacity}]}
            key={i.toString()}
          />
        );
      })}
    </View>
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
});
