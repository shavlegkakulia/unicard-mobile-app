import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AppButton from '../../components/CostumComponents/AppButton';

import {ScreenNavigationProp} from '../../interfaces/commons';
import {notAuthRoutes} from '../../navigation/routes';
import AuthService, {IRegisterRequestData} from '../../services/AuthService';

import {login} from '../../Store/actions/auth';
import {ITranslateReducer, ITranslateState} from '../../Store/types/translate';

import Colors from '../../theme/Colors';

const RegistrationDone: React.FC<ScreenNavigationProp> = props => {
  const translate = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;

  const complate = () => {
    props.navigation.navigate(notAuthRoutes.authScreen);
  };

  return (
    <>
      <View style={styles.main}>
        <View style={styles.raund}>
          <Image source={require('../../assets/img/doneIcon.png')} />
        </View>
        <View style={styles.imageView}>
          <Image
            style={styles.img}
            source={require('../../assets/img/doneImg.png')}
          />
        </View>
        <View style={styles.textView}>
          <Text style={styles.text}>
            {translate.t('auth.registrationDone')}
          </Text>
        </View>
      </View>
      <View style={styles.buttonView}>
        <AppButton
          // onPress={() => dispatch(login())}
          onPress={complate}
          title={translate.t('common.colse')}
          backgroundColor={Colors.lightOrange}
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
    marginTop: 17,
    marginLeft: 45,
  },
  textView: {
    width: 182,
    marginTop: 32.78,
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
    width: 162.19,
    height: 289.22,
  },
});

export default RegistrationDone;
