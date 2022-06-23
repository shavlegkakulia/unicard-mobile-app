import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  Modal,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';

// import Loader from '../../components/loader';
import {ScreenNavigationProp} from '../../interfaces/commons';
import navigation from '../../navigation/navigation';
import {authRoutes} from '../../navigation/routes';
import AuthService from '../../services/AuthService';
import AsyncStorage from '../../services/StorageService';
import UserInfoService, {
  IgetUserInfoDetailsRequest,
  IgetUserServiceResponse,
} from '../../services/UserInfoService';
import {ITranslateReducer, ITranslateState} from '../../Store/types/translate';
import Colors from '../../theme/Colors';

export const PASSCODEENABLED = 'PASSCODEENABLED';
export const BIOMETRICENABLED = 'BIOMETRICENABLED';

type RouteParamList = {
  params: {
    isPassEnabled?: boolean;
  };
};

const Parameters: React.FC<ScreenNavigationProp> = props => {
  const translate = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;

  const route = useRoute<RouteProp<RouteParamList, 'params'>>();

  const [user, setUser] = useState<IgetUserServiceResponse>();
  const [isPinEnabled, setIsPinEnabled] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [cameraHandler, setCameraHandler] = useState(false);

  const choosePhoto = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      includeBase64: true,
      quality: 0.2,
      maxWidth: 300,
      maxHeight: 300,
    });
    if (result.assets) {
      const {base64, fileName} = result.assets[0];
      console.log(base64, fileName);
      //uploadImage(getString(fileName), getString(base64));
    }
    setCameraHandler(!cameraHandler);
  };

  const takePhoto = async () => {
    if  (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: translate.t('settings.cameraPermission'),
            message: translate.t('settings.needAccesToCamera'),
            buttonNegative: translate.t('common.cancel'),
            buttonPositive: translate.t('common.ok'),
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const result = await launchCamera(
            {
              mediaType: 'photo',
              includeBase64: true,
              quality: 0.2,
              maxWidth: 300,
              maxHeight: 300,
            },
            r => {
              console.log(r);;
            },
          );
          if (result.assets) {
            const {base64, fileName} = result.assets[0];
            //uploadImage(getString(fileName), getString(base64));
            //updateUserProfileImage(getString(base64).replace(/'/g, "'"));
          }
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      const result = await launchCamera(
        {
          mediaType: 'photo',
          includeBase64: true,
          quality: 0.2,
          maxWidth: 300,
          maxHeight: 300,
        },
        r => {
          console.log(r);
        },
      );
      if (result.assets) {
        const {base64, fileName} = result.assets[0];
        console.log(base64, fileName);
        //uploadImage(getString(fileName), getString(base64));
        //updateUserProfileImage(getString(base64).replace(/'/g, "'"));
      }
    }
    setCameraHandler(!cameraHandler);
  };

  const togglePinSwitch = async () => {
    if (isPinEnabled) {
      setIsPinEnabled(false);
      await AsyncStorage.removeItem(PASSCODEENABLED);
      await AuthService.removeToken();
    } else {
      AsyncStorage.getItem(PASSCODEENABLED).then(pass => {
        if (pass) {
          setIsPinEnabled(true);
        } else {
          props.navigation.navigate(authRoutes.changePin);
        }
      });
    }
  };

  const toggleBiometricSwitch = async () => {
    if (isBiometricEnabled) {
      setIsBiometricEnabled(false);
      await AsyncStorage.removeItem(BIOMETRICENABLED);
    } else {
      await AsyncStorage.setItem(BIOMETRICENABLED, '1');
      setIsBiometricEnabled(true);
    }
  };

  const getUserInfo = () => {
    UserInfoService.GenerateUserInfo().subscribe({
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
    AsyncStorage.getItem(PASSCODEENABLED).then(pass => {
      if (pass) {
        setIsPinEnabled(true);
      }
    });
  }, [route?.params?.isPassEnabled]);

  useEffect(() => {
    AsyncStorage.getItem(BIOMETRICENABLED).then(biometric => {
      if (biometric) {
        setIsBiometricEnabled(true);
      }
    });
  }, []);

  return (
    <>
      <ScrollView style={styles.main}>
        <View style={styles.wrapper}>
          <View style={styles.wrapp}>
            <TouchableOpacity
              style={styles.circle}
              onPress={() => setCameraHandler(true)}>
              <Image
                style={styles.avatar}
                source={require('../../assets/img/avatar.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.info}>
            <Text style={styles.txt}>
              {user?.name} {user?.surname}
            </Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.paramView}
          onPress={() => props.navigation.navigate(authRoutes.changePassword)}>
          <View style={styles.wrapp}>
            <Image
              style={styles.lockIcon}
              source={require('../../assets/img/lockIcon.png')}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.infoText}>{translate.t('settings.changePwd')}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.param}>
          <View style={styles.wrapp}>
            <Image
              style={styles.pinIcon}
              source={require('../../assets/img/pinCodeIcon.png')}
            />
          </View>
          <TouchableOpacity
            style={styles.infoPassword}
            onPress={() => {
              if (isPinEnabled) {
                props.navigation.navigate(authRoutes.changePin);
              }
            }}>
            <Text style={styles.infoText}>
              {translate.t('settings.changePin')}
            </Text>
            <Switch
              trackColor={{true: Colors.bgGreen}}
              thumbColor={Colors.white}
              ios_backgroundColor={Colors.switchGrey}
              onValueChange={togglePinSwitch}
              value={isPinEnabled}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.param}>
          <View style={styles.wrapp}>
            <Image
              style={styles.pinIcon}
              source={require('../../assets/img/pinCodeIcon.png')}
            />
          </View>
          <TouchableOpacity
            style={styles.infoPassword}
            onPress={() => {
              if (isPinEnabled) {
                //props.navigation.navigate(authRoutes.changePin);
              }
            }}>
            <Text style={styles.infoText}>Biometric</Text>
            <Switch
              trackColor={{true: Colors.bgGreen}}
              thumbColor={Colors.white}
              ios_backgroundColor={Colors.switchGrey}
              onValueChange={toggleBiometricSwitch}
              value={isBiometricEnabled}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.param}
          onPress={() => setCameraHandler(true)}>
          <View style={styles.wrapp}>
            <Image
              style={styles.cameraIcon}
              source={require('../../assets/img/cameraIcon.png')}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.infoText}>
              {translate.t('settings.changePhoto')}
            </Text>
          </View>
        </TouchableOpacity>
        <Modal animationType="slide" transparent={true} visible={cameraHandler}>
          <TouchableOpacity
            style={styles.centeredView}
            onPress={() => setCameraHandler(false)}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={takePhoto}>
                <Text style={styles.modalText}>
                  {translate.t('settings.takePhoto')}
                </Text>
              </TouchableOpacity>
              <View style={styles.border} />
              <TouchableOpacity style={styles.galery} onPress={choosePhoto}>
                <Text style={styles.modalText}>
                  {translate.t('settings.phoneGallery')}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.btnWrapp}
              onPress={() => setCameraHandler(false)}>
              <View style={styles.btnStyle}>
                <Text style={styles.btnTitle}>
                  {translate.t('common.cancell')}
                </Text>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  main: {
    marginHorizontal: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.overley,
  },
  modalView: {
    paddingTop: 15,
    backgroundColor: Colors.white,
    borderRadius: 20,
    width: 327,
    height: 99,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btnWrapp: {
    marginTop: 43,
    marginBottom: 105,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: Colors.bgGreen,
    fontWeight: '400',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    marginTop: 43,
    alignItems: 'center',
  },
  circle: {
    width: 38,
    height: 38,
    borderRadius: 50,
    borderColor: Colors.bgGreen,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  info: {
    marginLeft: 10,
  },
  infoPassword: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 275,
  },
  txt: {
    fontSize: 14,
    color: Colors.bgGreen,
    fontWeight: '700',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
  },
  infoText: {
    fontSize: 14,
    color: Colors.bgGreen,
    fontWeight: '400',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
    marginTop: 5,
  },
  email: {
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 12,
    color: Colors.lightGreyTxt,
  },
  paramView: {
    marginTop: 55,
    flexDirection: 'row',
    alignItems: 'center',
  },
  param: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lockIcon: {
    width: 15,
    height: 24,
  },
  wrapp: {
    width: 60,
    alignItems: 'center',
  },
  pinIcon: {
    width: 24.66,
    height: 23.39,
  },
  cameraIcon: {
    width: 24,
    height: 21,
  },
  switch: {
    width: 150,
    justifyContent: 'flex-end',
  },
  galery: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  border: {
    borderBottomColor: Colors.darkGrey,
    borderBottomWidth: 0.4,
    width: '100%',
    marginBottom: 14,
  },
  btnStyle: {
    width: 327,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: Colors.cancelBtnCol,
  },
  btnTitle: {
    color: Colors.darkGrey,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
  },
});

export default Parameters;
