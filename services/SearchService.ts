import axios from 'axios';
import {from} from 'rxjs';
import envs from '../config/env';

export interface ISearchresponseData {
  resultCode?: string;
  displayText?: string;
  errorMessage?: string;
  search_result: ISearchServiceResponse[] | [];
}

export interface ISearchDetailsRequest {
  lang?: string;
  app_source?: string;
  culture?: string;
  input_text?: string;
  page_index?: string;
  row_count?: string;
  prizes?: boolean;
  organisations?: boolean;
}

export interface ISearchServiceResponse {
  result_from?: string;
  result_id?: string;
  type_id?: string;
  result_name?: string;
  image_url?: string;
  discounted_price?: string;
  discounted_percent?: string;
  price?: string;
  point_desc?: string;
  unit?: string;
  unit_score?: string;
}

class SearchService {
  GenerateSearch(data: ISearchDetailsRequest | undefined) {
    const response = axios.post<ISearchresponseData>(
      `${envs.API_URL}api/Mobile/Search`,
      data,
      {
        objectResponse: true,
        headers: {
            'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
          
        },
      },
    );
    return from(response);
  }
}
export default new SearchService();
