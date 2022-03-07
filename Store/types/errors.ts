export enum ErrorActions {
    push_error = 'push_error',
    delete_error = 'delete_error'
}

export interface IErrorState {
    errors: string | undefined
}

export interface IErrorAction {
    error: string,
    type: string
}

export interface IGlobalState {
    ErrorReducer: IErrorState
}