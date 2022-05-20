import { RouteProp, useRoute } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  Modal,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

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
import Colors from '../../theme/Colors';

export const PASSCODEENABLED = 'PASSCODEENABLED';

type RouteParamList = {
  params: {
    isPassEnabled?: boolean;
  };
};

const Parameters: React.FC<ScreenNavigationProp> = props => {
  const route = useRoute<RouteProp<RouteParamList, 'params'>>();

  const [user, setUser] = useState<IgetUserServiceResponse>();
  const [isPinEnabled, setIsPinEnabled] = useState(false);
  const [cameraHandler, setCameraHandler] = useState(false);

  const togglePinSwitch = async() => {
    if(isPinEnabled) {
      setIsPinEnabled(false);
      await AsyncStorage.removeItem(PASSCODEENABLED);
      await AuthService.removeToken();
    } else {
      AsyncStorage.getItem(PASSCODEENABLED).then(pass => {
        if(pass) {
          setIsPinEnabled(true);
        } else {
          props.navigation.navigate(authRoutes.changePin);
        }
      });

    }
  }

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
      if(pass) {
        setIsPinEnabled(true);
      }
    })
  }, [route?.params?.isPassEnabled]);

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
            <Text style={styles.infoText}>პაროლის შევცვლა</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.param}>
          <View style={styles.wrapp}>
            <Image
              style={styles.pinIcon}
              source={require('../../assets/img/pinCodeIcon.png')}
            />
          </View>
          <TouchableOpacity style={styles.infoPassword} onPress={() => {
            if(isPinEnabled) {
              props.navigation.navigate(authRoutes.changePin);
            }
          }}>
            <Text style={styles.infoText}>პინ-კოდის შეცვლა</Text>
            <Switch
              trackColor={{true: Colors.bgGreen}}
              thumbColor={Colors.white}
              ios_backgroundColor={Colors.switchGrey}
              onValueChange={togglePinSwitch}
              value={isPinEnabled}
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
            <Text style={styles.infoText}>ფოტო სურათის შეცვლა</Text>
          </View>
        </TouchableOpacity>
        <Modal animationType="slide" transparent={true} visible={cameraHandler}>
          <TouchableOpacity
            style={styles.centeredView}
            onPress={() => setCameraHandler(!cameraHandler)}>
            <View style={styles.modalView}>
              <TouchableOpacity>
                <Text style={styles.modalText}>სურათის გადაღება</Text>
              </TouchableOpacity>
              <View style={styles.border} />
              <TouchableOpacity style={styles.galery}>
                <Text style={styles.modalText}>ტელეფონის გალერეა</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.btnWrapp}
              onPress={() => setCameraHandler(!cameraHandler)}>
              <View style={styles.btnStyle}>
                <Text style={styles.btnTitle}>გაუქმება</Text>
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
