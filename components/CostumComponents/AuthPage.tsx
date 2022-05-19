import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

import Colors from '../../theme/Colors';
import navigation from '../navigation/navigation';
import UserInfoService, {
  IgetUserInfoDetailsRequest,
  IgetUserServiceResponse,
} from '../../services/UserInfoService';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import AuthService, {IAyuthData} from '../../services/AuthService';
import {login} from '../../Store/actions/auth';
import AppTextInput from './AppTextInput';
import AppButton from './AppButton';
import {ScreenNavigationProp} from '../../interfaces/commons';
import AsyncStorage from '../../services/StorageService';
import {notAuthRoutes} from '../../navigation/routes';
import { PASSCODEENABLED } from '../../screens/auth/Parameters';
import PassCode from './PassCode';

interface IUserData {
  password?: string;
  email?: string;
  surname?: string;
  name?: string;
}

const AuthPage: React.FC<ScreenNavigationProp> = props => {
  const navigation = useNavigation();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [userData, setUserData] = useState<IUserData>({
    password: '',
    email: '',
  });
  const [isPasscodeEnabled, setIsPasscodeEnabed] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem(PASSCODEENABLED).then(pass => {
      if(pass) {
        setIsPasscodeEnabed(true);
      }
    })
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('userInfo').then(res => {
      if (res !== null) {
        const udata = JSON.parse(res);
        setUserData({
          email: udata.email,
          surname: udata.surname,
          name: udata.name,
        });
      }
    });
  }, []);

  const LogIn = () => {
    console.log(userData);
    if (!userData?.email || !userData?.password) {
      return;
    }
    const data: IAyuthData = {
      password: userData?.password,
      username: userData?.email,
    };
    AuthService.SignIn(data).subscribe({
      next: async Response => {
        if (Response.access_token) {
          if(isPasscodeEnabled) {
            await AuthService.setToken(
              Response.access_token,
              Response.refresh_token,
            );
          }

          dispatch(login(Response.access_token, Response.refresh_token));
        }
      },
      complete: () => {
        console.log('complate');
      },
      error: e => console.log('err', e.response),
    });
  };

  return (
    <ScrollView>
      <Modal visible={isPasscodeEnabled} onRequestClose={() => {
        setIsPasscodeEnabed(false);
      }}>
        <PassCode isLogin={true} />
      </Modal>
      <View style={styles.avatarView}>
        <Image
          style={styles.avatar}
          source={require('../../assets/img/avatar.png')}
        />
        <Text style={styles.name}>
          {userData?.name} {userData?.surname}
        </Text>
      </View>
      <View style={styles.btnWrapper}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => props.navigation.navigate(notAuthRoutes.authScreen)}>
          <Text style={styles.btnText}>სხვა მომხმარებლით შესვლა</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView style={styles.inputView}>
        <AppTextInput
          placeholder="პაროლი"
          secureTextEntry={true}
          value={userData?.password}
          onChange={e => setUserData({...userData, password: e})}
        />
        <View style={styles.button}>
          <AppButton
            onPress={LogIn}
            title={'შემდეგი'}
            backgroundColor={Colors.bgGreen}
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 50,
  },
  avatarView: {
    alignItems: 'center',
    marginTop: 27,
  },
  name: {
    marginTop: 12,
    fontSize: 18,
    lineHeight: 21.6,
    color: Colors.black,
    fontFamily: 'BPG DejaVu Sans Mt',
  },
  btnWrapper: {
    alignItems: 'center',
    marginTop: 19,
  },
  btn: {
    width: 219,
    height: 36,
    borderRadius: 20,
    backgroundColor: Colors.authBtn,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 12,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 14.4,
    color: Colors.authBtnText,
  },
  inputView: {
    alignItems: 'center',
  },
  checkBoxView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 325,
    marginTop: 32,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 14.4,
    color: Colors.darkGrey,
  },
  button: {
    marginTop: 95,
  },
});

export default AuthPage;
