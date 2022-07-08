import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  NativeScrollEvent,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {ScreenNavigationProp} from '../../interfaces/commons';
// import {en} from '../../lang';
// import AuthService from '../../services/AuthService';
// import {login, logout} from '../../Store/actions/auth';
// import {use} from '../../Store/actions/translate';
// import {ITranslateReducer, ITranslateState} from '../../Store/types/translate';
import Colors from '../../theme/Colors';
import ShopingCard from '../../components/ShopCard';
import {authRoutes} from '../../navigation/routes';
import Paginator from '../../components/Paginator';
import ProductList, {
  IgetProducteListRequest,
  IgetProducteListResponse,
} from '../../services/ProductListService';
import GetBalanceService, {
  IgetBalanceDetailsRequest,
  IgetBalanceResponse,
} from '../../services/CardBalanceService';
import {ChunkArrays} from '../../utils/ChunkArray';
import {paginationDotCount} from '../../utils/PaginationDotCount';
import {useSelector} from 'react-redux';
import {ITranslateReducer, ITranslateState} from '../../Store/types/translate';
const HomeScreen: React.FC<ScreenNavigationProp> = props => {
  const translate = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;

  const [list, setList] = useState<IgetProducteListResponse[]>([]);
  const [balance, setBalance] = useState<IgetBalanceResponse>();
  const [pageIndex, setPageIndex] = useState(1);
  const [canFetching, setCanfetching] = useState(true);
  const [dotPage, setDotPage] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  const itemStyle = {
    width: Dimensions.get('screen').width,
  };

  const getProductList = (refresh?: boolean) => {
    if (!canFetching && !refresh) {
      return;
    }

    const req: IgetProducteListRequest = {
      page_index: pageIndex.toString(),
      row_count: '12',
      lang: '',
    };
    ProductList.getList(req).subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          if (Response.data.products.length < 20) {
            setCanfetching(false);
          }
          setList(prevState => {
            if (refresh) {
              return [...Response.data.products];
            }
            return [...prevState, ...Response.data.products];
          });
        }
      },
      complete: () => {
        setLoading(false);
      },
      error: err => {
        setLoading(true);
        console.log(err.response);
      },
    });
  };
  useEffect(() => {
    getProductList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);

  useEffect(() => {
    setCanfetching(true);
    getProductList(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [translate.key]);

  const getBalance = () => {
    const req: IgetBalanceDetailsRequest = {
      user_id: '',
      lang: '',
    };
    GetBalanceService.GenerateBalance(req).subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          setBalance(Response.data);
        }
      },
      complete: () => {
        setLoading(false);
      },
      error: err => {
        setLoading(true);
        console.log(err.response);
      },
    });
  };
  useEffect(() => {
    setLoading(true);
    getBalance();
  }, [translate.key]);
  const ItemChunk = 4;
  const offersList = ChunkArrays(list!, ItemChunk);

  let isEndFetching = false;
  // let startFetching = false;

  const onChangeSectionStep = (nativeEvent: NativeScrollEvent) => {
    if (list.length <= 0) {
      return;
    }
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      setDotPage(slide);
    }
    if (canFetching || isEndFetching) {
      return;
    }
    let scrollPoint = Math.floor(
      nativeEvent.contentOffset.x + nativeEvent.layoutMeasurement.width,
    );
    let scrollContentSize = Math.floor(nativeEvent.contentSize.width);

    if (scrollPoint >= scrollContentSize - 1) {
      setCanfetching(true);
      setPageIndex(prevState => prevState + 1);
    }
  };
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={Colors.bgGreen} size={'small'} />
      </View>
    );
  }

  const imageView = Platform.select({
    ios: styles.imageView,
    android: styles.androidImageView,
  });

  return (
    <ScrollView>
      <TouchableOpacity
        style={imageView}
        onPress={() => props.navigation.navigate(authRoutes.barcode)}>
        <Image
          style={styles.img}
          source={
            translate.key === 'en'
              ? require('../../assets/img/greenCardEng.png')
              : require('../../assets/img/greenCard.png')
          }
        />
        <View style={styles.markView}>
          <Image
            style={styles.mark}
            source={require('../../assets/img/UniMark.png')}
          />
          <Text style={styles.amount}>{balance?.scores_left}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{translate.t('home.whatShouldSpend')}</Text>
        <Paginator
          pageNumber={dotPage}
          dotCount={paginationDotCount(list, 4)}
        />
      </View>

      {!loading && offersList.length > 0 && (
        <ScrollView
          scrollToOverflowEnabled={true}
          // contentContainerStyle={{paddingRight: 5}}
          onScroll={({nativeEvent}) => onChangeSectionStep(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          horizontal>
          {offersList.map((data, i) => (
            <View key={i} style={[styles.dataContent, itemStyle]}>
              {data.map((item, index) => (
                <ShopingCard product={item} key={index} />
              ))}
            </View>
          ))}
        </ScrollView>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    backgroundColor: Colors.white,
    shadowOffset: {width: 0, height: 11},
    shadowColor: Colors.bgGreen,
    shadowOpacity: 5,
    shadowRadius: 8,
  },
  androidImageView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    height: 300,
    shadowColor: Colors.bgGreen,
    elevation: 20,
  },
  img: {
    width: 289.14,
    height: 187,
  },
  markView: {
    position: 'absolute',
    left: 35,
    bottom: 10,
    alignItems: 'center',
  },
  mark: {
    width: 93,
    height: 93,
  },
  amount: {
    color: Colors.amountTxt,
    fontSize: 20,
    fontFamily: 'BPG DejaVu Sans Mt',
    // lineHeight: 24,
    marginTop: 5,
    fontWeight: '700',
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
    marginTop: Platform.OS === 'ios' ? 62 : 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: '400',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
    width: 220,
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

  dataContent: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgColor,
  },
});

export default HomeScreen;
