import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ErrorWrapper from '../components/ErrorWraper';
import Loader from '../components/loader';
import AuthService, {IInterceptop} from '../services/AuthService';
import {logout} from '../Store/actions/auth';
import {AuthActions, IAuthReducer, IAuthState} from '../Store/types/auth';
import { ErrorActions } from '../Store/types/errors';
import AppNavigator from './appNavigator';
import storage from './../services/StorageService';
import { ka } from '../lang';
import storage_keys from '../constants/storageKeys';
import { use } from '../Store/actions/translate';
import { ITranslateReducer, ITranslateState } from '../Store/types/translate';

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
    let requestInterceptor = axios.interceptors.request.use((config: any) => {
      config.headers['langcode'] = 'en-US';
      return config;
    });

    let responseInterceptor = axios.interceptors.response.use(
      (response: any) => {
        if (!response.config.objectResponse || response.data.expires_in) {
          return Promise.resolve(response);
        }
        return Promise.resolve(response);
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
  }, [authReducer.isAuthentificated]);

  useEffect(() => {
    AuthService.isAuthenticated()
      .then(res => {
        dispatch({
          type: AuthActions.setIsAuthentificated,
          isAuthentificated: res,
        });
      })
      .finally(() => setIsLoading(false));

      setTimeout(() => {
        dispatch({
          type: ErrorActions.push_error,
          error: 'fdsfdsfdsfdsfd',
        });
      }, 5000);
  }, []);

  useEffect(() => {
    storage
      .getItem(storage_keys.locales)
      .then(locale => {
        dispatch(use(locale || ka));
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
