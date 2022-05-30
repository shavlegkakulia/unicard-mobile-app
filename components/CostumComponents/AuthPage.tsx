import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

import Colors from '../../theme/Colors';
import UserInfoService, {
  IgetUserInfoDetailsRequest,
  IgetUserServiceResponse,
} from '../../services/UserInfoService';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import AuthService, {
  IAuthResponse,
  IAyuthData,
} from '../../services/AuthService';
import {login} from '../../Store/actions/auth';
import AppTextInput from './AppTextInput';
import AppButton from './AppButton';
import {ScreenNavigationProp} from '../../interfaces/commons';
import AsyncStorage from '../../services/StorageService';
import {notAuthRoutes} from '../../navigation/routes';
import {BIOMETRICENABLED, PASSCODEENABLED} from '../../screens/auth/Parameters';
import PassCode from './PassCode';
import BiometricAuthScreen from '../Biometric';
import {PUSH} from '../../Store/actions/errors';
import {ITranslateReducer, ITranslateState} from '../../Store/types/translate';
import axios from 'axios';
import Store from '../../Store';
import envs from './../../config/env';
import {AuthActions, IAuthAction} from '../../Store/types/auth';

interface IUserData {
  password?: string;
  email?: string;
  surname?: string;
  name?: string;
}

export interface IRefreshCallbakParams {
  accesToken: string | undefined;
  refreshToken: string | undefined;
  skip: boolean;
}

const AuthPage: React.FC<ScreenNavigationProp> = props => {
  const navigation = useNavigation();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [userData, setUserData] = useState<IUserData>({
    password: '',
    email: '',
  });
  const [isPasscodeEnabled, setIsPasscodeEnabed] = useState(false);
  const [startBiometric, setStartBiometric] = useState<boolean>(false);
  const [biometricAvailable, setBiometricAvailable] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const goRefreshToken = async (
    callback: (par: IRefreshCallbakParams) => void,
  ) => {
    setIsLoading(true);
    const _refreshToken = await AuthService.getRefreshToken();
    let refreshToken =
      Store.getState().AuthReducer.refreshToken?.trim() || _refreshToken;
    const loginObj = `refresh_token=${
      refreshToken || ''
    }&scope=unicardApi%20offline_access&grant_type=refresh_token&client_secret=${
      envs.client_secret
    }&client_id=${envs.client_id}`;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.responseType = 'json';

    xhr.addEventListener('readystatechange', async function () {
      if (this.readyState === 4) {
        console.log('<<<<<<<>>>>>>>>>>', this.response, loginObj);
        if (xhr.status == 200) {
          if (!this.response.access_token) {
            throw this.response;
          }

          await AuthService.removeToken();
          await AuthService.setToken(
            this.response.access_token,
            this.response.refresh_token,
          );

          Store.dispatch<IAuthAction>({
            type: AuthActions.setToken,
            token: this.response.access_token,
          });
          Store.dispatch<IAuthAction>({
            type: AuthActions.setRefreshToken,
            refreshToken: this.response.refresh_token,
          });

          callback({
            accesToken: this.response.access_token,
            refreshToken: this.response.refresh_token,
            skip: false,
          });
        } else {
          callback({
            accesToken: undefined,
            refreshToken: undefined,
            skip: true,
          });
        }
      }
    });

    xhr.open('POST', `${envs.API_URL}connect/token`);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.send(loginObj);
  };

  const onSuccesBiometric = () => {
    goRefreshToken(res => {
      const {accesToken, refreshToken, skip} = res;
      if (res.accesToken !== undefined) {
        dispatch({
          type: AuthActions.setToken,
          token: accesToken,
        });
        dispatch({
          type: AuthActions.setRefreshToken,
          refreshToken: refreshToken,
        });
        dispatch({
          type: AuthActions.setIsAuthentificated,
          isAuthentificated: true,
        });
      } else {
        if (!skip) {
          dispatch(PUSH(translate.t('generalErrors.errorOccurred')));
        }
      }
    });
  };

  const onBiometric = () => {
    if (startBiometric) {
      setStartBiometric(false);
      //return;
    }
    AsyncStorage.getItem(BIOMETRICENABLED).then(async data => {
      if (data !== null && biometricAvailable) {
        setStartBiometric(true);
      }
    });
  };

  useEffect(() => {
    onBiometric();
  }, []);

  const getStatus = (status: boolean, available?: boolean | undefined) => {
    if (available === false) {
      setBiometricAvailable(false);
    }
    if (!status) {
      setStartBiometric(false);
    }
  };

  const dispatch = useDispatch();
  const translate = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;

  useEffect(() => {
    AsyncStorage.getItem(PASSCODEENABLED).then(pass => {
      if (pass) {
        setIsPasscodeEnabed(true);
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('userInfo').then(res => {
      if (res !== null) {
        const udata = JSON.parse(res);
        setUserData({
          email: udata.email,
          surname: udata.surname,
          name: udata.name,
        });
      }
    });
  }, []);

  const LogIn = () => {
    console.log(userData);
    if (!userData?.email || !userData?.password) {
      return;
    }
    const data: IAyuthData = {
      password: userData?.password,
      username: userData?.email,
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

          dispatch(login(Response.access_token, Response.refresh_token));
        }
      },
      complete: () => {
        console.log('complate');
      },
      error: e => console.log('err', e.response),
    });
  };

  return (
    <>
      <ScrollView>
        <View style={styles.avatarView}>
          <Image
            style={styles.avatar}
            source={require('../../assets/img/avatar.png')}
          />
          <Text style={styles.name}>
            {userData?.name} {userData?.surname}
          </Text>
        </View>
        <View style={styles.btnWrapper}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => props.navigation.navigate(notAuthRoutes.authScreen)}>
            <Text style={styles.btnText}>სხვა მომხმარებლით შესვლა</Text>
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView style={styles.inputView}>
          <AppTextInput
            placeholder="პაროლი"
            secureTextEntry={true}
            value={userData?.password}
            onChange={e => setUserData({...userData, password: e})}
          />
          <View style={styles.button}>
            <AppButton
              onPress={LogIn}
              title={'შემდეგი'}
              backgroundColor={Colors.bgGreen}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <Modal
        visible={isPasscodeEnabled}
        onRequestClose={() => {
          setIsPasscodeEnabed(false);
        }}>
        <SafeAreaView style={styles.modal}>
          <PassCode isLogin={true} onRefresh={goRefreshToken} />
        </SafeAreaView>
      </Modal>
      <BiometricAuthScreen
        start={startBiometric}
        returnStatus={getStatus}
        onSucces={onSuccesBiometric.bind(this)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 50,
  },
  avatarView: {
    alignItems: 'center',
    marginTop: 27,
  },
  name: {
    marginTop: 12,
    fontSize: 18,
    lineHeight: 21.6,
    color: Colors.black,
    fontFamily: 'BPG DejaVu Sans Mt',
  },
  btnWrapper: {
    alignItems: 'center',
    marginTop: 19,
  },
  btn: {
    width: 219,
    height: 36,
    borderRadius: 20,
    backgroundColor: Colors.authBtn,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 12,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 14.4,
    color: Colors.authBtnText,
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
    marginRight: 6,
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
  },
  modal: {
    flex: 1,
  },
});

export default AuthPage;
