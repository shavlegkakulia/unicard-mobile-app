import axios from 'axios';
import {from} from 'rxjs';
import envs from '../config/env';

interface IPartnersresponseData {
  resultCode?: string;
  displayText?: string;
  errorMessage?: string;
  partners?: IgetPartnersResponse[];
}

export interface IgetPartnersDetailsRequest {
  lang: string;
  app_source?: string;
  culture?: string;
}

export interface IgetPartnersResponse extends IPartnersresponseData {
    partner_id?: number;
    partner_name?: string;
    partner_logo?: string;
}

class PartnersService {
  GeneratePartners() {
    const result = axios.get<IPartnersresponseData>(
      `${envs.API_URL}api/Mobile/GetOnlinePartners`,
    );
    return from(result);
  }
}
export default new PartnersService();
