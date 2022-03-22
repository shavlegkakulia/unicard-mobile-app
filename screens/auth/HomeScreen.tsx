import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ScreenNavigationProp} from '../../interfaces/commons';
import {en} from '../../lang';
import AuthService from '../../services/AuthService';
import {login, logout} from '../../Store/actions/auth';
import {use} from '../../Store/actions/translate';
import {ITranslateReducer, ITranslateState} from '../../Store/types/translate';
import Colors from '../../theme/Colors';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen: React.FC<ScreenNavigationProp> = props => {
  const dispatch = useDispatch();
  const translateReducer = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;

  const signin = () => {
    AuthService.SignIn({email: 'fhjdskhfjd', password: 'fdsfds'}).subscribe({
      next: async Response => {
        await AuthService.setToken(
          Response.data.token,
          Response.data.refresh_token,
        );
        dispatch(login());
      },
      error: err => {},
      complete: () => {},
    });
  };

  return (
    <ScrollView>
      <View style={styles.imageView}>
        <Image
          style={styles.img}
          source={require('../../assets/img/cardGreen.png')}
        />
      </View>
      <View style={styles.linearView}>
        <LinearGradient
          style={styles.linear}
          colors={[Colors.gradiantDark, Colors.gradiantLight, Colors.bgColor]}
        />
      </View>

      <Text>{translateReducer.t('common.name')}</Text>
      <TouchableOpacity
        onPress={() => dispatch(logout())}
        style={{padding: 10}}>
        <Text>logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 265,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  img: {
    width: 289.14,
    height: 187,
  },
  linearView: {
    width: '100%',
    marginTop: 30,
  },
  linear: {
    height: 20,
  },
});

export default HomeScreen;
