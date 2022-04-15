import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, ScrollView, View, Text} from 'react-native';
import {ScreenNavigationProp} from '../../interfaces/commons';
import Colors from '../../theme/Colors';
import ProducteService, {
  IgetProducteDetailsRequest,
  IgetProducteResponse,
} from '../../services/ProductService';
import Loader from '../../components/loader';
import {htmlToString} from '../../utils/converts';
import AppButton from '../../components/CostumComponents/AppButton';

const SingleOfferScreen: React.FC<ScreenNavigationProp> = props => {
  const [offer, setOffer] = useState<IgetProducteResponse>();
  const [loading, setLoading] = useState<boolean>();
  const id = props.route.params.id;

  const regex = /<a\s+(?:[^>]*?\s+)\1/; //ლინკს პოულობს კოდში და იღებს//თუმცა ეიჩტიემელის ატრიბუტები ვერ მოვაშორე
  const linkTag = offer?.description?.match(regex);
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
  return (
    <View>
      {!loading && offer ? (
        <>
          <ScrollView contentContainerStyle={styles.main}>
            <View style={styles.imgBtn}>
              <Image style={styles.img} source={offer?.images} />
              <View style={styles.imgText}>
                <Text style={styles.text}>1 სურათი</Text>
              </View>
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
          onPress={() => {}}
          title={'საჩუქრის მიღება'}
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
    width: 343,
    height: 235.52,
  },
  main: {
    paddingHorizontal: 32,
    // alignItems: 'center',
  },
  imgBtn: {
    height: 281,
    backgroundColor: Colors.bgGreen,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 44,
  },
  imgText: {
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
    marginTop: 29,
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
  },
});

export default SingleOfferScreen;
