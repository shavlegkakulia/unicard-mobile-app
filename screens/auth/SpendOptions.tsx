import React, {useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ScreenNavigationProp} from '../../interfaces/commons';
import {en} from '../../lang';
import {ITranslateReducer, ITranslateState} from '../../Store/types/translate';
import ShopingCard from '../../components/ShopCard';
import ProductList, {
  Igeneralresp,
  IgetProducteListRequest,
  IgetProducteListResponse,
} from '../../services/ProductListService';
import Colors from '../../theme/Colors';
import Loader from '../../components/loader';

const SpendOptions: React.FC<ScreenNavigationProp> = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
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

  const getProductList = () => {
    const req: IgetProducteListRequest = {
      page_index: '1',
      lang: '',
    };
    ProductList.getList(req).subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          setList(Response.data);
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
      {!loading && list ? (
        <>
          <View style={styles.circleWrapper}>
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
          <View style={styles.flatlist}>
            <FlatList
              contentContainerStyle={{
                alignSelf: 'flex-start',
              }}
              bounces={false}
              data={list?.products}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={keyExtractor}
              contentInset={{right: 20}}
              numColumns={list && Math.ceil(list?.products.length || 4) / 4}
              key={list && new Date().toLocaleTimeString()}
            />
          </View>
        </>
      ) : (
        <Loader visible={true} />
      )}

      <Text>{translateReducer.t('common.name')}</Text>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  flatlist: {
    marginTop: 28,
  },
  circleWrapper: {
    marginTop: 20,
    alignItems: 'flex-end',
    paddingHorizontal: 29,
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

export default SpendOptions;
