import axios from 'axios';
import {from} from 'rxjs';
import envs from '../config/env';

interface IresponseData {
  resultCode?: string;
  displayText?: string;
  errorMessage?: string;
}

export interface IgetBalanceDetailsRequest {
  user_id?: string;
  lang: string;
  app_source?: string;
  culture?: string;
}

export interface IgetBalanceResponse extends IresponseData {
  scores_left?: number;
  scores_blocked?: number;
  scores_spent?: number;
  scores_saved?: number;
  kartuli?: number;
}

class CardBalance {
  GenerateBalance(data: IgetBalanceDetailsRequest) {
    console.log('balancee', data);
    const result = axios.get<IresponseData>(
      `${envs.API_URL}api/Mobile/GetUserBalance`,
    );
    return from(result);
  }
}
export default new CardBalance();
