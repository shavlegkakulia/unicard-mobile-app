import {IErrorState, IErrorAction, ErrorActions} from './../types/errors';

const initialState: IErrorState = {
  errors: undefined,
};

const ErrorReducer = (
  state: IErrorState = initialState,
  action: IErrorAction,
) => {
  switch (action.type) {
    case ErrorActions.push_error:
      return {...state, errors: action.error};
    case ErrorActions.delete_error:
      return {...state, errors: undefined};
    default:
      return {...state};
  }
};

export default ErrorReducer;
