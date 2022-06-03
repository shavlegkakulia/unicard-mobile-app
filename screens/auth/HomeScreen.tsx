import React, {useCallback, useEffect, useState, useRef, useMemo} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ScreenNavigationProp} from '../../interfaces/commons';
import {en} from '../../lang';
import AuthService from '../../services/AuthService';
import {login, logout} from '../../Store/actions/auth';
import {use} from '../../Store/actions/translate';
import {ITranslateReducer, ITranslateState} from '../../Store/types/translate';
import Colors from '../../theme/Colors';
import ShopingCard from '../../components/ShopCard';
import {authRoutes} from '../../navigation/routes';
import Paginator from '../../components/Paginator';
import ProductList, {
  Igeneralresp,
  IgetProducteListRequest,
  IgetProducteListResponse,
} from '../../services/ProductListService';
import GetBalanceService, {
  IgetBalanceRequest,
  IgetBalanceResponse,
} from '../../services/GetBalanceService';

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

  const [list, setList] = useState<IgetProducteListResponse[]>();
  const [balance, setBalance] = useState<IgetBalanceResponse>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [canFetching, setCanfetching] = useState(true);
  const [dotPage, setDotPage] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(({viewableItems}) => {
    // console.log('>>>>>>>>>ragacaaaa', viewableItems);
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({itemVisiblePercentThreshold: 20}).current;
  const slidesRef = useRef(null);

  const getProductList = () => {
    if (!canFetching) {
      return;
    }
    const req: IgetProducteListRequest = {
      page_index: pageIndex.toString(),
      row_count: '20',
      lang: '',
    };
    ProductList.getList(req).subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          if (Response.data.products.length < 20) {
            setCanfetching(false);
          }
          setList([...Response.data.products, ...(list || [])]);
        }
      },
      error: err => {
        console.log(err.response);
      },
    });
  };
  useEffect(() => {
    getProductList();
  }, [pageIndex]);

  const getBalance = () => {
    const req: IgetBalanceRequest = {
      user_id: '',
      lang: '',
    };
    GetBalanceService.GenerateBalance(req).subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          setBalance(Response.data);
          // console.log('balanceeeee=========>', Response.data);
        }
      },
      error: err => {
        console.log(err.response);
      },
    });
  };
  useEffect(() => {
    getBalance();
  }, []);

  const listElements = useMemo(
    () => (
      <FlatList
        contentContainerStyle={{
          alignSelf: 'flex-start',
        }}
        bounces={false}
        // pagingEnabled
        data={list}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        contentInset={{right: 20}}
        numColumns={list && Math.ceil(list.length || 2) / 2}
        key={list && new Date().toLocaleTimeString()}
        onScroll={event => {
          const {contentOffset, contentSize, layoutMeasurement} =
            event.nativeEvent;
          const mode =
            contentSize.width /
            (contentSize.width - (contentOffset.x + layoutMeasurement.width));

          console.log('mode', mode);
          if (
            contentOffset.x + layoutMeasurement.width >=
            contentSize.width - 10
          ) {
            if (canFetching) {
              setPageIndex(prev => ++prev);
            }
          }
          setDotPage(Math.round(mode));
        }}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
        scrollEventThrottle={32}
      />
    ),
    [list],
  );

  return (
    <ScrollView>
      <TouchableOpacity
        style={styles.imageView}
        onPress={() => props.navigation.navigate(authRoutes.barcode)}>
        <Image
          style={styles.img}
          source={require('../../assets/img/greenCard.png')}
        />
        <View style={styles.markView}>
          <Image
            style={styles.mark}
            source={require('../../assets/img/UniMark.png')}
          />
          <Text style={styles.amount}>{balance?.balance}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.titleWrapper}>
        <Text style={styles.title}>რაში დავხარჯო</Text>
        <Paginator pageNumber={dotPage} dotCount={pageIndex} />
      </View>

      <View style={styles.flatlist}>{listElements}</View>

      {/* <Text>{translateReducer.t('common.name')}</Text> */}
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
    fontSize: 28,
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
    marginTop: 62,
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
  // circleWrapper: {
  //   marginTop: 20,
  //   alignItems: 'flex-end',
  //   paddingHorizontal: 29,
  // },
  circle: {
    width: 4,
    height: 4,
    backgroundColor: Colors.lightGrey,
    marginLeft: 6,
    borderRadius: 50,
  },
});

export default HomeScreen;
