import axios from 'axios';
import {from} from 'rxjs';
import envs from '../config/env';

interface IresponseData {
  resultCode?: string;
  displayText?: string;
  errorMessage?: string;
}

export interface IgetBarcodeDetailsRequest {
  user_id?: string;
  lang: string;
  app_source?: string;
  culture?: string;
}

export interface IgetBarcodeResponse extends IresponseData {
  vcard?: string;
}

export interface IBarcodeRequestData {
  input?: string;
}

export interface IBarcodeResponseData extends IresponseData {
  barcode?: string;
}
class CardService {
  GenerateBarcode(data: IgetBarcodeDetailsRequest) {
    const result = axios.get<IresponseData>(
      `${envs.API_URL}api/Mobile/GetVirtualCard`,
    );
    return from(result);
  }
  GenerateBarcodeFile(card: IBarcodeRequestData) {
    const result = axios.post<IBarcodeResponseData>(
      `${envs.API_URL}/api/File/GenerateBarcode`,
      card,
      {
        objectResponse: true,
        headers: {
          'Content-Type': 'application/json',
        },
        
      },
    );
    return from(result);
  }
}
export default new CardService();
