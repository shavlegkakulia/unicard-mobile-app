import axios from 'axios';
import {from} from 'rxjs';
import envs from '../config/env';

interface IresponseData {
  resultCode?: string;
  displayText?: string;
  errorMessage?: string;
}

export interface IgetMerchantsRequest {
  lang?: string;
  app_source?: string;
  culture?: string;
  org_id?: string;
  city_id?: string;
  district_id?: string;
}

export interface IMerchants {
  merch_id?: string;
  org_id?: string;
  merch_name?: string;
  logo_url?: string;
  address?: string;
  org_point_desc?: string;
  city?: string;
  district?: string;
  lat: string;
  lon: string;
  unit?: string;
  unit_score?: string;
  new_id?: string;
  unit_desc?: string;
}

export interface IgetMerchantsResponse extends IresponseData {
  merchants: IMerchants[]
}

class MerchantsService {
  GetMerchantList(data?: IgetMerchantsRequest) {
    const result = axios.post<IgetMerchantsResponse>(
      `${envs.API_URL}api/Mobile/GetMerchantList`,
      data,
    );
    return from(result);
  }
}

export default new MerchantsService();
