import {IgetUserServiceResponse} from '../../services/UserInfoService';

export interface IAuthState {
  isAuthentificated: boolean;
  userInfo?: IgetUserServiceResponse;
}

export interface IAuthAction extends IAuthState {
  type: string;
}

export enum AuthActions {
  setIsAuthentificated = 'setIsAuthentificated',
  setUserInfo = 'setUserInfo',
}

export interface IAuthReducer {
  AuthReducer: IAuthState;
}
