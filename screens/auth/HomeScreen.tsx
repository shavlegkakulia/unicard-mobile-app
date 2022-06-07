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
  IgetBalanceRequest,
  IgetBalanceResponse,
} from '../../services/GetBalanceService';
import {ChunkArrays} from '../../utils/ChunkArray';
import {paginationDotCount} from '../../utils/PaginationDotCount';
const HomeScreen: React.FC<ScreenNavigationProp> = props => {
  // const translateReducer = useSelector<ITranslateReducer>(
  //   state => state.TranslateReducer,
  // ) as ITranslateState;

  const [list, setList] = useState<IgetProducteListResponse[]>([]);
  const [balance, setBalance] = useState<IgetBalanceResponse>();
  const [pageIndex, setPageIndex] = useState(1);
  const [canFetching, setCanfetching] = useState(true);
  const [dotPage, setDotPage] = useState(0);
  const [loading, setLoading] = useState<boolean>();

  const itemStyle = {
    width: Dimensions.get('screen').width,
  };

  const getProductList = () => {
    if (!canFetching) {
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
            return [...prevState, ...Response.data.products];
          });
        }
      },
      complete: () => {
        setLoading(false);
      },
      error: err => {
        console.log(err.response);
      },
    });
  };
  useEffect(() => {
    console.log('hi');
    getProductList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const ItemChunk = 4;
  const offersList = ChunkArrays(list!, ItemChunk);

  // console.log('offersList', offersList.length);
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
                <ShopingCard {...item} key={index} />
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

  dataContent: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgColor,
  },
});

export default HomeScreen;
