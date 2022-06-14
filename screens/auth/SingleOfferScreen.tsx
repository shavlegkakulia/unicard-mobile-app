import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, ScrollView, View, Text} from 'react-native';
import {ScreenNavigationProp} from '../../interfaces/commons';
import Colors from '../../theme/Colors';
import ProducteService, {
  IgetProducteDetailsRequest,
  IgetProducteResponse,
} from '../../services/ProductService';
import Loader from '../../components/loader';
import AppButton from '../../components/CostumComponents/AppButton';
import {authRoutes} from '../../navigation/routes';
import {useSelector} from 'react-redux';
import {ITranslateReducer, ITranslateState} from '../../Store/types/translate';

const SingleOfferScreen: React.FC<ScreenNavigationProp> = props => {
  const translate = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;
  const [offer, setOffer] = useState<IgetProducteResponse>();
  const [loading, setLoading] = useState<boolean>();
  const id = props.route.params.id;
  const type = props.route.params.type;
  console.log('dataaaa', offer?.descriptionList);
  console.log('aid', id);

  const getProductDetails = () => {
    const req: IgetProducteDetailsRequest = {
      product_id: id,
      lang: '',
    };
    ProducteService.getOfferDetails(req).subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          setOffer(Response.data);
        }
      },
      error: err => {
        console.log(err.response);
      },
    });
  };
  useEffect(() => {
    getProductDetails();
  }, []);

  // const searchStr = '<ol>';
  // const searchEndStr = '</ol>';
  // const olindex = offer?.description?.indexOf(searchStr);
  // const ollastindex = offer?.description?.indexOf(searchEndStr);

  // const withoutOl = offer?.description?.substring(0, olindex);
  // let afterOl: string | undefined = '';
  // let withoutOlContent = '';

  // let getString;
  // if (olindex && olindex >= 0 && ollastindex && ollastindex >= 0) {
  //   getString = offer?.description?.substring(
  //     olindex + searchStr.length,
  //     ollastindex,
  //   );
  //   afterOl = offer?.description?.substring(ollastindex + searchEndStr.length);
  // }

  // if (withoutOl) {
  //   withoutOlContent = (withoutOl + afterOl)
  //     ?.replace(/(<([^>]+)>)/gi, '')
  //     .trim()
  //     .replace(/&nbsp;/g, '');
  // }

  // let contacts: string[] | undefined = getString
  //   ?.split('<li>')
  //   .join()
  //   .split('</li>');
  // contacts = contacts?.map(s => {
  //   return s.trim().replace(/&nbsp;/g, '');
  // });
  return (
    <View>
      {!loading && offer ? (
        <>
          <ScrollView
            contentContainerStyle={styles.main}
            showsVerticalScrollIndicator={true}>
            <View style={styles.imgView}>
              <Image style={styles.img} source={{uri: offer?.images?.[0]}} />
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
            <View style={{marginTop: 15}}>
              {offer.descriptionList?.map((e, i) => (
                <Text style={styles.description} key={i}>
                  {e}
                </Text>
              ))}
            </View>

            <View style={{marginTop: 15}}>
              {offer.addresList?.map((ad, i) => (
                <View style={styles.locationView}>
                  <Image
                    style={styles.icon}
                    source={require('../../assets/img/locationLogo.png')}
                  />
                  <Text style={styles.address} key={i}>
                    {' '}
                    {ad}
                  </Text>
                </View>
              ))}
            </View>
            <View style={{marginTop: 15}}>
              {offer.urlList?.map((url, i) => (
                <Text style={styles.url} key={i}>
                  {url}
                </Text>
              ))}
            </View>
            {/* <View style={{marginTop: 15}}>
              {contacts?.map((desc, i) => (
                <Text style={styles.contactItem} key={i}>
                  {desc.substring(1, desc.length - 1).trim()}
                </Text>
              ))}
            </View> */}
            {/* <View>
              <Text>{linkTag}</Text>
            </View> */}
            <View style={styles.btn}>
              <AppButton
                onPress={() =>
                  props.navigation.navigate(authRoutes.getGift, {
                    data: offer,
                    type: type,
                  })
                }
                title={translate.t('news.getGift')}
                backgroundColor={Colors.bgGreen}
              />
            </View>
          </ScrollView>
        </>
      ) : (
        <Loader visible={true} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  img: {
    width: 349,
    height: 235.52,
    borderRadius: 15,
  },
  main: {
    marginHorizontal: 40,
  },
  imgView: {
    marginTop: 54,
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    textTransform: 'uppercase',
    marginTop: 13,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20.48,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: Colors.darkGrey,
  },
  amountView: {
    flexDirection: 'row',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.amountTxt,
  },
  mark: {
    width: 13,
    height: 13,
    top: 4,
    left: 3,
  },
  titleWrapper: {
    width: 200,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catId: {
    marginTop: 14,
  },
  catIdTxt: {
    fontSize: 12,
    color: Colors.lightGreyTxt,
  },
  btn: {
    marginTop: 15,
    marginBottom: 40,
  },
  description: {
    marginBottom: 10,
    color: Colors.darkGrey,
    fontFamily: 'BPG DejaVu Sans',
    lineHeight: 13.97,
    fontSize: 12,
  },
  locationView: {
    flexDirection: 'row',
  },
  icon: {
    width: 8.83,
    height: 11.56,
    marginRight: 8,
  },
  address: {
    marginBottom: 10,
    color: Colors.darkGrey,
    fontFamily: 'BPG DejaVu Sans',
    fontSize: 10,
    lineHeight: 18,
  },
  url: {
    color: Colors.urlColor,
    fontSize: 12,
    fontFamily: 'BPG DejaVu Sans',
    lineHeight: 13.97,
    fontWeight: '700',
  }
});

export default SingleOfferScreen;
