import React, { useEffect, useState } from 'react';
import {ScrollView, Text, StyleSheet, View, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import AppButton from '../../components/CostumComponents/AppButton';
import {ScreenNavigationProp} from '../../interfaces/commons';
import {notAuthRoutes} from '../../navigation/routes';
import AuthService, { IAyuthData } from '../../services/AuthService';
import AsyncStorage from '../../services/StorageService';
import {getUserInfo, login} from '../../Store/actions/auth';
import Colors from '../../theme/Colors';
import { PASSCODEENABLED } from '../auth/Parameters';
import {
  AccessToken,
  GraphRequest,
  GraphRequestConfig,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import { getString } from '../../utils/converts';

interface IFbData {
  first_name?: string, 
  id?: number, 
  last_name?: string, 
  name?: string | null
}

const LoginScreen: React.FC<ScreenNavigationProp> = props => {
  const dispatch = useDispatch();
  const [isPasscodeEnabled, setIsPasscodeEnabed] = useState(false);
  const [userInfo, setUserInfo] = useState<IFbData>({name: null});
  const [loading, setLoading] = useState(false);

  const logoutWithFacebook = () => {
    LoginManager.logOut();
    setUserInfo({name: null});
  };
console.log(loading)
  const getInfoFromToken = (accessToken: string) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name',
      },
    };

    const config: GraphRequestConfig  = {
        accessToken, 
        parameters: PROFILE_REQUEST_PARAMS
    }

    const profileRequest = new GraphRequest(
      '/me',
      config,
      (error, user) => {
        if (error) {
          setLoading(false);
          console.log('login info has error: ' + error);
        } else {
          setUserInfo(user);
          console.log('result:', user);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const loginWithFacebook = () => {
    setLoading(true);
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(['public_profile']).then(
      login => {
        if (login.isCancelled) {
          setLoading(false);
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data?.accessToken.toString();
            if(accessToken) {
                getInfoFromToken(accessToken);
            }
          }).catch(e => {console.log(e); setLoading(false);});
        }
      },
      error => {
        setLoading(false);
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const LogIn = (token?:string) => {
    if (!token) {
      return;
    }
    const data: IAyuthData = {
      fb_token: token
    };
    AuthService.SignInFacebook(data).subscribe({
      next: async Response => {
        if (Response.access_token) {

          if(isPasscodeEnabled) {
            await AuthService.setToken(
              Response.access_token,
              Response.refresh_token,
            );
          }
          dispatch(getUserInfo());
          dispatch(login(Response.access_token, Response.refresh_token));
        }
      },
      complete: () => {
        console.log('complate');
        setLoading(false);
      },
      error: e => {console.log('err', e.response); setLoading(false);},
    });
  };

  useEffect(() => {
    if(userInfo.name) {
      LogIn(getString(userInfo.id?.toString()));
    }
  }, [userInfo])

  useEffect(() => {
    AsyncStorage.getItem(PASSCODEENABLED).then(pass => {
      if(pass) {
        setIsPasscodeEnabed(true);
      }
    })
  }, []);
  
  return (
    <ScrollView>
      <View style={styles.imgContainer}>
        <Image source={require('../../assets/img/authLogo.png')} />
      </View>

      <AppButton
        loading={loading}
        onPress={loginWithFacebook}
        title={'facebook-ით შესვლა'}
        backgroundColor={Colors.blue}
        
      />

      <View style={styles.titleView}>
        <Text style={styles.or}>ან</Text>
      </View>
      <AppButton
        onPress={() => {
          props.navigation.navigate(notAuthRoutes.authScreen);
        }}
        title={'ავტორიზაცია'}
        backgroundColor={Colors.bgGreen}
      />
      <View style={styles.btnWrapper}>
        <AppButton
          onPress={() => {
            props.navigation.navigate(notAuthRoutes.registration);
           
          }}
          title={'რეგისტრაცია'}
          backgroundColor={Colors.lightOrange}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  titleView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: Colors.bgGreen,
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  or: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
    color: Colors.lightOrange,
  },
  btnWrapper: {
    paddingVertical: 60,
  },
});

export default LoginScreen;
