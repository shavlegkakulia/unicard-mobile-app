import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  AccessToken,
  GraphRequest,
  GraphRequestConfig,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';

export default class FBAuth extends Component {
  state = {userInfo: {name: null}};

  logoutWithFacebook = () => {
    LoginManager.logOut();
    this.setState({userInfo: {}});
  };

  getInfoFromToken = (accessToken: string) => {
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
          console.log('login info has error: ' + error);
        } else {
          this.setState({userInfo: user});
          console.log('result:', user);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  loginWithFacebook = () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(['public_profile']).then(
      login => {
        if (login.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data?.accessToken.toString();
            if(accessToken) {
                this.getInfoFromToken(accessToken);
            }
          }).catch(e => console.log(e));
        }
      },
      error => {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  render() {
    const isLogin = this.state.userInfo.name;
    const buttonText = isLogin ? 'Logout With Facebook' : 'Login From Facebook';
    const onPressButton = isLogin
      ? this.logoutWithFacebook
      : this.loginWithFacebook;
    return (
      <View style={{flex: 1, margin: 50}}>
        <TouchableOpacity
          onPress={onPressButton}
          style={{
            backgroundColor: 'blue',
            padding: 16,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white'}}>{buttonText}</Text>
        </TouchableOpacity>
        {this.state.userInfo.name && (
          <Text style={{fontSize: 16, marginVertical: 16, color: '#fff'}}>
            Logged in As {this.state.userInfo.name}
          </Text>
        )}
      </View>
    );
  }
}