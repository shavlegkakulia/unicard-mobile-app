import { ErrorActions } from './../types/errors';

export const PUSH = ( message: string) => (dispatch: any) => {
    dispatch({type: ErrorActions.push_error, error: message});
}

export const DELETE = () => (dispatch: any) => {
    dispatch({type: ErrorActions.delete_error});
}