import React, { useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import AppButton from '../../components/CostumComponents/AppButton';
import AppTextInput, {
  requireTypes,
} from '../../components/CostumComponents/AppTextInput';
import {ScreenNavigationProp} from '../../interfaces/commons';
import {notAuthRoutes} from '../../navigation/routes';
import {IRegisterRequestData} from '../../services/AuthService';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {inputErrors} from './../../components/CostumComponents/AppTextInput';

import Colors from '../../theme/Colors';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ITranslateReducer, ITranslateState } from '../../Store/types/translate';

type RouteParamList = {
  params: {
    hasCard?: boolean;
    fb_token?: string;
    cardNumber?: string;
  };
};

const RegistrationDetailsScreen: React.FC<ScreenNavigationProp> = props => {
  const route = useRoute<RouteProp<RouteParamList, 'params'>>();
  const [regData, setRegData] = useState<IRegisterRequestData>();
  const [chekCount, setChekCount] = useState<number>(0);
  const translate = useSelector<ITranslateReducer>(state => state.TranslateReducer) as ITranslateState;


  const nextStep = () => {
    setChekCount(t => ++t);
    if (inputErrors.length > 0) {
      return;
    }
    props.navigation.navigate(notAuthRoutes.passwordInfo, {data: {...regData, fb_token: route?.params?.fb_token, card: route?.params?.cardNumber}});
  };

  return (
    <>
      <KeyboardAwareScrollView>
        <View style={styles.textInput}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{translate.t('auth.fillInfo')}</Text>
          </View>
          <AppTextInput
            placeholder={translate.t('common.name')}
            icon={0}
            secureTextEntry={false}
            textContentType={'name'}
            value={regData?.user_name}
            requireType={requireTypes.require}
            name="name"
            chekCount={chekCount}
            onChange={e =>
              setRegData({
                user_name: e,
                surname: regData?.surname,
                person_code: regData?.person_code,
                birthDate: regData?.birthDate,
                phone: regData?.phone,
                email: regData?.email,
                new_card_registration: route?.params?.hasCard ? "1" : "0",
                card: route?.params?.cardNumber
              })
            }
          />
          <AppTextInput
            placeholder={translate.t('common.lname')}
            icon={0}
            secureTextEntry={false}
            textContentType={'name'}
            requireType={requireTypes.require}
            value={regData?.surname}
            chekCount={chekCount}
            onChange={e =>
              setRegData({
                user_name: regData?.user_name,
                surname: e,
                person_code: regData?.person_code,
                birthDate: regData?.birthDate,
                phone: regData?.phone,
                email: regData?.email,
                new_card_registration: route?.params?.hasCard ? "1" : "0",
                card: route?.params?.cardNumber
              })
            }
          />
          <AppTextInput
            placeholder={translate.t('common.personalNumber')}
            icon={0}
            secureTextEntry={false}
            textContentType={''}
            value={regData?.person_code}
            requireType={requireTypes.min}
            minValue={6}
            name="personalnumber"
            chekCount={chekCount}
            onChange={e =>
              setRegData({
                user_name: regData?.user_name,
                surname: regData?.surname,
                person_code: e,
                birthDate: regData?.birthDate,
                phone: regData?.phone,
                email: regData?.email,
                new_card_registration: route?.params?.hasCard ? "1" : "0",
                card: route?.params?.cardNumber
              })
            }
          />

          <AppTextInput
            placeholder={translate.t('auth.birtDate')}
            icon={0}
            secureTextEntry={false}
            textContentType={''}
            value={regData?.birthDate}
            requireType={requireTypes.minLength}
            minLength={4}
            chekCount={chekCount}
            name="birthdate"
            onChange={e =>
              setRegData({
                user_name: regData?.user_name,
                surname: regData?.surname,
                person_code: regData?.person_code,
                birthDate: e,
                phone: regData?.phone,
                email: regData?.email,
                new_card_registration: route?.params?.hasCard ? "1" : "0",
                card: route?.params?.cardNumber
              })
            }
          />

          <AppTextInput
            placeholder={'+995 5xx xxx xxx'}
            icon={0}
            secureTextEntry={false}
            textContentType={'telephoneNumber'}
            value={regData?.phone}
            requireType={requireTypes.maxLength}
            maxLength={18}
            chekCount={chekCount}
            name="telephoneNumber"
            onChange={e =>
              setRegData({
                user_name: regData?.user_name,
                surname: regData?.surname,
                person_code: regData?.person_code,
                birthDate: regData?.birthDate,
                phone: e,
                email: regData?.email,
                new_card_registration: route?.params?.hasCard ? "1" : "0",
                card: route?.params?.cardNumber
              })
            }
          />

          <AppTextInput
            placeholder={translate.t('common.email')}
            icon={0}
            secureTextEntry={false}
            textContentType={'emailAddress'}
            requireType={requireTypes.email}
            name="email"
            value={regData?.email}
            onChange={e =>
              setRegData({
                user_name: regData?.user_name,
                surname: regData?.surname,
                person_code: regData?.person_code,
                birthDate: regData?.birthDate,
                phone: regData?.phone,
                email: e,
                new_card_registration: route?.params?.hasCard ? "1" : "0",
                card: route?.params?.cardNumber
              })
            }
          />
        </View>
        <View style={styles.button}>
          <AppButton
            onPress={nextStep}
            title={translate.t('common.next')}
            backgroundColor={Colors.bgGreen}
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  titleWrapper: {
    width: 325,
    // alignItems: 'center',
    marginTop: 48,
  },
  title: {
    color: Colors.darkGrey,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 19.2,
  },
  textInput: {
    alignItems: 'center',
  },
  button: {
    marginTop: 116,
    marginBottom: 102,
  },
});

export default RegistrationDetailsScreen;
