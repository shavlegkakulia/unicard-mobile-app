import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  NativeScrollEvent,
  ActivityIndicator,
  Dimensions,
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

const SpendOptions: React.FC<ScreenNavigationProp> = () => {
  const [list, setList] = useState<IgetProducteListResponse[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [canFetching, setCanfetching] = useState(true);
  const [dotPage, setDotPage] = useState(0);
  const [loading, setLoading] = useState<boolean>();

  const itemStyle = {
    width: Dimensions.get('screen').width,
  };

  // const translateReducer = useSelector<ITranslateReducer>(
  //   state => state.TranslateReducer,
  // ) as ITranslateState;

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
    getProductList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);
  const ItemChunk = 8;
  const offersList = ChunkArrays(list!, ItemChunk);

  console.log('offersList', offersList.length);
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
    <ScrollView>
      {!loading && (
        <>
          <View style={styles.circleWrapper}>
            <Paginator
              pageNumber={dotPage}
              dotCount={paginationDotCount(list, 8)}
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
        </>
      )}

      {/* <Text>{translateReducer.t('common.name')}</Text> */}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
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
    justifyContent: 'space-around',
  },
});

export default SpendOptions;
