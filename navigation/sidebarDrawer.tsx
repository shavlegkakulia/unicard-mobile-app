import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ScreenNavigationProp} from '../interfaces/commons';
import {logout} from '../Store/actions/auth';
import {IAuthReducer, IAuthState} from '../Store/types/auth';
import Colors from '../theme/Colors';
import {authRoutes} from './routes';
import {useNavigation} from '@react-navigation/native';
import {subscriptionService} from '../services/SubscribeService';
import {ITranslateReducer, ITranslateState} from '../Store/types/translate';

const SidebarDrawer: React.FC<ScreenNavigationProp> = props => {
  const translate = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>();
  const dispath = useDispatch();
  const authdata = useSelector<IAuthReducer>(
    state => state.AuthReducer,
  ) as IAuthState;

  const goTo = (roteName: string) => {
    subscriptionService?.sendData('close-leftdrawer', true);
    navigation.navigate(roteName);
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={Colors.bgGreen} size={'small'} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.imgView}>
          <Image
            style={styles.img}
            resizeMode={'contain'}
            source={require('../assets/img/uniLogo.png')}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.avatarView}>
            <Image
              style={styles.avatar}
              source={{uri: authdata.userInfo?.url}}
            />
          </View>

          <Text style={styles.name}>
            {!loading && authdata?.userInfo?.name} {authdata?.userInfo?.surname}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.row}
          onPress={() => goTo(authRoutes.barcode)}>
          <View style={styles.iconView}>
            <Image
              style={styles.card}
              resizeMode={'contain'}
              source={require('../assets/img/cardIcon.png')}
            />
          </View>
          <Text style={styles.name}>{translate.t('common.card')}</Text>
        </TouchableOpacity>
        <View style={styles.lineView} />
        <TouchableOpacity
          style={styles.row}
          onPress={() => goTo(authRoutes.home)}>
          <View style={styles.iconView}>
            <Image
              style={styles.homeIcon}
              resizeMode={'contain'}
              source={require('../assets/img/homeIcon.png')}
            />
          </View>
          <Text style={styles.name}>{translate.t('screens.home')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => goTo(authRoutes.myPage)}>
          <View style={styles.iconView}>
            <Image
              style={styles.userIcon}
              resizeMode={'contain'}
              source={require('../assets/img/userIcon.png')}
            />
          </View>
          <Text style={styles.name}>{translate.t('screens.myPages')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => goTo(authRoutes.spendOptions)}>
          <View style={styles.iconView}>
            <Image
              style={styles.cartIcon}
              resizeMode={'contain'}
              source={require('../assets/img/cartIcon.png')}
            />
          </View>
          <Text style={styles.name}>{translate.t('home.whatShouldSpend')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => goTo(authRoutes.aroundUs)}>
          <View style={styles.iconView}>
            <Image
              style={styles.pinIcon}
              resizeMode={'contain'}
              source={require('../assets/img/pinIcon.png')}
            />
          </View>
          <Text style={styles.name}>{translate.t('screens.aroundMe')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => goTo(authRoutes.partners)}>
          <View style={styles.iconView}>
            <Image
              style={styles.hendsIcon}
              resizeMode={'contain'}
              source={require('../assets/img/hendsIcon.png')}
            />
          </View>
          <Text style={styles.name}>{translate.t('screens.partners')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => goTo(authRoutes.news)}>
          <View style={styles.iconView}>
            <Image
              style={styles.newsIcon}
              resizeMode={'contain'}
              source={require('../assets/img/newsIcon.png')}
            />
          </View>
          <Text style={styles.name}>{translate.t('screens.news')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => goTo(authRoutes.aboutUs)}>
          <View style={styles.iconView}>
            <Image
              style={styles.aboutIcon}
              resizeMode={'contain'}
              source={require('../assets/img/aboutUsIcon.png')}
            />
          </View>
          <Text style={styles.name}>{translate.t('screens.aboutUs')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => goTo(authRoutes.parameters)}>
          <View style={styles.iconView}>
            <Image
              style={styles.paramIcon}
              resizeMode={'contain'}
              source={require('../assets/img/parametersIcon.png')}
            />
          </View>
          <Text style={styles.name}>{translate.t('screens.parameters')}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => dispath(logout())} style={styles.button}>
        <Text style={styles.btnText}>{translate.t('common.logout')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SidebarDrawer;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.lightOrange,
    borderBottomRightRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 34,
    paddingBottom: 30,
  },
  imgView: {
    marginTop: 40,
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
    marginTop: 30,
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgColor,
  },
});
