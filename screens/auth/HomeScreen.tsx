import React, {useCallback} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
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
import DATA from '../../constants/shopListDummyData';
import ShopingCard from '../../components/ShopCard';
import {authRoutes} from '../../navigation/routes';

const HomeScreen: React.FC<ScreenNavigationProp> = props => {
  const dispatch = useDispatch();
  const renderItem = useCallback(({item}) => {
    console.log('essssssssssi', item);
    return (
      <View>
        <ShopingCard {...item} />
      </View>
    );
  }, []);

  const translateReducer = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;

  const keyExtractor = useCallback(item => {
    return item.id;
  }, []);

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
      <TouchableOpacity
        style={styles.imageView}
        onPress={() => props.navigation.navigate(authRoutes.barcode)}>
        <Image
          style={styles.img}
          source={require('../../assets/img/cardGreen.png')}
        />
        <View style={styles.markView}>
          <Image
            style={styles.mark}
            source={require('../../assets/img/UniMark.png')}
          />
          <Text style={styles.amount}>54000</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.linearView}>
        <LinearGradient
          style={styles.linear}
          colors={[Colors.gradiantDark, Colors.gradiantLight, Colors.bgColor]}
        />
      </View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>რაში დავხარჯო</Text>
      </View>
      <View style={styles.flatlist}>
        <FlatList
          contentContainerStyle={{
            alignSelf: 'flex-start',
          }}
          numColumns={DATA.length / 2}
          data={DATA}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={keyExtractor}
          contentInset={{right: 20}}
        />
      </View>

      {/* <ScrollView
        horizontal={true}
        pagingEnabled={true}
        style={{flex: 1}}
        contentContainerStyle={{
          flex: 1,
          flexWrap: 'wrap',
          // flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        {DATA.map((data, i) => (
          <View key={i}>
            <ShopingCard {...data} />
          </View>
        ))}
      </ScrollView> */}

      <Text>{translateReducer.t('common.name')}</Text>
      
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
  markView: {
    position: 'absolute',
    left: 35,
    bottom: -18,
    alignItems: 'center',
  },
  mark: {
    width: 93,
    height: 93,
  },
  amount: {
    color: Colors.amountTxt,
    fontSize: 28,
  },
  linearView: {
    width: '100%',
    marginTop: 38,
  },
  linear: {
    height: 20,
  },
  titleWrapper: {
    marginHorizontal: 46,
    marginTop: 35,
  },
  title: {
    fontSize: 14,
    textTransform: 'uppercase',
    color: Colors.black,
    fontWeight: '400',
  },
  flatlist: {
    marginTop: 28,
  },
});

export default HomeScreen;
