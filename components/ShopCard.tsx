import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Colors from '../theme/Colors';
import {authRoutes} from '../navigation/routes';
import {IgetProducteResponse} from '../services/ProductService';
import ProductList, {
  Igeneralresp,
  IgetProducteListRequest,
  IgetProducteListResponse,
} from '../services/ProductListService';
import navigation from '../navigation/navigation';

// export interface ShoplistProps {
//   id?: number;
//   name: string;
//   description?: string;
//   price: string;
//   title?: string;
//   short_desc?: string;
//   images?: string[];
//   show_brand: boolean;
//   show_delivery_form: boolean;
// }

const ShopingCard: React.FC<IgetProducteListResponse> = props => {
  const navigation = useNavigation();
  let imgUrl = '';
  if (props.images?.length) {
    imgUrl = props.images[0];
  }
  console.log('props=======>', props.name);
  return (
    <TouchableOpacity
      style={styles.cardWrapper}
      onPress={navigation.navigate.bind(this, authRoutes.singleOffer, {
        id: props.id,
      })}>
      <View>
        <Image source={{uri: imgUrl}} style={styles.img} />
      </View>
      <View style={styles.describeView}>
        <View style={styles.seeMoreView}>
          <View style={styles.markView}>
            <Text style={styles.amountTxt}>{props.price}</Text>
            <Image
              style={styles.mark}
              source={require('../assets/img/UniMark.png')}
            />
          </View>
          <View style={styles.seeMoreView}>
            <Text style={styles.seemoreTxt}>ვრცლად</Text>
            <Image
              style={styles.leftArrow}
              source={require('../assets/img/leftArrow.png')}
            />
          </View>
        </View>

        <Text style={styles.descriptionText}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: Colors.white,
    width: 163,
    height: 180,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 28,
    marginLeft: 23,
  },

  img: {
    width: '100%',
    height: 110,
  },
  describeView: {
    backgroundColor: Colors.white,
    padding: 13,
  },
  amountTxt: {
    color: Colors.amountTxt,
    fontWeight: '700',
    fontSize: 16,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 19.2,
  },
  descriptionText: {
    fontSize: 10,
    fontWeight: '400',
    color: Colors.black,
    marginTop: 3,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 12,
  },
  mark: {
    width: 13,
    height: 13,
    marginLeft: 2,
  },
  markView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeMoreView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seemoreTxt: {
    fontSize: 8,
    color: Colors.darkGrey,
    fontFamily: 'BPG DejaVu Sans',
    lineHeight: 9.31,
  },
  leftArrow: {
    width: 5,
    height: 8,
    left: 4,
  },
});

export default ShopingCard;
