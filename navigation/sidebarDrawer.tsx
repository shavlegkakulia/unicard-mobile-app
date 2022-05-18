import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {ScreenNavigationProp} from '../interfaces/commons';
import {logout} from '../Store/actions/auth';
import {AuthActions} from '../Store/types/auth';
import Colors from '../theme/Colors';
import {authRoutes} from './routes';
import {useNavigation} from '@react-navigation/native';
import UserInfoService, {
  IgetUserInfoDetailsRequest,
  IgetUserServiceResponse,
} from '../services/UserInfoService';
import {subscriptionService} from '../services/SubscribeService';

const SidebarDrawer: React.FC<ScreenNavigationProp> = props => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState<IgetUserServiceResponse>();
  const dispath = useDispatch();

  const goTo = (roteName: string) => {
    subscriptionService?.sendData('close-leftdrawer', true);
    navigation.navigate(roteName);
  };
  const login = () => {
    dispath({
      type: AuthActions.setIsAuthentificated,
      isAuthentificated: true,
    });
  };
  const getUserInfo = () => {
    const req: IgetUserInfoDetailsRequest = {
      user_id: '',
      lang: '',
    };
    UserInfoService.GenerateUserInfo(req).subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          setUserInfo(Response.data);
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imgView}>
        <Image
          style={styles.img}
          source={require('../assets/img/uniLogo.png')}
        />
      </View>
      <View style={styles.row}>
        <View style={styles.avatarView}>
          <Image
            style={styles.avatar}
            source={require('../assets/img/avatar.png')}
          />
        </View>

        <Text style={styles.name}>
          {userInfo?.name} {userInfo?.surname}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.row}
        onPress={() => goTo(authRoutes.barcode)}>
        <View style={styles.iconView}>
          <Image
            style={styles.card}
            source={require('../assets/img/cardIcon.png')}
          />
        </View>
        <Text style={styles.name}>ბარათი</Text>
      </TouchableOpacity>
      <View style={styles.lineView} />
      <TouchableOpacity
        style={styles.row}
        onPress={() => goTo(authRoutes.home)}>
        <View style={styles.iconView}>
          <Image
            style={styles.homeIcon}
            source={require('../assets/img/homeIcon.png')}
          />
        </View>
        <Text style={styles.name}>მთავარი</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.row}
        onPress={() => goTo(authRoutes.myPage)}>
        <View style={styles.iconView}>
          <Image
            style={styles.userIcon}
            source={require('../assets/img/userIcon.png')}
          />
        </View>
        <Text style={styles.name}>ჩემი გვერდი</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.row}
        onPress={() => goTo(authRoutes.spendOptions)}>
        <View style={styles.iconView}>
          <Image
            style={styles.cartIcon}
            source={require('../assets/img/cartIcon.png')}
          />
        </View>
        <Text style={styles.name}>რაში დავხარჯო</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row} onPress={() => goTo(authRoutes.aroundUs)}>
        <View style={styles.iconView}>
          <Image
            style={styles.pinIcon}
            source={require('../assets/img/pinIcon.png')}
          />
        </View>
        <Text style={styles.name}>ჩემ გარშემო</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.row}
        onPress={() => goTo(authRoutes.partners)}>
        <View style={styles.iconView}>
          <Image
            style={styles.hendsIcon}
            source={require('../assets/img/hendsIcon.png')}
          />
        </View>
        <Text style={styles.name}>პარტნიორები</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.row}
        onPress={() => goTo(authRoutes.news)}>
        <View style={styles.iconView}>
          <Image
            style={styles.newsIcon}
            source={require('../assets/img/newsIcon.png')}
          />
        </View>
        <Text style={styles.name}>სიახლეები</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.row}
        onPress={() => goTo(authRoutes.aboutUs)}>
        <View style={styles.iconView}>
          <Image
            style={styles.aboutIcon}
            source={require('../assets/img/aboutUsIcon.png')}
          />
        </View>
        <Text style={styles.name}>ჩვენ შესახებ</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.row}
        onPress={() => goTo(authRoutes.parameters)}>
        <View style={styles.iconView}>
          <Image
            style={styles.paramIcon}
            source={require('../assets/img/parametersIcon.png')}
          />
        </View>
        <Text style={styles.name}>პარამეტრები</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => dispath(logout())} style={styles.button}>
        <Text style={styles.btnText}>გამოსვლა</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SidebarDrawer;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.lightOrange,
    borderBottomRightRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 34,
  },
  imgView: {
    marginTop: 67,
  },
  img: {
    width: 89.35,
    height: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  avatarView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 38,
    height: 38,
    borderRadius: 50,
    borderColor: Colors.white,
    borderWidth: 1,
    right: 8,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  main: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
  },
  iconView: {
    width: 50,
  },
  name: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
  },
  card: {
    width: 23,
    height: 15,
    marginRight: 16,
  },
  homeIcon: {
    width: 22,
    height: 23,
    marginRight: 16,
  },
  userIcon: {
    width: 21.9,
    height: 22.8,
    marginRight: 16,
  },
  cartIcon: {
    width: 23,
    height: 21,
  },
  pinIcon: {
    width: 17,
    height: 22.56,
    marginLeft: 4,
  },
  hendsIcon: {
    width: 31.16,
    height: 18.35,
    right: 3,
  },
  newsIcon: {
    width: 23,
    height: 22,
  },
  aboutIcon: {
    width: 22,
    height: 22,
  },
  paramIcon: {
    width: 23,
    height: 23,
  },
  button: {
    width: 215,
    height: 44,
    borderRadius: 20,
    backgroundColor: Colors.bgGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 160,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  btnText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
  },
  lineView: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    marginTop: 26,
    width: 195,
  },
});
