import axios, {AxiosRequestConfig} from 'axios';
import {from} from 'rxjs';
import storage from './../services/StorageService';
import envs from './../config/env';

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

interface IAyuthData {
  email: string;
  password: string;
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
    const loginObj = new FormData();
    loginObj.append('email', data.email)
    const promise = axios.post(`${envs.CONNECT_URL}connect/token`, loginObj, {
      fromLogin: true,
      objectResponse: true,
      skipRefresh: true,
    });
    return from(promise);
  }

  async SignOut(): Promise<void> {
    await this.removeToken();
  }

  registerAuthInterceptor(callBack: any) {
    const setAuthToken = async (config: AxiosRequestConfig) => {
      config.headers = config.headers || {};
      let token = await this.getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    };

    const waitForRefresh = (config?: AxiosRequestConfig) => {
      return new Promise(resolve => {
        let interval = setInterval(() => {
          if (this.refreshStarted) return;
          clearInterval(interval);
          resolve(config);
        }, 500);
      });
    };

    //add auth header
    let requestInterceptor = axios.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        if ((await this.isAuthenticated()) && !config.anonymous) {
          //if refreshStarted wait
          if (this.refreshStarted && !config.skipRefresh) {
            return waitForRefresh(config).then(async (config: any) => {
              if (!(await this.getToken()))
                return Promise.reject({status: 401});
              await setAuthToken(config);
              return Promise.resolve(config);
            });
          }

          await setAuthToken(config);
        }
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
            if (!(await this.getToken())) return Promise.reject({status: 401});
            setAuthToken(originalRequest);
            return axios(originalRequest);
          });
        }

        //refresh token
        this.refreshStarted = true;
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          skipRefresh: true,
        };
        const refreshObj = new URLSearchParams();
        refreshObj.append('grant_type', 'refresh_token');
        refreshObj.append('client_id', 'ClientApp');
        refreshObj.append('client_secret', 'secret');
        refreshObj.append(
          'refresh_token',
          (await this.getRefreshToken()) || '',
        );
        return await axios
          .post<IAuthResponse>(
            `${envs.CONNECT_URL}/connect/token`,
            refreshObj,
            config,
          )
          .then(async response => {
            if (!response.data.access_token) throw response;
            await this.setToken(
              response.data.access_token,
              response.data.refresh_token,
            );
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
