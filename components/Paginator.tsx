import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Colors from '../theme/Colors';

export interface IMessagesWrapperProp {
  pageNumber: number;
  dotCount: number;
}

const Paginator: React.FC<IMessagesWrapperProp> = props => {
  const [length, setLength] = useState<number[]>([]);
  const {pageNumber, dotCount} = props;

  console.log(dotCount);
  useEffect(() => {
    if (!dotCount) {
      return;
    }
    setLength([...Array(dotCount).keys()].map(() => 0));
  }, [dotCount]);

  const dots = length.map((_, i) => (
    <View
      key={i}
      style={[styles.circle, pageNumber === i && styles.activeCircle]}
    />
  ));

  return <View style={{flexDirection: 'row', height: 64}}>{dots}</View>;
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
