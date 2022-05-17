import axios from 'axios';
import {from} from 'rxjs';
import envs from '../config/env';

interface IFilterresponseData {
  resultCode?: string;
  displayText?: string;
  errorMessage?: string;
  categories?: IgetfilterCategoriesResponse[];
  customer_types?: IgetfilterCustomTypeResponse[];
  delivery_methods?: IgetfilterDeliveryResponse[];
  price_ranges?: IgetfilterPriceResponse[];
  product_types?: IgetfilterProductTypeResponse[];
}

export interface IgetFilterRequest {
  lang: string;
  app_source?: string;
  culture?: string;
}

export interface IgetfilterCategoriesResponse extends IFilterresponseData {
  id?: string;
  is_hidden?: true;
  name?: string;
}
export interface IgetfilterCustomTypeResponse extends IFilterresponseData {
  id?: string;
  name?: string;
}
export interface IgetfilterDeliveryResponse extends IFilterresponseData {
  id?: string;
  text?: string;
  note?: string;
}
export interface IgetfilterPriceResponse extends IFilterresponseData {
  id?: string;
  range_description?: string;
}
export interface IgetfilterProductTypeResponse extends IFilterresponseData {
  id?: string;
  name?: string;
}

class FilterService {
  GenerateFilter() {
    const result = axios.get<IFilterresponseData>(
      `${envs.API_URL}api/Mobile/GetProductFilters`,
    );
    return from(result);
  }
}
export default new FilterService();
