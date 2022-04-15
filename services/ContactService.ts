import axios from 'axios';
import {from} from 'rxjs';
import envs from '../config/env';

interface IresponseData {
  resultCode?: string;
  displayText?: string;
  errorMessage?: string;
}

export interface IgetContactDetailsRequest {
  lang: string;
  app_source?: string;
  culture?: string;
}

export interface IgetContactResponse extends IresponseData {
  phone?: string;
  work_hours?: string;
  web_page_link?: string;
  fb_link?: string;
  contact_email?: string;
}

class ContactService {
  GenerateContact(data: IgetContactDetailsRequest) {
    console.log('contact', data);
    const result = axios.get<IresponseData>(
      `${envs.API_URL}api/Mobile/GetContactInfo`,
    );
    return from(result);
  }
}
export default new ContactService();
