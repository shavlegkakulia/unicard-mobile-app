import React, {useEffect, useState} from 'react';
import {ScrollView, Text, StyleSheet, View, Image, Platform, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AppButton from '../../components/CostumComponents/AppButton';
import {ScreenNavigationProp} from '../../interfaces/commons';
import {notAuthRoutes} from '../../navigation/routes';
import AuthService, {IAyuthData} from '../../services/AuthService';
import AsyncStorage from '../../services/StorageService';
import {getUserInfo, login} from '../../Store/actions/auth';
import Colors from '../../theme/Colors';
import {PASSCODEENABLED} from '../auth/Parameters';
import {
  AccessToken,
  GraphRequest,
  GraphRequestConfig,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import {getString} from '../../utils/converts';
import FbService, {IFbData} from '../../services/FbService';
import {stringToObject} from '../../utils/common';
import { ITranslateReducer, ITranslateState } from '../../Store/types/translate';

const LoginScreen: React.FC<ScreenNavigationProp> = props => {
  const dispatch = useDispatch();
  const [isPasscodeEnabled, setIsPasscodeEnabed] = useState(false);
  const [userInfo, setUserInfo] = useState<IFbData | undefined>({name: null});
  const [loading, setLoading] = useState(false);
  const translate = useSelector<ITranslateReducer>(state => state.TranslateReducer) as ITranslateState;

  const loginWithFacebook = () => {
    setLoading(true);
    FbService.loginWithFacebook(setUserInfo, setLoading);
  };

  const LogIn = (token?: string) => {
    if (!token) {
      return;
    }
    const data: IAyuthData = {
      fb_token: token,
    };
    AuthService.SignInFacebook(data).subscribe({
      next: async Response => {
        if (Response.access_token) {
          if (isPasscodeEnabled) {
            await AuthService.setToken(
              Response.access_token,
              Response.refresh_token,
            );
          }
          dispatch(getUserInfo());
          dispatch(login(Response.access_token, Response.refresh_token));
        }
      },
      complete: () => {
        setLoading(false);
      },
      error: e => {
        console.log('err', e.response);
        if (e?.response?.error === 'invalid_grant') {
          props.navigation.navigate(notAuthRoutes.registration, {
            fb_token: token,
          });
        }
        setLoading(false);
      },
    });
  };

  useEffect(() => {
    if (userInfo?.name) {
      LogIn(getString(userInfo.id?.toString()));
    }
  }, [userInfo]);

  useEffect(() => {
    //FbService.logoutWithFacebook();
    AsyncStorage.getItem(PASSCODEENABLED).then(pass => {
      if (pass) {
        setIsPasscodeEnabed(true);
      }
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.imgContainer}>
        <Image source={require('../../assets/img/authLogo.png')} resizeMode={'contain'} style={styles.image} />
      </View>

      <AppButton
        loading={loading}
        onPress={loginWithFacebook}
        title={translate.t('auth.loginWithFb')}
        backgroundColor={Colors.blue}
      />

      <View style={styles.titleView}>
        <Text style={styles.or}>{translate.t('common.or')}</Text>
      </View>
      <AppButton
        onPress={() => {
          props.navigation.navigate(notAuthRoutes.authScreen);
        }}
        title={translate.t('auth.authorize')}
        backgroundColor={Colors.bgGreen}
      />
      <View style={styles.btnWrapper}>
        <AppButton
          onPress={() => {
            props.navigation.navigate(notAuthRoutes.registration);
          }}
          title={translate.t('auth.register')}
          backgroundColor={Colors.lightOrange}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: Dimensions.get('window').height / 3,
    maxHeight: 307,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  titleView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: Colors.bgGreen,
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  or: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
    color: Colors.lightOrange,
  },
  btnWrapper: {
    paddingVertical: 60,
  },
});

export default LoginScreen;
