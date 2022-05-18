import axios, {AxiosRequestConfig} from 'axios';
import {from, Observable, Subscriber} from 'rxjs';
import storage from './StorageService';
import envs from '../config/env';
import {IgetProducteResponse} from './ProductService';

interface IresponseData {
  resultCode?: string;
  displayText?: string;
  errorMessage?: string;
}

export interface Igeneralresp extends IresponseData {
  products: IgetProducteListResponse[];
}
export interface IgetProducteListRequest {
  page_index?: string;
  row_count?: string;
  latest_prod?: boolean;
  category_id?: string;
  sub_category_id?: string;
  brand_id?: string;
  customer_type_id?: string;
  delivery_method_id?: string;
  product_type_id?: string;
  special_offers?: boolean;
  season_offers?: boolean;
  discounted?: boolean;
  price_range_id?: string;
  name?: string;
  user_id?: string;
  order_by?: string;
  lang?: string;
  culture?: string;
}

export interface IgetProducteListResponse {
  id?: number;
  name?: string;
  price: string;
  images?: string[];
  org_image?: string;
  type_id?: string;
}

class ProductList {
  getList() {

    const result = axios.get<Igeneralresp>(
      `${envs.API_URL}api/Mobile/GetProductList`,
    );
    return from(result);
  }
}

export default new ProductList();
