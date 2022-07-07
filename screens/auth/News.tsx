import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {ScreenNavigationProp} from '../../interfaces/commons';
import {en} from '../../lang';
import {ITranslateReducer, ITranslateState} from '../../Store/types/translate';
import Colors from '../../theme/Colors';
import NewsCard from '../../components/NewsCard';
import NewsService, {
  Igeneralresp,
  IgetNewsResponse,
} from '../../services/NewsService';

const News: React.FC<ScreenNavigationProp> = props => {
  const [loading, setLoading] = useState<boolean>(true);

  const translate = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;

  const [news, setNews] = useState<Igeneralresp>();

  console.log('??????????', news);

  const getNewsList = () => {
    NewsService.GenerateNews().subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          setNews(Response.data);
        }
      },
      complete: () => {
        setLoading(false);
      },
      error: err => {
        console.log(err.response);
        setLoading(true);
      },
    });
  };
  useEffect(() => {
    setLoading(true);
    getNewsList();
  }, [translate.key]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={Colors.bgGreen} size={'small'} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.flatlist}>
        {news?.news?.map(e => (
          <NewsCard
            image={e.image}
            description={e.description}
            key={e.id}
            title={e.title}
            createDate={e.createDate}
            id={e.id}
          />
        ))}
      </View>
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgColor,
  },
});

export default News;
