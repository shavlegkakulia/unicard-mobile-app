import {AuthActions, IAuthAction, IAuthState} from '../types/auth';

const defSate: IAuthState = {
  isAuthentificated: false,
  userInfo: undefined,
  token: '', 
  refreshToken: ''
};

export default (state: IAuthState = defSate, action: IAuthAction) => {
  switch (action.type) {
    case AuthActions.setIsAuthentificated: {
      return {...state, isAuthentificated: action.isAuthentificated};
    }
    case AuthActions.setToken: {
      return {...state, token: action.token};
    }
    case AuthActions.setRefreshToken: {
      return {...state, refreshToken: action.refreshToken};
    }
    case AuthActions.setUserInfo: {
      return {...state, userInfo: action.userInfo};
    }
    default: {
      return {...state};
    }
  }
};
