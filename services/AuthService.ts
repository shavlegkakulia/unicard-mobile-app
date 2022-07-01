import axios, {AxiosRequestConfig} from 'axios';
import {from, Observable, Subscriber} from 'rxjs';
import storage from './../services/StorageService';
import envs from './../config/env';
import Store from '../Store';
import { PASSCODEENABLED } from '../screens/auth/Parameters';
import { AuthActions, IAuthAction } from '../Store/types/auth';
import { EN_US, KA_GE, ka_ge } from '../lang';
import storage_keys from '../constants/storageKeys';

export interface IInterceptop {
  unsubscribe: () => void;
}

export interface IAuthResponse {
  refresh_token: string;
  access_token: string;
  expires_in: Number;
  scope: string;
  token_type: string;
  errors?: any | undefined;
  status?: number;
}

export interface IAyuthData {
  username?: string;
  password?: string;
  fb_token?: string;
}

export interface IRegisterRequestData {
  user_name?: string;
  name?: string;
  surname?: string;
  person_code?: string;
  birthDate?: string;
  phone?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
  fb_token?: string;
  card?: string;
  new_card_registration?: string;
  sms_code_otp?: string;
}

interface IRegisterResponse {
  succes: boolean;
}
export interface IAuthOtp {
  phone: string;
}

export interface IChangePasswordRequestData {
  password?: string;
  new_password?: string;
  confirm_password?: string;
}


export default new (class AuthService {
  refreshStarted: any;
  async getToken(): Promise<string | null> {
    return await storage.getItem('access_token');
  }

  async getRefreshToken(): Promise<string | null> {
    return await storage.getItem('refresh_token');
  }

  async isAuthenticated(): Promise<boolean | null> {
    let token = await this.getToken();
    let refreshToken = await this.getRefreshToken();

    return token != null || refreshToken != null;
  }

  async setToken(token: string, refreshToken: string): Promise<void> {
    await storage.setItem('access_token', token);

    if (refreshToken !== undefined) {
      storage.setItem('refresh_token', refreshToken);
    }
  }

  async removeToken(): Promise<void> {
    await storage.removeItem('access_token');
    await storage.removeItem('refresh_token');
  }

  SignIn(data: IAyuthData) {
    return new Observable<IAuthResponse>(
      (observer: Subscriber<IAuthResponse>) => {
        const loginObj = `username=${data.username}&password=${data.password}&scope=unicardApi%20offline_access&grant_type=password&client_secret=${envs.client_secret}&client_id=${envs.client_id}`;

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.responseType = 'json';

        xhr.addEventListener('readystatechange', function () {
          if (this.readyState === 4) {
            if (xhr.status == 200) {
              observer.next(this.response);
              observer.complete();
            } else {
              observer.error(xhr);
            }
          }
        });

        xhr.open('POST', `${envs.API_URL}connect/token`);
        xhr.setRequestHeader(
          'Content-Type',
          'application/x-www-form-urlencoded',
        );

        xhr.send(loginObj);
      },
    );
  }

  SignInFacebook(data: IAyuthData) {
    return new Observable<IAuthResponse>(
      (observer: Subscriber<IAuthResponse>) => {
        const loginObj = `fb_token=${data.fb_token}&scope=unicardApi%20offline_access&grant_type=Facebook&client_secret=${envs.client_secret}&client_id=${envs.client_id}`;

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.responseType = 'json';

        xhr.addEventListener('readystatechange', function () {
          if (this.readyState === 4) {
            if (xhr.status == 200) {
              observer.next(this.response);
              observer.complete();
            } else {
              observer.error(xhr);
            }
          }
        });

        xhr.open('POST', `${envs.API_URL}connect/token`);
        xhr.setRequestHeader(
          'Content-Type',
          'application/x-www-form-urlencoded',
        );

        xhr.send(loginObj);
      },
    );
  }

  SignUp(data: IRegisterRequestData | undefined) {
    const response = axios.post<IRegisterResponse>(
      `${envs.API_URL}api/Mobile/UserRegistration`,
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

  async SignOut(): Promise<void> {
    await this.removeToken();
  }


  SendOtp(data: IAuthOtp | undefined) {
    const response = axios.post<IRegisterResponse>(
      `${envs.API_URL}api/Mobile/SendOTP`,
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

  ChangePassword(data: IChangePasswordRequestData | undefined) {
    const response = axios.post<IRegisterResponse>(
      `${envs.API_URL}api/Mobile/ChangePassword`,
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

  registerAuthInterceptor(callBack: any) {
    const setAuthToken = async (config: AxiosRequestConfig) => {
      config.headers = config.headers || {};
      let { token } = Store.getState().AuthReducer;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    };

    const waitForRefresh = (config?: AxiosRequestConfig) => {
      return new Promise(resolve => {
        let interval = setInterval(() => {
          if (this.refreshStarted) {
            return;
          }
          clearInterval(interval);
          resolve(config);
        }, 500);
      });
    };

    //add auth header
    let requestInterceptor = axios.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        let { token, isAuthentificated } = Store.getState().AuthReducer;
        if (isAuthentificated && !config.anonymous) {
          //if refreshStarted wait
          if (this.refreshStarted && !config.skipRefresh) {
            return waitForRefresh(config).then(async (config: any) => {
              
              if (!token) {
                return Promise.reject({status: 401});
              }
              await setAuthToken(config);
              return Promise.resolve(config);
            });
          }

          await setAuthToken(config);
        }
        const lkey = await storage.getItem(storage_keys.locales);
        config.headers['lang'] = lkey === ka_ge ? KA_GE : EN_US;
        return config;
      },
    );

    let responseInterceptor = axios.interceptors.response.use(
      response => {
        return response;
      },
      async (error: any) => {
        //  console.log('<----- Error in Auth Interceptor ----->', JSON.stringify(error.response), JSON.parse(JSON.stringify(error.response)).data.error)
        error.response = error.response || {};

        //Reject promise if usual error
        if (
          (error?.response?.status !== 401 &&
            error?.response?.status !== 403) ||
          error.config.anonymous ||
          error.config.skipRefresh
        ) {
          return Promise.reject(error);
        }
        const originalRequest = error.config;
        //if refresh already started wait and retry with new token
        if (this.refreshStarted) {
          return waitForRefresh().then(async _ => {
            let { token } = Store.getState().AuthReducer;
            if (!token) {
              return Promise.reject({status: 401});
            }
            setAuthToken(originalRequest);
            return axios(originalRequest);
          });
        }

        //refresh token
        this.refreshStarted = true;
        const isPassCodeEnabled = await storage.getItem(PASSCODEENABLED);
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          skipRefresh: true,
        };
        let { refreshToken } = Store.getState().AuthReducer;
        const refreshObj = new URLSearchParams();
        refreshObj.append('grant_type', 'refresh_token');
        refreshObj.append('client_id', 'ClientApp');
        refreshObj.append('client_secret', 'secret');
        refreshObj.append(
          'refresh_token',
          (refreshToken) || '',
        );
        return await axios
          .post<IAuthResponse>(
            `${envs.API_URL}connect/token`,
            refreshObj,
            config,
          )
          .then(async response => {
            if (!response.data.access_token) {
              throw response;
            }
            if(isPassCodeEnabled) {
              await this.removeToken();
            await this.setToken(
              response.data.access_token,
              response.data.refresh_token,
            );
            }
            Store.dispatch<IAuthAction>({
              type: AuthActions.setToken,
              token: response.data.access_token,
            });
            Store.dispatch<IAuthAction>({
              type: AuthActions.setRefreshToken,
              refreshToken: response.data.refresh_token,
            });
            this.refreshStarted = false;
            setAuthToken(originalRequest);
            return axios(originalRequest);
          })
          .catch(err => {
            this.refreshStarted = false;
            callBack().then(() => {});
            return Promise.reject(err);
          });
      },
    );

    return {
      unsubscribe: () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responseInterceptor);
      },
    };
  }
})();
