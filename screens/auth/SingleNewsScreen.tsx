import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import {ScreenNavigationProp} from '../../interfaces/commons';
import Colors from '../../theme/Colors';

import SingleNewsService, {
  IgetSingleNewsDetailsRequest,
  IgetSingleNewsResponse,
} from '../../services/SingleNewsService';
import {htmlToString} from '../../utils/converts';
import {useSelector} from 'react-redux';
import {ITranslateReducer, ITranslateState} from '../../Store/types/translate';

const SingleNewsScreen: React.FC<ScreenNavigationProp> = props => {
  const translate = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;

  const [news, setNews] = useState<IgetSingleNewsResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const id = props.route.params.id;

  const getNewsPageDetails = () => {
    const req: IgetSingleNewsDetailsRequest = {
      news_id: id,
      lang: '',
    };
    SingleNewsService.getSingleNewsDetails(req).subscribe({
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
    getNewsPageDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={Colors.bgGreen} size={'small'} />
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={true}>
      <View style={styles.main}>
        <View style={styles.imgView}>
          <Image
            resizeMode="cover"
            style={styles.img}
            source={{uri: news?.news?.image}}
          />
        </View>
        <View>
          <Text style={styles.title}>{news?.news?.title}</Text>
          <Text style={styles.date}>{news?.news?.createDate}</Text>
          <Text style={styles.desc}>
            {htmlToString(news?.news?.description)}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  main: {
    marginHorizontal: 30,
   marginTop: 20,
   marginBottom: 50,
  },

  title: {
    fontSize: 14,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 24,
    color: Colors.black,
  },
  date: {
    fontSize: 12,
    color: Colors.bgGreen,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 14.4,
    marginTop: 7,
  },
  desc: {
    color: Colors.darkGrey,
    fontSize: 12,
    fontFamily: 'BPG DejaVu Sans',
    lineHeight: 13.97,
    marginTop: 7,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgColor,
  },
  imgView: {
    alignItems: 'center',
    marginBottom: 22,
  },
  img: {
    width: 322,
    height: 183.11,
    borderRadius: 14,
  },
});

export default SingleNewsScreen;
