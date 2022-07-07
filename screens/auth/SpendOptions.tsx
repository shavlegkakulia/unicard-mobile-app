import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  NativeScrollEvent,
  ActivityIndicator,
  Dimensions,
  Text,
} from 'react-native';
import {ScreenNavigationProp} from '../../interfaces/commons';
// import {en} from '../../lang';
// import {ITranslateReducer, ITranslateState} from '../../Store/types/translate';
import ShopingCard from '../../components/ShopCard';
import ProductList, {
  IgetProducteListRequest,
  IgetProducteListResponse,
} from '../../services/ProductListService';
import Colors from '../../theme/Colors';
import {ChunkArrays} from '../../utils/ChunkArray';
import Paginator from '../../components/Paginator';
import {paginationDotCount} from '../../utils/PaginationDotCount';
import MessagesWrapper from '../../components/CostumComponents/MessagesWrapper';
import NotFound from '../../components/CostumComponents/NotFound';
import {useSelector} from 'react-redux';
import {ITranslateReducer, ITranslateState} from '../../Store/types/translate';

const SpendOptions: React.FC<ScreenNavigationProp> = props => {
  const translate = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;

  const [list, setList] = useState<IgetProducteListResponse[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [canFetching, setCanfetching] = useState(true);
  const [dotPage, setDotPage] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const loadingRef = useRef<NodeJS.Timeout>();

  const image = require('../../assets/img/error.png');

  const itemStyle = {
    width: Dimensions.get('screen').width,
  };

  // const translateReducer = useSelector<ITranslateReducer>(
  //   state => state.TranslateReducer,
  // ) as ITranslateState;

  const getProductList = () => {
    // if (!canFetching) {
    //   return;
    // }
    const filter = props?.route?.params?.filter;


    let req: IgetProducteListRequest = {
      page_index: pageIndex.toString(),
      row_count: '12',
      lang: '',
    };
    if (filter?.discount === true) {
      req = {...req, discounted: true};
    }
    if (filter?.latest_prod === true) {
      req = {...req, latest_prod: true};
    }
    if (filter?.category_id !== '') {
      req = {...req, category_id: filter?.category_id};
    }
    if (filter?.customer_type_id !== '') {
      req = {...req, customer_type_id: filter?.customer_type_id};
    }
    if (filter?.price_range_id !== '') {
      req = {...req, price_range_id: filter?.price_range_id};
    }

    ProductList.getList(req).subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          if (
            Response.data.products.length < 20 &&
            Response.data.products.length !== 0
          ) {
            setCanfetching(false);
          }
          if (filter) {
            setList(Response.data.products);
          } else {
            setList(prevState => {
              return [...prevState, ...Response.data.products];
            });
          }
        }
      },
      complete: () => {
        if (loadingRef.current) {
          clearTimeout(loadingRef.current);
        }
        loadingRef.current = setTimeout(() => {
          setLoading(false);
        }, 1000);
      },
      error: err => {
        setLoading(false);
        console.log(err.response);
      },
    });
  };

  useEffect(() => {
    getProductList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, props.route.params]);
  const ItemChunk = 8;
  let offersList: IgetProducteListResponse[][] | undefined;
  offersList = ChunkArrays(list!, ItemChunk);

  let isEndFetching = false;

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
    <>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <>
          {offersList.length > 0 && (
            <View style={styles.circleWrapper}>
              <Paginator
                pageNumber={dotPage}
                dotCount={paginationDotCount(list, 8)}
              />
            </View>
          )}

          {offersList !== undefined && offersList.length > 0 ? (
            <ScrollView
              scrollToOverflowEnabled={true}
              onScroll={({nativeEvent}) => onChangeSectionStep(nativeEvent)}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              horizontal>
              {offersList.map((data, i) => (
                <ScrollView
                  key={i}
                  contentContainerStyle={[styles.dataContent, itemStyle]}>
                  {data.map((item, index) => (
                    <ShopingCard product={item} key={index} />
                  ))}
                </ScrollView>
              ))}
            </ScrollView>
          ) : (
            offersList !== undefined &&
            offersList.length === 0 && (
              <NotFound
                onPress={() => {}}
                title={translate.t('generalErrors.contentNotFound')}
                backgroundColor={Colors.red}
                image={image}
              />
            )
          )}
        </>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  flex1: {
    // flex: 1,
    // justifyContent:'flex-start',
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgColor,
  },
  dataContent: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notFound: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default SpendOptions;
