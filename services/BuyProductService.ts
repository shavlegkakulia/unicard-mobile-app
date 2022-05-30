import axios from 'axios';
import {from, subscribeOn} from 'rxjs';
import envs from '../config/env';

interface IresponseData {
  resultCode?: string;
  displayText?: string;
  errorMessage?: string;
  cl_code?: string;
}

export interface IBuyProductDetailsRequest {
  user_id?: string;
  lang: string;
  app_source?: string;
  culture?: string;
}

export interface IBuyProductServiceResponse extends IresponseData {
  product_id?: string;
  delivery_method_id?: string;
  discount_id?: string;
  guid?: string;
  bonus_amount?: string;
  quantity?: string;
  service_center_id?: string;
  recipient_full_name?: string;
  recipient_personal_id?: string;
  online_payment_identifier?: string;
  amount?: number;
  recipient_address?: string;
  recipient_phone?: string;
  tran_date?: string;
  delivery_date?: string;
  comment?: string;
  product_type?: string;
  surname?: string;
  name?: string;
}

class BuyProductService {
  GenerateProduct(data: IBuyProductServiceResponse | undefined) {
    const response = axios.post<IresponseData>(
      `${envs.API_URL}api/Mobile/BuyProduct`,
      data,
      {
        objectResponse: true,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return from(response);
  }
}
export default new BuyProductService();
