import axios from 'axios';
import {from} from 'rxjs';
import envs from '../config/env';

interface IresponseData {
  resultCode?: string;
  displayText?: string;
  errorMessage?: string;
}

export interface IgetBalanceRequest {
  user_id?: string;
  lang: string;
  app_source?: string;
  culture?: string;
}

export interface IgetBalanceResponse extends IresponseData {
    balance?: number;
}

class BalanceService {
  GenerateBalance(data: IgetBalanceRequest) {
    const result = axios.get<IresponseData>(
      `${envs.API_URL}api/Mobile/DepositGetBalance`,
    );
    return from(result);
  }
}
export default new BalanceService();
