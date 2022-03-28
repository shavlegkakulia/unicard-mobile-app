import React from 'react';
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

const SidebarDrawer: React.FC<ScreenNavigationProp> = props => {
  const dispath = useDispatch();
  const login = () => {
    dispath({
      type: AuthActions.setIsAuthentificated,
      isAuthentificated: true,
    });
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imgView}>
        <Image
          style={styles.img}
          source={require('../assets/img/uniLogo.png')}
        />
      </View>
      <TouchableOpacity style={styles.row}>
        <View style={styles.avatarView}>
          <Image
            style={styles.avatar}
            source={require('../assets/img/avatar.png')}
          />
        </View>

        <Text style={styles.name}>გვანცა გაბუნია</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row}>
        <View style={styles.iconView}>
          <Image
            style={styles.card}
            source={require('../assets/img/cardIcon.png')}
          />
        </View>
        <Text style={styles.name}>ბარათი</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.row}
        onPress={() => props.navigation.navigate(authRoutes.barcode)}>
        <View style={styles.iconView}>
          <Image
            style={styles.homeIcon}
            source={require('../assets/img/homeIcon.png')}
          />
        </View>
        <Text style={styles.name}>მთავარი</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row}>
        <View style={styles.iconView}>
          <Image
            style={styles.userIcon}
            source={require('../assets/img/userIcon.png')}
          />
        </View>
        <Text style={styles.name}>ჩემი გვერდი</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row}>
        <View style={styles.iconView}>
          <Image
            style={styles.cartIcon}
            source={require('../assets/img/cartIcon.png')}
          />
        </View>
        <Text style={styles.name}>რაში დავხარჯო</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row}>
        <View style={styles.iconView}>
          <Image
            style={styles.pinIcon}
            source={require('../assets/img/pinIcon.png')}
          />
        </View>
        <Text style={styles.name}>ჩემ გარშემო</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row}>
        <View style={styles.iconView}>
          <Image
            style={styles.hendsIcon}
            source={require('../assets/img/hendsIcon.png')}
          />
        </View>
        <Text style={styles.name}>პარტნიორები</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row}>
        <View style={styles.iconView}>
          <Image
            style={styles.newsIcon}
            source={require('../assets/img/newsIcon.png')}
          />
        </View>
        <Text style={styles.name}>სიახლეები</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row}>
        <View style={styles.iconView}>
          <Image
            style={styles.aboutIcon}
            source={require('../assets/img/aboutUsIcon.png')}
          />
        </View>
        <Text style={styles.name}>ჩვენ შესახებ</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row}>
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
    textTransform: 'uppercase',
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
  },
  btnText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
