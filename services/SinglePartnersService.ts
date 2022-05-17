import axios from 'axios';
import {from} from 'rxjs';
import envs from '../config/env';

interface IPartnersresponseData {
  resultCode?: string;
  displayText?: string;
  errorMessage?: string;
  total_count?: string;
  organization?: IgetPartnersResponse;
}

export interface IgetPartnersDetailsRequest {
  org_id?: string;
  lang: string;
  app_source?: string;
  culture?: string;
}

export interface IgetPartnersResponse extends IPartnersresponseData {
  lang?: string;
  org_id?: string;
  name?: string;
  url?: string;
  point_desc?: string;
  sector?: string;
  sector_name?: string;
  sub_sector?: string;
  sub_sector_name?: string;
  org_desc?: string;
  org_short_desc?: string;
  org_service_desc?: string;
  org_phone?: string;
  org_phone_s?: string;
  org_fb?: string;
  org_email?: string;
  org_working_hours?: string;
  org_working_hours_s?: string;
  unit?: string;
  unit_score?: string;
  org_web_add?: string;
  slogan?: string;
  unit_desc?: string;
  city_name?: string;
  district_name?: string;
  address?: string;
}

class SinglePartnersService {
  GenerateSinglePartners(data: IgetPartnersDetailsRequest) {
    let query = `?org_id=${data.org_id}`;
    if (data.lang) {
      query += `&lang=${data.lang}`;
    }
    if (data.app_source) {
      query += `&app_source${data.app_source}`;
    }
    if (data.culture) {
      query += `&culture${data.culture}`;
    }
    const result = axios.get<IPartnersresponseData>(
      `${envs.API_URL}api/Mobile/GetOrgDetails${query}`,
    );
    return from(result);
  }
}

export default new SinglePartnersService();
