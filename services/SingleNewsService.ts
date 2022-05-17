import axios from 'axios';
import {from} from 'rxjs';
import envs from '../config/env';

interface IGetsingleNewsResponseData {
  resultCode?: string;
  displayText?: string;
  errorMessage?: string;
  news?: IgetSingleNewsResponse;
}

export interface IgetSingleNewsDetailsRequest {
  news_id?: string;
  user_id?: string;
  lang: string;
  app_source?: string;
  culture?: string;
}

export interface IgetSingleNewsResponse extends IGetsingleNewsResponseData {
  id?: string;
  title?: string;
  description?: string;
  createDate?: string;
  image?: string;
}

class SingleNewsService {
  getSingleNewsDetails(data: IgetSingleNewsDetailsRequest) {
    let query = `?news_id=${data.news_id}`;
    if (data.lang) {
      query += `&lang=${data.lang}`;
    }
    if (data.app_source) {
      query += `&app_source${data.app_source}`;
    }
    if (data.culture) {
      query += `&culture${data.culture}`;
    }
    if (data.user_id) {
      query += `&user_id${data.user_id}`;
    }
    const result = axios.get<IgetSingleNewsResponse>(
      `${envs.API_URL}api/Mobile/GetNewsById${query}`,
    );
    return from(result);
  }
}

export default new SingleNewsService();
