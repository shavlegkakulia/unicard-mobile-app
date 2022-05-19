import { PASSCODEENABLED } from '../../screens/auth/Parameters';
import AuthService from '../../services/AuthService';
import AsyncStorage from '../../services/StorageService';
import UserInfoService from '../../services/UserInfoService';
import {AuthActions} from '../types/auth';

export const login = (token?: string, refreshToken?: string) => (dispatch: any) => {
  dispatch({type: AuthActions.setIsAuthentificated, isAuthentificated: true, token: token, refreshToken: refreshToken});
  dispatch({type: AuthActions.setToken, token: token});
  dispatch({type: AuthActions.setRefreshToken, refreshToken: refreshToken});
};

export const logout = () => (dispatch: any) => {
  dispatch({type: AuthActions.setIsAuthentificated, isAuthentificated: false});
  dispatch({type: AuthActions.setToken, token: ''});
  dispatch({type: AuthActions.setRefreshToken, refreshToken: ''});
  AsyncStorage.getItem(PASSCODEENABLED).then(async pass => {
    if(pass === null) {
      await AuthService.removeToken();
    }
  })
};

export const getUserInfo = (remember?: boolean) => (dispatch: any) => {
  UserInfoService.GenerateUserInfo().subscribe({
    next: async Response => {
      if (Response.data.resultCode === '200') {
        if (remember) {
          await AsyncStorage.setItem('userInfo', JSON.stringify(Response.data));
        }
        dispatch({type: AuthActions.setUserInfo, userInfo: Response.data});
      }
    },
    error: err => {
      console.log('erorrrrrrrrr', err.response);
    },
  });
};
