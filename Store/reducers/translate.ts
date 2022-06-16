import {en_us, ka_ge} from '../../lang/index';
import {
  ITranslateState,
  ITranslateAction,
  TranslateActions,
} from './../../Store/types/translate';

const initialState: ITranslateState = {
  translates: {},
  key: ka_ge,
  isLoading: false,
  t: function (key: string) {
    let keys = key.split('.');
    let store = null;
    for (let t of keys) {
      if (!store) {
        store = this.translates[t];
      } else {
        store = store[t];
      }
    }
    return store || '';
  },
};

const TranslateReduser = (
  state: ITranslateState = initialState,
  action: ITranslateAction,
) => {
  switch (action.type) {
    case TranslateActions.FETCH_TRANSLATE:
      return {
        ...state,
        translates: action.translates,
        key: action.key,
      };
    case TranslateActions.SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case TranslateActions.SET_KEY:
      return {
        ...state,
        key: action.key,
      };
    default:
      return {
        ...state,
      };
  }
};

export default TranslateReduser;
