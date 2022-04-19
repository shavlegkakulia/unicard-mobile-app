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
import Colors from '../../theme/Colors';
import Loader from '../../components/loader';
import NewsCard from '../../components/NewsCard';
import NewsService, {
  Igeneralresp,
  IgetNewsDetailsRequest,
  IgetNewsResponse,
} from '../../services/NewsService';

const News: React.FC<ScreenNavigationProp> = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const renderItem = useCallback(({item}) => {
    return <NewsCard {...item} />;
  }, []);

  const translateReducer = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;

  const keyExtractor = (item: IgetNewsResponse) => {
    return item?.id + new Date().toLocaleTimeString();
  };

  const [news, setNews] = useState<Igeneralresp>();
  

  const getNewsList = () => {
    const req: IgetNewsDetailsRequest = {
      user_id: '',
      lang: '',
    };
    NewsService.GenerateNews(req).subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          setNews(Response.data);
        }
      },
      error: err => {
        console.log(err.response);
      },
    });
  };
  useEffect(() => {
    getNewsList();
  }, []);

  return (
    <ScrollView>
      <View style={styles.flatlist}>
        <FlatList
          contentContainerStyle={{
            alignSelf: 'flex-start',
          }}
          bounces={false}
          data={news?.news}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={keyExtractor}
          contentInset={{right: 20}}
          numColumns={news && Math.ceil(news?.news?.length || 4) / 4}
          key={news && new Date().toLocaleTimeString()}
        />
      </View>
      {/* <Text>{translateReducer.t('common.name')}</Text> */}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  flatlist: {
    marginTop: 37,
    alignItems: 'center',
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

export default News;
