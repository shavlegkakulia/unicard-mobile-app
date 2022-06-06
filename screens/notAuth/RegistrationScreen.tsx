import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import AppButton from '../../components/CostumComponents/AppButton';
import {ScreenNavigationProp} from '../../interfaces/commons';
import {notAuthRoutes} from '../../navigation/routes';

import Colors from '../../theme/Colors';

type RouteParamList = {
  params: {
    fb_token?: string;
  };
};

const RegistrationScreen: React.FC<ScreenNavigationProp> = props => {
  const route = useRoute<RouteProp<RouteParamList, 'params'>>();
  return (
    <>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>გაქვთ თუ არა უნიქარდის ბარათი?</Text>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={require('../../assets/img/cardGreen.png')}
          />
          <Image
            style={styles.image}
            source={require('../../assets/img/cardBlack.png')}
          />
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <AppButton
          onPress={() => {
            props.navigation.navigate(notAuthRoutes.registrationDetails, {hasCard: true, fb_token: route?.params?.fb_token});
          }}
          title={'დიახ'}
          backgroundColor={Colors.bgGreen}
        />
        <View style={styles.button}>
          <AppButton
            onPress={() => {
              props.navigation.navigate(notAuthRoutes.registrationDetails, {hasCard: false, fb_token: route?.params?.fb_token});
            }}
            title={'არა'}
            backgroundColor={Colors.lightOrange}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  titleWrapper: {
    alignItems: 'center',
    flex: 2,
    justifyContent: 'center',
  },
  title: {
    color: Colors.darkGrey,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
  },
  imageWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '90%',
    marginTop: 48,
  },
  image: {
    width: 160.4,
    height: 103.74,
  },
  buttonWrapper: {
    flex: 1,
  },
  button: {
    marginTop: 34,
  },
});

export default RegistrationScreen;
