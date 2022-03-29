import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {ScreenNavigationProp} from '../../interfaces/commons';

const Barcode: React.FC<ScreenNavigationProp> = () => {
  return (
    <View style={styles.main}>
      <Image
        style={styles.img}
        source={require('../../assets/img/barcodeImg.png')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  img: {
    width: 343,
    height: 704,
  },
  main: {
    alignItems: 'center',
  },
});

export default Barcode;
