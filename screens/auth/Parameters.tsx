import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Loader from '../../components/loader';
import {ScreenNavigationProp} from '../../interfaces/commons';
import UserInfoService, {
  IgetUserInfoDetailsRequest,
  IgetUserServiceResponse,
} from '../../services/UserInfoService';
import Colors from '../../theme/Colors';

const Parameters: React.FC<ScreenNavigationProp> = () => {
  const [user, setUser] = useState<IgetUserServiceResponse>();
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
  return (
    <ScrollView style={styles.main}>
      <View style={styles.wrapper}>
        <View style={styles.wrapp}>
          <View style={styles.circle}>
            <Image
              style={styles.avatar}
              source={require('../../assets/img/avatar.png')}
            />
          </View>
        </View>

        <View style={styles.info}>
          <Text style={styles.txt}>
            {user?.name} {user?.surname}
          </Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.paramView}>
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
        <View style={styles.infoPassword}>
          <Text style={styles.infoText}>პინ-კოდის შეცვლა</Text>
          <Switch
            trackColor={{true: Colors.bgGreen}}
            thumbColor={Colors.white}
            ios_backgroundColor={Colors.switchGrey}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.param}>
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
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  main: {
    marginHorizontal: 20,
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
    width: 300,
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
});

export default Parameters;
