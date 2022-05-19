import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
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
import AuthService, {IAuthResponse, IAyuthData} from '../../services/AuthService';
import {login} from '../../Store/actions/auth';
import AppTextInput from './AppTextInput';
import AppButton from './AppButton';
import {ScreenNavigationProp} from '../../interfaces/commons';
import AsyncStorage from '../../services/StorageService';
import {notAuthRoutes} from '../../navigation/routes';
import { BIOMETRICENABLED, PASSCODEENABLED } from '../../screens/auth/Parameters';
import PassCode from './PassCode';
import BiometricAuthScreen from '../Biometric';
import { PUSH } from '../../Store/actions/errors';
import { ITranslateReducer, ITranslateState } from '../../Store/types/translate';
import axios from 'axios';
import Store from '../../Store';
import envs from './../../config/env';
import { AuthActions, IAuthAction } from '../../Store/types/auth';

interface IUserData {
  password?: string;
  email?: string;
  surname?: string;
  name?: string;
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

  const goRefreshToken = async () => {
    setIsLoading(true);
    const _refreshToken = await AuthService.getRefreshToken();
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      skipRefresh: true,
    };
    let refreshToken = Store.getState().AuthReducer.refreshToken?.trim() || _refreshToken;console.log('????????????????????????????', _refreshToken, refreshToken)
    const refreshObj = new URLSearchParams();
    refreshObj.append('scope', 'unicardApi offline_access');
    refreshObj.append('grant_type', 'refresh_token');
    refreshObj.append('client_id', 'ClientApp');
    refreshObj.append('client_secret', 'secret');
    refreshObj.append(
      'refresh_token',
      (refreshToken) || '',
    );
    return await axios
      .post<IAuthResponse>(
        `${envs.API_URL}connect/token`,
        refreshObj,
        config,
      )
      .then(async response => { 
        if (!response.data.access_token) throw response;

        // const date = new Date();
        // date.setSeconds(date.getSeconds() + response.data.expires_in);
        // const expObject = {
        //   expDate: date,
        // };
        // await storage.removeItem(TOKEN_EXPIRE);
        // await storage.setItem(TOKEN_EXPIRE, JSON.stringify(expObject));

        await AuthService.removeToken();
        await AuthService.setToken(
          response.data.access_token,
          response.data.refresh_token,
        );

        Store.dispatch<IAuthAction>({
          type: AuthActions.setToken,
          token: response.data.access_token,
        });
        Store.dispatch<IAuthAction>({
          type: AuthActions.setRefreshToken,
          refreshToken: response.data.refresh_token,
        });
        return {
          accesToken: response.data.access_token,
          refreshToken: response.data.refresh_token,
          skip: false,
        };
      })
      .catch(error => {console.log(error.response)
        // if (stringToObject(error.response).data.error === require_otp) {
        //   navigation.navigate(Routes.RefreshTokenOtp);
        // }
        return {accesToken: undefined, refreshToken: undefined, skip: true};
      })
      .finally(() => {
        setIsLoading(false);
        return {accesToken: undefined, refreshToken: undefined, skip: false};
      });
  };

  const onSuccesBiometric = () => {

    goRefreshToken().then(res => { console.log(res)
      const {accesToken, refreshToken, skip} = res;
      if (accesToken !== undefined) {
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
    if (available === false) setBiometricAvailable(false);
    if (!status) setStartBiometric(false);
  };

  const dispatch = useDispatch();
  const translate = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;

  useEffect(() => {
    AsyncStorage.getItem(PASSCODEENABLED).then(pass => {
      if(pass) {
        setIsPasscodeEnabed(true);
      }
    })
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
          if(isPasscodeEnabled) {
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
    <ScrollView>
      <Modal visible={isPasscodeEnabled} onRequestClose={() => {
        setIsPasscodeEnabed(false);
      }}>
        <PassCode isLogin={true} />
      </Modal>
      <BiometricAuthScreen
        start={startBiometric}
        returnStatus={getStatus}
        onSucces={onSuccesBiometric.bind(this)}
      />
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
});

export default AuthPage;
