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
  category_id?: string;
}

class ProductList {
  getList(data?: IgetProducteListRequest) {
    let q = '';
    if (data?.page_index) {
      q = '?page_index=' + data.page_index;
    }
    if (data?.row_count) {
      if (q.length) {
        q += `&row_count=${data.row_count}`;
      } else {
        q = `?row_count=${data.row_count}`;
      }
    }
    if (data?.discounted) {
      q = '?discounted=' + data.discounted;
    }
    if (data?.latest_prod) {
      q = '?latest_prod=' + data.latest_prod;
    }
    if (data?.category_id) {
      q = '?category_id=' + data.category_id;
    }

    console.log(
      'products api call',
      `${envs.API_URL}api/Mobile/GetProductList${q}`,
    );
    const result = axios.get<Igeneralresp>(
      `${envs.API_URL}api/Mobile/GetProductList${q}`,
    );
    return from(result);
  }

  // addquery(query:strung,prop:string,value:string){
  //   if(query.length){
  //      query = query+'&'+prop+'='+value
  //   }else{
  //     query ='?'+prop+'='+value
  //   }
  //   return query;
  // }
}

export default new ProductList();
