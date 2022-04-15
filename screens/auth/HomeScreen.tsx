import React, {useCallback, useEffect, useState} from 'react';
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
import {ITranslateReducer, ITranslateState} from '../../Store/types/translate';
import Colors from '../../theme/Colors';
import LinearGradient from 'react-native-linear-gradient';
import ShopingCard from '../../components/ShopCard';
import {authRoutes} from '../../navigation/routes';
import ProductList, {
  Igeneralresp,
  IgetProducteListRequest,
  IgetProducteListResponse,
} from '../../services/ProductListService';
import Loader from '../../components/loader';

const HomeScreen: React.FC<ScreenNavigationProp> = props => {
  const dispatch = useDispatch();
  const renderItem = useCallback(({item}) => {
    return <ShopingCard {...item} />;
  }, []);

  const translateReducer = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;

  const keyExtractor = (item: IgetProducteListResponse) => {
    return item?.id + new Date().toLocaleTimeString();
  };

  const [list, setList] = useState<Igeneralresp>();
  // const {price, images, description, id} = props;

  const getProductList = () => {
    const req: IgetProducteListRequest = {
      page_index: '1',
      lang: '',
    };
    ProductList.getList(req).subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          setList(Response.data);
          // console.log('response=========>', Response.data);
        }
      },
      error: err => {
        console.log(err.response);
      },
    });
  };
  useEffect(() => {
    getProductList();
  }, []);

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
        <View style={styles.circleView}>
          <View style={styles.circle} />
          <View style={styles.circle} />
          <View style={styles.circle} />
          <View style={styles.circle} />
          <Image
            style={styles.leftArrow}
            source={require('../../assets/img/leftArrowBold.png')}
          />
        </View>
      </View>
      {list ? (
        <View style={styles.flatlist}>
          <FlatList
            contentContainerStyle={{
              alignSelf: 'flex-start',
            }}
            bounces={false}
            numColumns={list && Math.ceil(list?.products.length || 2) / 2}
            key={list && new Date().toLocaleTimeString()}
            data={list?.products}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={keyExtractor}
            contentInset={{right: 20}}
          />
        </View>
      ) : (
        <Loader visible={true} />
      )}

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  circle: {
    width: 4,
    height: 4,
    backgroundColor: Colors.lightGrey,
    marginLeft: 6,
    borderRadius: 50,
  },
  circleView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftArrow: {
    width: 5,
    height: 8,
    left: 6,
  },
});

export default HomeScreen;
