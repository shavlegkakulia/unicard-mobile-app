import axios from 'axios';
import {from} from 'rxjs';
import envs from '../config/env';

export interface IGetPaymentResponseData {
  resultCode?: string;
  displayText?: string;
  errorMessage?: string;
  payment_info_list?: IgetPaymentResponse[];
}
// export interface IgeneralPaymentResp extends IGetPaymentResponseData {
 
// }

export interface IgetPaymentDetailsRequest {
  user_id?: string;
  product_id?: string;
  subscriber_number?: string;
  lang?: string;
  app_source?: string;
  culture?: string;
}

export interface IgetPaymentResponse extends IGetPaymentResponseData  {
  description?: string;
  value?: string;
}

class PaymentService {
  GeneratePaymentInfo(data: IgetPaymentDetailsRequest) {
    console.log(data);
    const result = axios.get<IgetPaymentResponse>(
      `${envs.API_URL}api/Mobile/GetOnlinePaymentInfo?user_id=${data.user_id}&product_id=${data.product_id}&subscriber_number=${data.subscriber_number}`,
    );
    return from(result);
  }
}
export default new PaymentService();
