import axios from 'axios';
import {from} from 'rxjs';
import envs from '../config/env';

interface IresponseData {
  resultCode?: string;
  displayText?: string;
  errorMessage?: string;
}
export interface Igeneralresp extends IresponseData {
    news?: IgetNewsResponse[];
  }

export interface IgetNewsDetailsRequest {
  user_id?: string;
  row_count?: string;
  row_index?: string;
  start_date?: string;
  end_date?: string;
  lang: string;
  app_source?: string;
  culture?: string;
}

export interface IgetNewsResponse {
  id?: string;
  title?: string;
  description?: string;
  createDate?: string;
  image?: string;
}

class NewsService {
  GenerateNews() {
    const result = axios.get<IresponseData>(
      `${envs.API_URL}api/Mobile/GetNewsList`,
    );
    return from(result);
  }
}
export default new NewsService();
