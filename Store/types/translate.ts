export enum TranslateActions {
  FETCH_TRANSLATE = 'FETCH_TRANSLATE',
  SET_LOADING = 'SET_LOADING',
  SET_KEY = 'SET_KEY',
}

export interface ITranslateState {
  key: string;
  isLoading: boolean;
  translates: any;
  t: (key: string) => string;
}

export interface ITranslateAction {
  isLoading: boolean;
  accesToken: string;
  translates: any;
  key: string;
  type: string;
}

export interface ITranslateReducer {
  TranslateReducer: ITranslateState;
}
