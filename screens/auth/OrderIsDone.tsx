import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import { useSelector } from 'react-redux';
import AppButton from '../../components/CostumComponents/AppButton';

import {ScreenNavigationProp} from '../../interfaces/commons';
import { authRoutes } from '../../navigation/routes';
import { ITranslateReducer, ITranslateState } from '../../Store/types/translate';

import Colors from '../../theme/Colors';

const OrderIsDone: React.FC<ScreenNavigationProp> = props => {
  const translate = useSelector<ITranslateReducer>(state => state.TranslateReducer) as ITranslateState;

  return (
    <>
      <View style={styles.main}>
        <View style={styles.raund}>
          <Image source={require('../../assets/img/doneIcon.png')} />
        </View>
        <View style={styles.imageView}>
          <Image
            style={styles.img}
            source={require('../../assets/img/order.png')}
          />
        </View>
        <View style={styles.textView}>
          <Text style={styles.text}>{translate.t('orders.orderAccepted')}</Text>
        </View>
      </View>
      <View style={styles.buttonView}>
        <AppButton
          onPress={() => props.navigation.navigate(authRoutes.home)}
          title={translate.t('common.continue')}
          backgroundColor={Colors.bgGreen}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  raund: {
    width: 64,
    height: 64,
    backgroundColor: Colors.bgGreen,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView: {
    marginTop: 35,
  },
  textView: {
    width: 298,
    marginTop: 59,
  },
  text: {
    fontSize: 20,
    fontWeight: '400',
    color: Colors.darkGrey,
    textAlign: 'center',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 24,
  },
  buttonView: {
    flex: 1,
  },
  img: {
    width: 245.38,
    height: 196.3,
  },
});

export default OrderIsDone;
