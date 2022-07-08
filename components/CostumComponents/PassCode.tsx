import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
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
import {IAuthReducer, IAuthState} from '../../Store/types/auth';
import {PUSH} from '../../Store/actions/errors';
import {ITranslateReducer, ITranslateState} from '../../Store/types/translate';
import {IRefreshCallbakParams} from './AuthPage';

interface IPageProps {
  isLogin?: boolean;
  onRefresh: (callback: (par: IRefreshCallbakParams) => void) => Promise<void>;
}

const PassCode: React.FC<IPageProps> = props => {
  const [user, setUser] = useState<IgetUserServiceResponse>();
  const [{code, code2}, setCode] = useState({code: '', code2: ''});
  const [loading, setLoading] = useState(false);
  const auth = useSelector<IAuthReducer>(
    state => state.AuthReducer,
  ) as IAuthState;

  const nav = useNavigation();
  const dispatch = useDispatch();
  const translate = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;

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
    if (code.length <= 0) {
      return;
    }

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
    if (!props.isLogin) {
      getUserInfo();
    }
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
      setLoading(true);
      (async () => {
        const token = await AuthService.getToken();
        const refresh = await AuthService.getRefreshToken();

        if (token && refresh) {
          props.onRefresh(res => {
            const {accesToken, refreshToken, skip} = res;
            if (accesToken !== undefined) {
              dispatch(login(accesToken, refreshToken));
            } else {
              if (!skip) {
                dispatch(PUSH(translate.t('generalErrors.errorOccurred')));
              }
            }

            setLoading(false);
          });
        }
      })();
      if (code.length === 4 && code !== code2) {
        setCode({code: '', code2: code2});
      }
    }
    if (props.isLogin && code2.length === 4 && code !== code2) {
      dispatch(PUSH(translate.t('auth.wrongPin')));
    }
  }, [code, code2]);

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
        if (code2.length === 4 && code.length === 4) {
          dispatch(PUSH(translate.t('generalErrors.errorOccurred')));
          setCode({code: '', code2: ''});
        }
      }
    }
  }, [code2]);

  return (
    <>
      <ScrollView>
        <View
          style={
            auth.isAuthentificated === false ? styles.title2 : styles.titleView
          }>
          <Text style={styles.title}>
            {translate.t(
              `common.${props.isLogin ? 'enterByPin' : 'changePin'}`,
            )}
          </Text>
        </View>
        {user !== undefined && (
          <View style={styles.avatarView}>
            <Image
              style={styles.avatar}
              source={require('../../assets/img/avatar.png')}
            />
            <Text style={styles.name}>
              {user?.name} {user?.surname}
            </Text>
          </View>
        )}
        <View style={[styles.dotCenter, props.isLogin ? {marginTop: 120} : {}]}>
          <View style={styles.dotsView}>
            <View style={[styles.dot, p1 && styles.activeDot]} />
            <View style={[styles.dot, p2 && styles.activeDot]} />
            <View style={[styles.dot, p3 && styles.activeDot]} />
            <View style={[styles.dot, p4 && styles.activeDot]} />
          </View>
        </View>
        <View
          style={
            auth.isAuthentificated === false
              ? styles.numbersMainView2
              : styles.numbersMainView
          }>
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
              <Text style={styles.numberTxtDelete}>
                {translate.t('common.delete')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.goback} onPress={() => nav.goBack()}>
          {/* <Text style={styles.gobackTxt}>X</Text> */}
          {auth.isAuthentificated === false ? (
            <Image
              style={styles.cancel}
              source={require('../../assets/img/cancelIcon.png')}
            />
          ) : null}
        </TouchableOpacity>
      </ScrollView>
      <Modal visible={loading} transparent={true}>
        <ActivityIndicator
          size={'small'}
          color={Colors.bgGreen}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  titleView: {
    alignItems: 'center',
    marginTop: 20,
  },
  title2: {
    alignItems: 'center',
    marginTop: 60,
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
    marginTop: 40,
  },
  numbersMainView: {
    alignItems: 'center',
    marginTop: 40,
    height: 360,
    justifyContent: 'space-between',
    marginBottom: 35,
  },
  numbersMainView2: {
    alignItems: 'center',
    marginTop: 60,
    height: 360,
    justifyContent: 'space-between',
    marginBottom: 35,
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
  goback: {
    alignItems: 'center',
  },
  cancel: {
    width: 17.01,
    height: 17.01,
  },
});

export default PassCode;
