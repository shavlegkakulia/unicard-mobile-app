import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Colors from '../../theme/Colors';

export interface IMessagesWrapperProp {
  onPress: () => void;
  title: string;
  backgroundColor: string;
  image?: any;
}

const NotFound: React.FC<IMessagesWrapperProp> = props => {
  const {image, title, backgroundColor} = props;

  return (
    <>
      <View style={styles.main}>
        <View style={[styles.raund, {backgroundColor: backgroundColor}]}>
          <Image source={image} />
        </View>
        <View style={styles.txtView}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </View>
    </>
  );
};
export default NotFound;

const styles = StyleSheet.create({
  main: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  raund: {
    width: 64,
    height: 64,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '400',
    color: Colors.darkGrey,
    textAlign: 'center',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 24,
  },
  txtView: {
    marginTop: 38,
    width: 250,
  },
});
