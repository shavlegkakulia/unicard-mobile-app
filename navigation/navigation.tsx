import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ErrorWrapper from '../components/ErrorWraper';
import Loader from '../components/loader';
import AuthService, {IInterceptop} from '../services/AuthService';
import {logout} from '../Store/actions/auth';
import {AuthActions, IAuthReducer, IAuthState} from '../Store/types/auth';
import {ErrorActions} from '../Store/types/errors';
import AppNavigator from './appNavigator';
import storage from './../services/StorageService';
import {EN_US, KA_GE, ka_ge} from '../lang';
import storage_keys from '../constants/storageKeys';
import {use} from '../Store/actions/translate';
import {ITranslateReducer, ITranslateState} from '../Store/types/translate';
import {StatusBar} from 'react-native';
import AsyncStorage from './../services/StorageService';
import {PASSCODEENABLED} from '../screens/auth/Parameters';
import {PUSH} from '../Store/actions/errors';
import {stringToObject} from '../utils/common';
import NetInfo from '@react-native-community/netinfo';

export default () => {
  const authReducer = useSelector<IAuthReducer>(
    state => state.AuthReducer,
  ) as IAuthState;
  const translateReducer = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const AxiosInterceptor = useRef<IInterceptop[]>([]);

  const dispatch = useDispatch();

  const RegisterCommonInterceptor = () => {
    let requestInterceptor = axios.interceptors.request.use(
      async (config: any) => {
        const lkey = await storage.getItem(storage_keys.locales);
        config.headers.lang = lkey === ka_ge ? KA_GE : EN_US;

        return config;
      },
    );

    let responseInterceptor = axios.interceptors.response.use(
      (response: any) => {
        if (!response.config.objectResponse || response.data.expires_in) {
          return Promise.resolve(response);
        }
        console.log('>>>response>>>', response.data);
        if (!response?.data?.resultCode) {
          return Promise.resolve(response);
        }
        if (!response?.data?.resultCode.startsWith('20')) {
          try {
            response.errorMessage =
              response?.data?.errors[0]?.ErrorMessage ||
              response?.data?.errors?.[0]?.displayText ||
              'generalErrors.errorOccurred';
          } catch (err) {
            response.errorMessage =
              response?.data?.Errors?.[0]?.DisplayText ||
              'generalErrors.errorOccurred';
          }
          response.customError = true;
          if (!response.config.skipCustomErrorHandling) {
            dispatch(
              PUSH(
                response.errorMessage === 'generalErrors.errorOccurred'
                  ? translateReducer.t(response.errorMessage)
                  : response.errorMessage,
              ),
            );
          }

          return Promise.reject(response);
        }
        return Promise.resolve(response);
      },
      async error => {
        if (error?.response?.status === 401) {
          return Promise.reject(error);
        }
        console.log('>>>>>>>>>>>>>>>', stringToObject(error.response).data);
        let netInfo = await NetInfo.fetch();
        if (!netInfo.isConnected) {
          if (!error.config.skipCustomErrorHandling) {
            dispatch(PUSH(translateReducer.t('generalErrors.netError')));
          }

          error.errorMessage = translateReducer.t('generalErrors.netError');
        } else {
          if (
            stringToObject(error.response).data.error !== 'invalid_grant' &&
            stringToObject(error.response).data.error !== 'require_otp' &&
            stringToObject(error.response).data.error !==
              'invalid_username_or_password'
          ) {
            dispatch(PUSH(translateReducer.t('generalErrors.errorOccurred')));
          }
        }
        return Promise.reject(error);
      },
    );
    return {
      unsubscribe: () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responseInterceptor);
      },
    };
  };

  const logOut = async () => {
    await AuthService.SignOut();
    dispatch(logout());
  };

  useEffect(() => {
    AxiosInterceptor.current = [
      RegisterCommonInterceptor(),
      AuthService.registerAuthInterceptor(logOut),
    ];
    return () => {
      AxiosInterceptor.current.forEach(sub => sub.unsubscribe());
    };
  }, []);

  useEffect(() => {
    // AsyncStorage.getItem(PASSCODEENABLED).then(async pass => {
    //   if(pass) {
    //     const token = await AuthService.getToken();
    //     const refresh = await AuthService.getRefreshToken();
    //     AuthService.isAuthenticated()
    //     .then(_ => {
    //       dispatch({
    //         type: AuthActions.setToken,
    //         token: token,
    //       });
    //       dispatch({
    //         type: AuthActions.setRefreshToken,
    //         refreshToken: refresh,
    //       });
    //       dispatch({
    //         type: AuthActions.setIsAuthentificated,
    //         isAuthentificated: true,
    //       });
    //     })
    //     .finally(() => setIsLoading(false));
    //   } else {
    //     setIsLoading(false);
    //   }
    // });
    setIsLoading(false);
    //   setTimeout(() => {
    //     dispatch({
    //       type: ErrorActions.push_error,
    //       error: 'fdsfdsfdsfdsfd',
    //     });
    //  }, 5000);
  }, []);

  useEffect(() => {
    storage.getItem(storage_keys.locales).then(locale => {
      dispatch(use(locale || ka_ge));
    });
  }, []);

  return (
    <NavigationContainer>
      <ErrorWrapper>
        <Loader visible={isLoading || translateReducer.isLoading} />
        <AppNavigator />
      </ErrorWrapper>
    </NavigationContainer>
  );
};
