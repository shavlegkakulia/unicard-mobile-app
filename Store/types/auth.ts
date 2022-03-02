export interface IAuthState {
    isAuthentificated: boolean;
}

export interface IAuthAction extends IAuthState {
    type: string;
}

export enum AuthActions {
    setIsAuthentificated = 'setIsAuthentificated'
}

export interface IAuthReducer {
    AuthReducer: IAuthState
}