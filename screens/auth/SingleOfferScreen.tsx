import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, ScrollView, View, Text} from 'react-native';
import {ScreenNavigationProp} from '../../interfaces/commons';
import DATA from '../../constants/shopListDummyData';
import Colors from '../../theme/Colors';
import OfferService, {
  IgetOfferDetailsRequest,
  IgetOfferResponse,
} from '../../services/OfferService';

const SingleOfferScreen: React.FC<ScreenNavigationProp> = ({route}) => {
  const [offer, setOffer] = useState<IgetOfferResponse>();
  const id = route.params.itemId;

  // const selectedOffer = offer.find(e => id === e.id);
  const getOfferDetails = () => {
    const req: IgetOfferDetailsRequest = {
      offer_id: id,
    };
    OfferService.getOfferDetails(req).subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          setOffer(Response.data.offer);
        }
      },
      error: err => {
        console.log(err.response);
      },
    });
  };
  console.log('offersssssssss', offer);
  useEffect(() => {
    getOfferDetails();
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.main}>
      <View style={styles.imgBtn}>
        <Image style={styles.img} source={offer?.image_url} />
        <View style={styles.imgText}>
          <Text style={styles.text}>1 სურათი</Text>
        </View>
      </View>
      <View style={styles.titleView}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{offer?.description}</Text>
        </View>

        <View style={styles.amountView}>
          <Text style={styles.amount}>{offer?.beacon_id}</Text>
          <Image
            style={styles.mark}
            source={require('../../assets/img/UniMark.png')}
          />
        </View>
      </View>
    </ScrollView>
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
});

export default SingleOfferScreen;
