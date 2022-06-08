import {
  AccessToken,
  GraphRequest,
  GraphRequestConfig,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';

export interface IFbData {
  first_name?: string;
  id?: number;
  last_name?: string;
  name?: string | null;
}

export default new (class FbService {
  constructor() {
    this.userInfo = {name: null};
  }

  userInfo: IFbData;

  logoutWithFacebook = () => {
    LoginManager.logOut();
    this.userInfo = {name: null};
  };

  getInfoFromToken = (
    accessToken: string,
    strUser: (u: IFbData | undefined) => void,
    callback: (status: boolean) => void,
  ) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name',
      },
    };

    const config: GraphRequestConfig = {
      accessToken,
      parameters: PROFILE_REQUEST_PARAMS,
    };

    const profileRequest = new GraphRequest('/me', config, (error, user) => {
      if (error) {
        callback(false);
      } else {
        strUser(user);
      }
    });
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  loginWithFacebook = (
    strUser: (u: IFbData | undefined) => void,
    callback: (status: boolean) => void,
  ) => {
    callback(true);
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(['public_profile']).then(
      login => {
        if (login.isCancelled) {
          callback(false);
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken()
            .then(data => {
              const accessToken = data?.accessToken.toString();
              if (accessToken) {
                this.getInfoFromToken(accessToken, strUser, callback);
              }
            })
            .catch(e => {
              console.log(e);
              callback(false);
            });
        }
      },
      error => {
        callback(false);
        console.log('Login fail with error: ' + error);
      },
    );
  };
})();
