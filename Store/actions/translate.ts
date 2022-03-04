import storage_keys from "../../constants/storageKeys";
import translateList from "../../lang";
import { TranslateActions } from "../types/translate";
import storage from './../../services/StorageService';

export const use = (key: string) => async(dispatch: any) => {
    dispatch({type: TranslateActions.SET_LOADING, isLoading: true});
    await storage.setItem(storage_keys.locales, key);
    dispatch({type: TranslateActions.FETCH_TRANSLATE, translates: translateList[key], key: key});
    dispatch({type: TranslateActions.SET_LOADING, isLoading: false});
}

export const setKey = (key: string) => (dispatch: any) => {
    dispatch({type: TranslateActions.FETCH_TRANSLATE, key: key});
}