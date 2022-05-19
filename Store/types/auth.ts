import {IgetUserServiceResponse} from '../../services/UserInfoService';

export interface IAuthState {
  isAuthentificated?: boolean;
  userInfo?: IgetUserServiceResponse;
  token?: string; 
  refreshToken?: string
}

export interface IAuthAction extends IAuthState {
  type: string;
}

export enum AuthActions {
  setIsAuthentificated = 'setIsAuthentificated',
  setUserInfo = 'setUserInfo',
  setToken = 'setToken',
  setRefreshToken = 'setRefreshToken'
}

export interface IAuthReducer {
  AuthReducer: IAuthState;
}
