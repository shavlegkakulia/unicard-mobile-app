import axios from 'axios';
import {from} from 'rxjs';
import envs from '../config/env';

interface IresponseData {
  resultCode?: string;
  displayText?: string;
  errorMessage?: string;
}

export interface IgetProducteDetailsRequest {
  product_id?: number;
  user_id?: string;
  lang: string;
  app_source?: string;
  culture?: string;
}

export interface IgetProducteResponse extends IresponseData {
  id?: number;
  name: string;
  description?: string;
  // descriptionList?: string[];
  //addresList?: string[];
  price: string;
  title?: string;
  short_desc?: string;
  images?: string[];
  show_brand: boolean;
  show_delivery_form: boolean;
  catalog_id: string;
}

class ProducteService {
  getOfferDetails(data: IgetProducteDetailsRequest) {
    let query = `?product_id=${data.product_id}`;
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
    const result = axios.get<IgetProducteResponse>(
      `${envs.API_URL}api/Mobile/GetProductById${query}`,
    );
    return from(result);
  }
}

export default new ProducteService();
