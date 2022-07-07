import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import AppButton from '../../components/CostumComponents/AppButton';
import AppTextInput, {
  inputErrors,
  requireTypes,
} from '../../components/CostumComponents/AppTextInput';
import {ScreenNavigationProp} from '../../interfaces/commons';
import {authRoutes} from '../../navigation/routes';
import AuthService, {
  IChangePasswordRequestData,
} from '../../services/AuthService';
import {PUSH} from '../../Store/actions/errors';
import {IAuthReducer, IAuthState} from '../../Store/types/auth';
import {ITranslateReducer, ITranslateState} from '../../Store/types/translate';
import Colors from '../../theme/Colors';

const ChangePassword: React.FC<ScreenNavigationProp> = props => {
  const dispatch = useDispatch();
  const translate = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;

  const [password, setPassword] = useState<IChangePasswordRequestData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const authdata = useSelector<IAuthReducer>(
    state => state.AuthReducer,
  ) as IAuthState;
  console.log('authdata', authdata.isAuthentificated);

  const changePassword = () => {
    if (loading) {
      return;
    }
    if (inputErrors.length > 0) {
      return;
    }
    if (password?.new_password !== password?.confirm_password) {
      setError(true);
      return;
    }
    const data: IChangePasswordRequestData = {
      password: password?.password,
      new_password: password?.new_password,
    };
    setLoading(true);
    AuthService.ChangePassword(data).subscribe({
      next: Response => {
        console.log('@@@@@@@@@@@@@', Response.data.resultCode);
        if (Response.data.resultCode === '200') {
          props.navigation.navigate(authRoutes.PasswordChangingMessage);
        } else {
          dispatch(PUSH(Response.data.displayText));
        }
      },
      complete: () => {
        setLoading(false);
      },
      error: err => {
        setLoading(false);
        dispatch(PUSH(err.data.displayText));
        console.log('>>>', err);
      },
    });
  };
  const mutchErrorHandler = () => {
    if (password?.confirm_password?.length === 0) {
      setError(false);
    }
  };
  useEffect(() => {
    mutchErrorHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password?.confirm_password]);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.inputView}>
        <AppTextInput
          placeholder={translate.t('common.oldPassword')}
          secureTextEntry={true}
          value={password?.password}
          onChange={e => {
            setPassword({
              password: e,
              new_password: password?.new_password,
              confirm_password: password?.confirm_password,
            });
          }}
        />
        <AppTextInput
          placeholder={translate.t('common.newPassword')}
          secureTextEntry={true}
          value={password?.new_password}
          requireType={requireTypes.password}
          name="password"
          onChange={e => {
            setPassword({
              password: password?.password,
              new_password: e,
              confirm_password: password?.confirm_password,
            });
          }}
        />
        <AppTextInput
          placeholder={translate.t('common.repeatPassword')}
          secureTextEntry={true}
          value={password?.confirm_password}
          requireType={!error ? requireTypes.repeatPassword : ''}
          onChange={e => {
            setPassword({
              password: password?.password,
              new_password: password?.new_password,
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
      <View style={styles.btn}>
        <AppButton
          onPress={changePassword}
          loading={loading}
          title={translate.t('common.change')}
          backgroundColor={Colors.bgGreen}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  inputView: {
    alignItems: 'center',
    marginTop: 20,
  },
  btn: {
    marginTop: 70,
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

export default ChangePassword;
// Bbcd123! Abcd123! Cabc123!
