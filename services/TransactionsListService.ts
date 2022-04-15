import axios from 'axios';
import {from} from 'rxjs';
import envs from '../config/env';

interface IresponseData {
  resultCode?: string;
  displayText?: string;
  errorMessage?: string;
  total_count?: string;
}

export interface IgetTransactionDetailResp extends IresponseData {
  transactions?: IgetTransactionsResponse[];
}
export interface IgetProducteDetailsRequest {
  user_id?: string;
  row_count?: string;
  row_index?: string;
  start_date?: string;
  end_date?: string;
  lang: string;
  app_source?: string;
  culture?: string;
}

export interface IgetTransactionsResponse {
  resultCode: string;
  date?: string;
  date24?: string;
  type?: string;
  organisation_id?: number;
  organisation_name?: string;
  score?: number;
  amount_gel?: number;
  card?: string;
  status?: string;
  address?: string;
  kartuli_amount?: number;
}

class TransactionService {
  getTransactions(data: IgetProducteDetailsRequest) {
    console.log('dataaaaaaaaad', data);

    const result = axios.get<IgetTransactionDetailResp>(
      `${envs.API_URL}api/Mobile/GetAccountStatement`,
    );
    return from(result);
  }
}

export default new TransactionService();
