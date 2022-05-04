import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {ScreenNavigationProp} from '../../interfaces/commons';
import Colors from '../../theme/Colors';

import SingleNewsService, {
  IgetSingleNewsDetailsRequest,
  IgetSingleNewsResponse,
} from '../../services/SingleNewsService';
import { htmlToString } from '../../utils/converts';


const SingleNewsScreen: React.FC<ScreenNavigationProp> = props => {
  const [news, setNews] = useState<IgetSingleNewsResponse>();
  const id = props.route.params.id;
  // console.log(id);

  const getNewsPageDetails = () => {
    const req: IgetSingleNewsDetailsRequest = {
      news_id: id,
      lang: '',
    };
    SingleNewsService.getSingleNewsDetails(req).subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          setNews(Response.data);
          console.log(Response.data);
        }
      },
      error: err => {
        console.log(err.response);
      },
    });
  };
  useEffect(() => {
    getNewsPageDetails();
  }, []);
  console.log(id);
  return (
    <ScrollView style={styles.main}>
<View>
      <Text style={styles.title}>{news?.news?.title}</Text>
      <Text style={styles.date}>{news?.news?.createDate}</Text>
      <Text style={styles.desc}>{htmlToString(news?.news?.description)}</Text>
      {/* {!loading && offer ? (
        <>
          <ScrollView contentContainerStyle={styles.main}>
            <View style={styles.imgView}>
              <Image style={styles.img} source={offer?.images} />
            </View>

            <View style={styles.titleView}>
              <View style={styles.titleWrapper}>
                <Text style={styles.title}>{offer?.name}</Text>
              </View>

              <View style={styles.amountView}>
                <Text style={styles.amount}>{offer?.price}</Text>
                <Image
                  style={styles.mark}
                  source={require('../../assets/img/UniMark.png')}
                />
              </View>
            </View>
            <View style={styles.catId}>
              <Text style={styles.catIdTxt}>{offer?.catalog_id}</Text>
            </View>
            <View>
              <Text>{htmlToString(offer?.description)}</Text>
            </View>
            <View>
              <Text>{htmlToString(linkTag?.toString())}</Text>
            </View>
            <View style={styles.btn}>
              <AppButton
                onPress={() =>
                  props.navigation.navigate(authRoutes.getGift, {data: offer})
                }
                title={'საჩუქრის მიღება'}
                backgroundColor={Colors.bgGreen}
              />
            </View>
          </ScrollView>
        </>
      ) : (
        <Loader visible={true} />
      )} */}
    </View>

    </ScrollView>
    
  );
};
const styles = StyleSheet.create({
  main: {
    margin: 30,
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
});

export default SingleNewsScreen;
