import CheckBox from '@react-native-community/checkbox';
import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Keyboard,
  EmitterSubscription,
  Animated,
  Easing,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AppButton from '../../components/CostumComponents/AppButton';
import AppTextInput from '../../components/CostumComponents/AppTextInput';
import {ScreenNavigationProp} from '../../interfaces/commons';
import {notAuthRoutes} from '../../navigation/routes';
import AuthService, {IAyuthData} from '../../services/AuthService';
import AsyncStorage from '../../services/StorageService';
import {getUserInfo, login} from '../../Store/actions/auth';
import Colors from '../../theme/Colors';
import {PASSCODEENABLED} from '../auth/Parameters';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {invalid_grant} from '../../constants/response_strings';
import {PUSH} from '../../Store/actions/errors';
import {ITranslateReducer, ITranslateState} from '../../Store/types/translate';

interface IUserData {
  username?: string;
  password?: string;
}

const AuthScreen: React.FC<ScreenNavigationProp> = props => {
  const [userData, setUserData] = useState<IUserData>({
    username: 'levani1308@gmail.com',
    password: 'Abcd123!',
  });

  const anim = {height: new Animated.Value(0), width: new Animated.Value(0)};
  const ks = useRef<EmitterSubscription>();

  const [isPasscodeEnabled, setIsPasscodeEnabed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const translate = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;

  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem(PASSCODEENABLED).then(pass => {
      if (pass) {
        setIsPasscodeEnabed(true);
      }
    });
  }, []);

  useEffect(() => {
    ks.current = Keyboard.addListener('keyboardDidShow', () => {
      Animated.timing(anim.height, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
      Animated.timing(anim.width, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      ks.current?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const validateText = () => {
    if (!userData?.username || !userData?.password) {
      setError(true);
    } else {
      setError(false);
    }
  };
  const errorDecline = () => {
    if (userData?.username?.length! > 0 || ![]) {
      setError(false);
    }
  };

  useEffect(() => {
    errorDecline();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?.username, userData?.password]);

  const LogIn = () => {
    if (!userData?.username || !userData?.password || loading) {
      validateText();
      return;
    }
    setLoading(true);
    const data: IAyuthData = {
      username: userData?.username,
      password: userData?.password,
    };
    AuthService.SignIn(data).subscribe({
      next: async Response => {
        if (Response.access_token) {
          if (isPasscodeEnabled) {
            await AuthService.setToken(
              Response.access_token,
              Response.refresh_token,
            );
          }
          dispatch(getUserInfo(toggleCheckBox));
          dispatch(login(Response.access_token, Response.refresh_token));
        }
      },
      complete: () => {
        setLoading(false);
      },
      error: e => {
        setLoading(false);
        if (e.response.error === invalid_grant) {
          dispatch(PUSH(translate.t('generalErrors.wrongUser')));
        }
      },
    });
  };

  useEffect(() => {
    AsyncStorage.getItem('userInfo').then(res => {
      if (res !== null) {
        props.navigation.navigate(notAuthRoutes.authPage);
      }
    });
  }, []);

  const goHeight = anim.height.interpolate({
    inputRange: [0, 1],
    outputRange: [306, 0],
  });

  const goWidth = anim.width.interpolate({
    inputRange: [0, 1],
    outputRange: [220, 0],
  });

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <KeyboardAwareScrollView>
      <View style={styles.titleView}>
        <Text style={styles.title}>{translate.t('auth.authorize')}</Text>
      </View>
      <View style={styles.imgView}>
        <Animated.Image
          style={{height: goHeight, width: goWidth}}
          source={require('../../assets/img/authScreenLogo.png')}
        />
      </View>
      <View style={styles.inputView}>
        <AppTextInput
          borderCol={error ? Colors.red : Colors.darkGrey}
          placeholder={translate.t('common.email')}
          value={userData?.username}
          onChange={e =>
            setUserData({password: userData?.password, username: e})
          }
        />
        <AppTextInput
          borderCol={error ? Colors.red : Colors.darkGrey}
          placeholder={translate.t('common.password')}
          secureTextEntry={true}
          value={userData?.password}
          onChange={e =>
            setUserData({username: userData?.username, password: e})
          }
        />
        <View style={styles.checkBoxView}>
          <View style={styles.row}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(
                newValue: boolean | ((prevState: boolean) => boolean),
              ) => setToggleCheckBox(newValue)}
              style={styles.checkBox}
              onCheckColor={Colors.bgGreen}
              onTintColor={Colors.bgGreen}
            />
            <Text style={styles.text}>{translate.t('common.remember')}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.passwordForgView}>
          <Text style={styles.text}>{translate.t('common.forgotPwd')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <AppButton
          loading={loading}
          onPress={LogIn}
          title={translate.t('common.next')}
          backgroundColor={Colors.bgGreen}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  titleView: {
    alignItems: 'center',
    marginTop: 16,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.darkGrey,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 14.4,
  },
  imgView: {
    alignItems: 'center',
    marginTop: 33,
  },
  inputView: {
    alignItems: 'center',
  },
  checkBoxView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 325,
    marginTop: 32,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    width: 16,
    height: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 14.4,
    color: Colors.darkGrey,
  },
  button: {
    marginTop: 95,
    marginBottom: 50,
  },
  passwordForgView: {
    alignSelf: 'flex-end',
    marginRight: 40,
    marginTop: 10,
  },
});

export default AuthScreen;
