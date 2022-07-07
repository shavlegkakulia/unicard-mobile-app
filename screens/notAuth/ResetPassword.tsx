import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import AppButton from '../../components/CostumComponents/AppButton';
import AppTextInput, {
  inputErrors,
  requireTypes,
} from '../../components/CostumComponents/AppTextInput';
import {ScreenNavigationProp} from '../../interfaces/commons';
import {notAuthRoutes} from '../../navigation/routes';
import {IpostRessetPasswordResponse} from '../../services/ResetPasswordService';
import {ITranslateReducer, ITranslateState} from '../../Store/types/translate';

import Colors from '../../theme/Colors';

const ResetPassword: React.FC<ScreenNavigationProp> = props => {
  const [resetPassData, setResetPassData] =
    useState<IpostRessetPasswordResponse>();
  const [error, setError] = useState(false);
  const translate = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;

  console.log(resetPassData);
  const nextStep = () => {
    if (inputErrors.length > 0) {
      return;
    }
    if (resetPassData?.new_password !== resetPassData?.repet_password) {
      setError(true);
      return;
    }

    props.navigation.navigate(notAuthRoutes.smsCode, {
      data: {...resetPassData},
      isResetPassword: true,
    });
  };
  const mutchErrorHandler = () => {
    if (resetPassData?.repet_password?.length === 0) {
      setError(false);
    }
  };
  useEffect(() => {
    mutchErrorHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetPassData?.repet_password]);


  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.main}>
      <View style={styles.titleView}>
        <Text style={styles.title}>შეიყვანეთ მონაცემები</Text>
      </View>
      <View style={styles.inputView}>
        <AppTextInput
          onChange={e =>
            setResetPassData({
              user_name: e,
              new_password: resetPassData?.new_password,
              repet_password: resetPassData?.repet_password,
            })
          }
          placeholder="სახელი"
          requireType={requireTypes.password}
          name="password"
          value={resetPassData?.user_name}
        />
      </View>
      <View style={styles.inputView}>
        <AppTextInput
          onChange={e =>
            setResetPassData({
              user_name: resetPassData?.user_name,
              new_password: e,
              repet_password: resetPassData?.repet_password,
            })
          }
          secureTextEntry={true}
          requireType={requireTypes.password}
          name="password"
          placeholder="ახალი პაროლი"
          value={resetPassData?.new_password}
        />
      </View>
      <View style={styles.inputView}>
        <AppTextInput
          onChange={e =>
            setResetPassData({
              user_name: resetPassData?.user_name,
              new_password: resetPassData?.new_password,
              repet_password: e,
            })
          }
          placeholder="გაიმეორეთ პაროლი"
          requireType={!error ? requireTypes.repeatPassword : ''}
          value={resetPassData?.repet_password}
          secureTextEntry={true}
        />
      </View>
      {error && (
        <View style={styles.error}>
          <Text style={styles.errorTxt}>
            {translate.t('generalErrors.passwordDontMutch')}
          </Text>
        </View>
      )}
      <View style={styles.buttonWrapper}>
        <AppButton
         onPress={nextStep}
          title={'შემდეგი'}
          backgroundColor={Colors.bgGreen}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 30,
  },
  titleView: {
    marginTop: 48,
  },
  title: {
    color: Colors.darkGrey,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
  },
  inputView: {
    alignItems: 'center',
  },
  buttonWrapper: {
    marginTop: 218,
  },
  error: {
    marginTop: 15,
  },
  errorTxt: {
    color: Colors.red,
    fontSize: 10,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
  },
});

export default ResetPassword;
