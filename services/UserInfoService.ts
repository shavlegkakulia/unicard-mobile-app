import axios from 'axios';
import {from} from 'rxjs';
import envs from '../config/env';

interface IresponseData {
  resultCode?: string;
  displayText?: string;
  errorMessage?: string;
}

export interface IgetUserInfoDetailsRequest {
  user_id?: string;
  lang: string;
  app_source?: string;
  culture?: string;
}

export interface IgetUserServiceResponse extends IresponseData {
  card?: string;
  person_code?: string;
  phone?: string;
  name?: string;
  surname?: string;
  email?: string;
  sex?: number;
  birth_date?: string;
  home_phone?: string;
  add_email?: string;
  city?: number;
  raion?: number;
  district?: number;
  street?: number;
  address?: string;
  working_sphere?: number;
  work_desc?: string;
  work_address?: string;
  client_income?: number;
  merrital_status?: number;
  fam_memb_quantity?: number;
  fam_member_under_18?: number;
  car_quantity?: number;
  family_income?: number;
  discount?: number;
  viplvl?: number;
  fb_token?: string;
  is_main_card?: true;
  full_address?: string;
  non_required_filled?: true;
}

class UserInfoService {
  GenerateUserInfo(data: IgetUserInfoDetailsRequest) {
    console.log('userinfooooooooooo', data);
    const result = axios.get<IresponseData>(
      `${envs.API_URL}api/Mobile/GetClientInfo`,
    );
    return from(result);
  }
}
export default new UserInfoService();
