import AsyncStorage from '../../services/StorageService';
import UserInfoService from '../../services/UserInfoService';
import {AuthActions} from '../types/auth';

export const login = () => (dispatch: any) => {
  dispatch({type: AuthActions.setIsAuthentificated, isAuthentificated: true});
};

export const logout = () => (dispatch: any) => {
  dispatch({type: AuthActions.setIsAuthentificated, isAuthentificated: false});
};

export const getUserInfo = (remember?: boolean) => (dispatch: any) => {
  UserInfoService.GenerateUserInfo().subscribe({
    next: async Response => {
      console.log('dataaaaaaaa', Response.data);
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
