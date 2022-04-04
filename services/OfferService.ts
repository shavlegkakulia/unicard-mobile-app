import axios, {AxiosRequestConfig} from 'axios';
import {from, Observable, Subscriber} from 'rxjs';
import storage from './../services/StorageService';
import envs from './../config/env';

interface IresponseData {
  resultCode?: string;
  displayText?: string;
  errorMessage?: string;
}

export interface IgetOfferDetailsRequest {
  offer_id?: number;
  lang?: string;
  app_source?: string;
  culture?: string;
}

interface IgetOfferDetailsResponseData extends IresponseData {
  offer?: IgetOfferResponse;
}

export interface IgetOfferResponse {
  id?: number;
  beacon_id?: number;
  description?: string;
  title?: string;
  short_desc?: string;
  image_url?: string;
}

class OfferService {
  getOfferDetails(data: IgetOfferDetailsRequest) {
    let query = `?offer_id=${data.offer_id}`;
    if (data.lang) {
      query += `&lang=${data.lang}`;
    }
    if (data.app_source) {
      query += `&app_source${data.app_source}`;
    }
    if (data.culture) {
      query += `&culture${data.culture}`;
    }
    const result = axios.get<IgetOfferDetailsResponseData>(
      `${envs.API_URL}Mobile/GetOfferDetails${query}`,
    );
    return from(result);
  }
}

export default new OfferService();
