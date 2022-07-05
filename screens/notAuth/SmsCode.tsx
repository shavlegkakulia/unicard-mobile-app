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
import AppTextInput from '../../components/CostumComponents/AppTextInput';
import {ScreenNavigationProp} from '../../interfaces/commons';
import {notAuthRoutes} from '../../navigation/routes';
import {PUSH} from '../../Store/actions/errors';

import Colors from '../../theme/Colors';
import AuthService, {IRegisterRequestData} from '../../services/AuthService';
import {ITranslateReducer, ITranslateState} from '../../Store/types/translate';
import {IpostRessetPasswordResponse} from '../../services/ResetPasswordService';

const SmsCode: React.FC<ScreenNavigationProp> = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState<IRegisterRequestData>();
  const translate = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;


  const OtpAuth = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    AuthService.SendOtp({phone: params?.data?.phone}).subscribe({
      next: Response => {
        // props.navigation.navigate(notAuthRoutes.smsCode, {
        //   data: {...params.data},
        // });
      },
      complete: () => {
        setLoading(false);
      },
      error: err => {
        setLoading(false);
        console.log('otp error', err);
      },
    });
  };
  useEffect(() => {
    OtpAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const params = props.route.params;

  const register = () => {
    if (loading) {
      return;
    }
    setLoading(true);

    const data: IRegisterRequestData = {
      ...params.data,
      sms_code_otp: otp,
    };
    AuthService.SignUp(data).subscribe({
      next: Response => {
        if (Response.status === 200) {
          props.navigation.navigate(notAuthRoutes.registrationDone);
        }
      },
      complete: () => {
        setLoading(false);
      },
      error: err => {
        setLoading(false);
        dispatch(PUSH(err.data.displayText));
        console.log('>>>', err.data.displayText);
      },
    });
  };

  return (
    <View style={styles.main}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{translate.t('common.setSmsCode')}</Text>
      </View>
      <View style={styles.sendTextView}>
        <Text style={styles.sendText}>{translate.t('common.smsCodeSent')}</Text>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.text}>{translate.t('common.smsCode')}</Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={otp?.sms_code_otp}
          onChangeText={e => setOtp(e)}
        />
        <TouchableOpacity onPress={OtpAuth}>
          <Text style={styles.text}>
            {translate.t('common.fromTheBegining')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <AppButton
          onPress={register}
          title={translate.t('common.next')}
          loading={loading}
          backgroundColor={Colors.bgGreen}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginHorizontal: 43,
  },
  titleWrapper: {
    marginTop: 48,
  },
  title: {
    color: '#6B6B6B',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 24,
  },
  sendTextView: {
    marginTop: 35,
  },
  sendText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.darkGrey,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
  },
  inputView: {
    marginTop: 35,
    borderBottomWidth: 1,
    borderBottomColor: Colors.bgGreen,
    paddingHorizontal: 8,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: 50,
  },
  text: {
    color: Colors.bgGreen,
    textTransform: 'uppercase',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
  },
  button: {
    top: 150,
  },
});

export default SmsCode;
