import {AuthActions} from '../types/auth';

export const login = () => (dispatch: any) => {
  dispatch({type: AuthActions.setIsAuthentificated, isAuthentificated: true});
};

export const logout = () => (dispatch: any) => {
  dispatch({type: AuthActions.setIsAuthentificated, isAuthentificated: false});
};
