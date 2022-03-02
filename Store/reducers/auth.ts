import {AuthActions, IAuthAction, IAuthState} from '../types/auth';

const defSate: IAuthState = {
  isAuthentificated: false,
};

export default (state: IAuthState = defSate, action: IAuthAction) => {
  switch (action.type) {
    case AuthActions.setIsAuthentificated: {
      return {...state, isAuthentificated: action.isAuthentificated};
    }
    default: {
      return {...state};
    }
  }
};
