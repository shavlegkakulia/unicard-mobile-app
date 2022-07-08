import axios from 'axios';
import {from} from 'rxjs';
import envs from '../config/env';

interface ITermsresponseData {
  resultCode?: string;
  displayText?: string;
  errorMessage?: string;
}

export interface ITermsDetailsRequest {
  user_id?: string;
  lang: string;
  app_source?: string;
  culture?: string;
  id?: number;
}

export interface ITermsServiceResponse extends ITermsresponseData {
  accepted?: boolean;
}

class TermsService {
  GenerateTerms(data: ITermsServiceResponse | undefined) {
    const response = axios.post<ITermsresponseData>(
      `${envs.API_URL}api/Mobile/CheckAcceptTerms`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return from(response);
  }
}
export default new TermsService();
