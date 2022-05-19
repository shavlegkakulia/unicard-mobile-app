import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import Colors from '../../theme/Colors';
import UserInfoService, {
  IgetUserInfoDetailsRequest,
  IgetUserServiceResponse,
} from '../../services/UserInfoService';
import AsyncStorage from '../../services/StorageService';
import {PASSCODEENABLED} from '../../screens/auth/Parameters';
import {useNavigation} from '@react-navigation/native';
import {authRoutes} from '../../navigation/routes';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../Store/actions/auth';
import AuthService from '../../services/AuthService';
import { IAuthReducer, IAuthState } from '../../Store/types/auth';

interface IPageProps {
  isLogin?: boolean;
}

const PassCode: React.FC<IPageProps> = props => {
  const [user, setUser] = useState<IgetUserServiceResponse>();
  const [{code, code2}, setCode] = useState({code: '', code2: ''});
  const auth = useSelector<IAuthReducer>(state => state.AuthReducer) as IAuthState;

  const nav = useNavigation();
  const dispatch = useDispatch();

  const Check = (c: string) => {
    let _code = code + c;
    setCode({code: _code, code2: code2});
  };

  const setPssCode = (c: string) => {
    if (props.isLogin) {
      Check(c);
      return;
    }
    if (code.length < 4) {
      let _code = code + c;
      setCode({code: _code, code2: code2});
    } else {
      let _code = code2 + c;
      setCode({code: code, code2: _code});
    }
  };

  const removePassCode = () => {
    if (code.length <= 0) return;

    if (props.isLogin) {
      let _code = code.slice(0, code.length - 1);
      setCode({code: _code, code2: code2});
      return;
    }

    if (code2.length > 0) {
      let _code = code2.slice(0, code2.length - 1);
      setCode({code2: _code, code: code});
    } else {
      let _code = code.slice(0, code.length - 1);
      setCode({code: _code, code2: code2});
    }
  };

  const getUserInfo = () => {
    const req: IgetUserInfoDetailsRequest = {
      user_id: '',
      lang: '',
    };
    UserInfoService.GenerateUserInfo(req).subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          setUser(Response.data);
        }
      },
      error: err => {
        console.log(err.response);
      },
    });
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (props.isLogin) {
      AsyncStorage.getItem(PASSCODEENABLED).then(pass => {
        if (pass) {
          setCode({code: code, code2: pass});
        }
      });
    }
  }, []);

  useEffect(() => {
    if (props.isLogin && code2.length === 4 && code === code2) {
      (async () => {
        const token = await AuthService.getToken();
        const refresh = await AuthService.getRefreshToken();
        if (token && refresh) dispatch(login(token, refresh));
      })();
      if (code.length === 4 && code !== code2) {
        setCode({code: '', code2: code2});
      }
    }
 
   
  }, [code]);

  let p1 = false;
  let p2 = false;
  let p3 = false;
  let p4 = false;

  if (code.length > 0) {
    p1 = true;
  }
  if (code.length > 1) {
    p2 = true;
  }
  if (code.length > 2) {
    p3 = true;
  }
  if (code.length > 3) {
    p4 = true;
  }
  if (!props.isLogin) {
    if (code.length >= 4) {
      p1 = p2 = p3 = p4 = false;
    }
    if (code2.length > 0) {
      p1 = true;
    }
    if (code2.length > 1) {
      p2 = true;
    }
    if (code2.length > 2) {
      p3 = true;
    }
    if (code2.length > 3) {
      p4 = true;
    }
  }

  useEffect(() => {
    if (code2.length > 0 && !props.isLogin) { 
      if (code2 === code) {
        (async () => {
          await AsyncStorage.setItem(PASSCODEENABLED, code);
          await AuthService.setToken(auth.token || '', auth.refreshToken || '');

          nav.navigate(authRoutes.parameters, {
            isPassEnabled: new Date().toLocaleTimeString(),
          });
        })();
      } else {
        //error. not equals
      }
    }
    
  }, [code2]);

  return (
    <ScrollView>
      <View style={styles.titleView}>
        <Text style={styles.title}>პინ-კოდის ცვლილება</Text>
      </View>
      <View style={styles.avatarView}>
        <Image
          style={styles.avatar}
          source={require('../../assets/img/avatar.png')}
        />
        <Text style={styles.name}>
          {user?.name} {user?.surname}
        </Text>
      </View>
      <View style={styles.dotCenter}>
        <View style={styles.dotsView}>
          <View style={[styles.dot, p1 && styles.activeDot]} />
          <View style={[styles.dot, p2 && styles.activeDot]} />
          <View style={[styles.dot, p3 && styles.activeDot]} />
          <View style={[styles.dot, p4 && styles.activeDot]} />
        </View>
      </View>
      <View style={styles.numbersMainView}>
        <View style={styles.numberView}>
          <TouchableOpacity
            style={styles.number}
            onPress={() => setPssCode('1')}>
            <Text style={styles.numberTxt}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.number}
            onPress={() => setPssCode('2')}>
            <Text style={styles.numberTxt}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.number}
            onPress={() => setPssCode('3')}>
            <Text style={styles.numberTxt}>3</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.numberView}>
          <TouchableOpacity
            style={styles.number}
            onPress={() => setPssCode('4')}>
            <Text style={styles.numberTxt}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.number}
            onPress={() => setPssCode('5')}>
            <Text style={styles.numberTxt}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.number}
            onPress={() => setPssCode('6')}>
            <Text style={styles.numberTxt}>6</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.numberView}>
          <TouchableOpacity
            style={styles.number}
            onPress={() => setPssCode('7')}>
            <Text style={styles.numberTxt}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.number}
            onPress={() => setPssCode('8')}>
            <Text style={styles.numberTxt}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.number}
            onPress={() => setPssCode('9')}>
            <Text style={styles.numberTxt}>9</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.numberView}>
          <TouchableOpacity style={styles.number}>
            <Image
              style={styles.face}
              source={require('../../assets/img/face.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.number}
            onPress={() => setPssCode('0')}>
            <Text style={styles.numberTxt}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.number} onPress={removePassCode}>
            <Text style={styles.numberTxtDelete}>წაშლა</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  titleView: {
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    color: Colors.bgGreen,
    fontFamily: 'BPG DejaVu Sans Mt',
    fontWeight: '700',
    lineHeight: 24,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 50,
    marginTop: 41,
  },
  avatarView: {
    alignItems: 'center',
  },
  name: {
    marginTop: 12,
    fontSize: 18,
    lineHeight: 21.6,
    color: Colors.black,
    fontFamily: 'BPG DejaVu Sans Mt',
  },
  dotsView: {
    flexDirection: 'row',
    width: 88,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: Colors.cancelBtnCol,
  },
  activeDot: {
    backgroundColor: '#FFA001',
  },
  dotCenter: {
    alignItems: 'center',
    marginTop: 80,
  },
  numbersMainView: {
    alignItems: 'center',
    marginTop: 80,
    height: 360,
    justifyContent: 'space-between',
    marginBottom: 59,
  },
  numberView: {
    width: 280,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  number: {
    width: 72,
    height: 72,
    borderRadius: 50,
    backgroundColor: Colors.buttonGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberTxt: {
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 28.8,
    color: Colors.black,
  },
  numberTxtDelete: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
  },
  face: {
    width: 32,
    height: 32,
  },
});

export default PassCode;
