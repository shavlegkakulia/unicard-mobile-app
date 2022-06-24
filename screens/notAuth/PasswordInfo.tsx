import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import AppButton from '../../components/CostumComponents/AppButton';
import AppTextInput, {
  inputErrors,
  requireTypes,
} from '../../components/CostumComponents/AppTextInput';
import {ScreenNavigationProp} from '../../interfaces/commons';
import {notAuthRoutes} from '../../navigation/routes';

import Colors from '../../theme/Colors';
import AuthService, {IRegisterRequestData} from '../../services/AuthService';
import {ITranslateReducer, ITranslateState} from '../../Store/types/translate';

const PasswordInfo: React.FC<ScreenNavigationProp> = props => {
  const dispatch = useDispatch();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [passData, setPassData] = useState<IRegisterRequestData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const translate = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;

  const params = props.route.params;
  console.log('params', params)

  const OtpAuth = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    AuthService.SendOtp({phone: params.data.phone}).subscribe({
      next: Response => {
        if (inputErrors.length > 0) {
          return;
        }
        if (passData?.password !== passData?.confirm_password) {
          setError(true);
          return;
        }

        props.navigation.navigate(notAuthRoutes.smsCode, {
          data: {...params.data, ...passData},
        });
      },
      complete: () => {
        setLoading(false);
      },
      error: err => {
        setLoading(false);
        console.log(err);
      },
    });
  };

  const mutchErrorHandler = () => {
    if (passData?.confirm_password?.length === 0) {
      setError(false);
    }
  };
  useEffect(() => {
    mutchErrorHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passData?.confirm_password]);

  return (
    <>
      <View style={styles.flex1}>
        <View style={styles.textInput}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{translate.t('auth.fillInfo')}</Text>
          </View>
          <AppTextInput
            placeholder={translate.t('common.password')}
            secureTextEntry={true}
            value={passData?.password}
            requireType={requireTypes.password}
            name="password"
            onChange={e => {
              setPassData({
                password: e,
                confirm_password: passData?.confirm_password,
              });
            }}
          />
          <AppTextInput
            placeholder={translate.t('common.repeatPassword')}
            secureTextEntry={true}
            value={passData?.confirm_password}
            requireType={!error ? requireTypes.repeatPassword : ''}
            name="repeatPassword"
            onChange={e => {
              setPassData({
                password: passData?.password,
                confirm_password: e,
              });
            }}
          />
          {error && (
            <View style={styles.error}>
              <Text style={styles.errorTxt}>
                {translate.t('generalErrors.passwordDontMutch')}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.checkboxWrapper}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
            tintColor={Colors.bgGreen}
            onCheckColor={Colors.white}
            onFillColor={Colors.bgGreen}
            onTintColor={Colors.bgGreen}
            offAnimationType="stroke"
            style={styles.checkbox}
          />
          <TouchableOpacity>
            <Text style={styles.text}>
              {translate.t('common.accept')}
              <Text style={styles.subText}>
                {translate.t('common.termsAndConditions')}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <AppButton
          // onPress={() => {
          //   // props.navigation.navigate(notAuthRoutes.smsCode, passData);
          // }}
          onPress={OtpAuth}
          loading={loading}
          title={translate.t('common.next')}
          backgroundColor={Colors.bgGreen}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 5,
  },
  titleWrapper: {
    width: 325,
    marginTop: 48,
  },
  title: {
    color: '#6B6B6B',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
  },
  textInput: {
    alignItems: 'center',
  },
  checkboxWrapper: {
    width: 340,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 48,
  },
  text: {
    color: '#8AD00B',
    fontSize: 14,
    marginLeft: 10,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
  },
  subText: {
    textDecorationLine: 'underline',
    fontWeight: '700',
  },
  checkbox: {
    width: 16,
    height: 16,
  },
  buttonWrapper: {
    flex: 1,
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

export default PasswordInfo;
