import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Colors from '../../theme/Colors';
import AppButton from './AppButton';

export interface IMessagesWrapperProp {
  onPress: () => void;
  title: string;
  backgroundColor: string;
  image?: any;
}

const MessagesWrapper: React.FC<IMessagesWrapperProp> = props => {
  const {image, onPress, title, backgroundColor} = props;

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
      <View style={styles.btn}>
        <AppButton
          onPress={onPress}
          title={'დახურვა'}
          backgroundColor={Colors.lightOrange}
        />
      </View>
    </>
  );
};
export default MessagesWrapper;

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
  btn: {
    flex: 1,
  },
});
