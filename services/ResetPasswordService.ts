import axios from 'axios';
import {from} from 'rxjs';
import envs from '../config/env';

interface IresponseResetPasswordData {
  resultCode?: string;
  displayText?: string;
  errorMessage?: string;
}

export interface IpostResetPasswordDetail {
  lang: string;
  app_source?: string;
}

export interface IpostRessetPasswordResponse extends IresponseResetPasswordData {
  user_name?: string;
  sms_code?: string;
  new_password?: string;
  repet_password?: string;
}

class ResetPassService {
  GenerateReset(data: IpostRessetPasswordResponse) {
    console.log('data', data);
    const result = axios.post<IpostRessetPasswordResponse>(
      `${envs.API_URL}api/Mobile/ResetPassword`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return from(result);
  }
}
export default new ResetPassService();
