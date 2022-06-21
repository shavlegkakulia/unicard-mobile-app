import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Colors from '../theme/Colors';
import {authRoutes} from '../navigation/routes';
import {IgetProducteListResponse} from '../services/ProductListService';
import {useSelector} from 'react-redux';
import {ITranslateReducer, ITranslateState} from '../Store/types/translate';
import {ISearchServiceResponse} from '../services/SearchService';

interface IComponentProps {
  product?: IgetProducteListResponse;
  orgs?: ISearchServiceResponse;
}

const ShopingCard: React.FC<IComponentProps> = props => {
  const translate = useSelector<ITranslateReducer>(
    tran => tran.TranslateReducer,
  ) as ITranslateState;
  const navigation = useNavigation();
  const prod = true;
  const org = true;
  let imgUrl = '';
  if (prod && props?.product?.images) {
    imgUrl = props.product.images[0];
  }
  if (org && props?.orgs?.image_url) {
    imgUrl = `${props.orgs.image_url}/186x186.jpg`;
  }

  return (
    <TouchableOpacity
      style={styles.cardWrapper}
      onPress={navigation.navigate.bind(this, authRoutes.singleOffer, {
        id: (prod && props.product?.id) || (org && props.orgs?.result_id),
        type: props.product?.type_id || (org && props.orgs?.type_id),
      })}>
      <View>
        <Image source={{uri: imgUrl}} style={styles.img} />
      </View>
      <View style={styles.describeView}>
        <View style={styles.seeMoreView}>
          <View style={styles.markView}>
            <Text style={styles.amountTxt}>
              {(prod && props.product?.price) || (org && props.orgs?.price)}
            </Text>
            <Image
              style={styles.mark}
              source={require('../assets/img/UniMark.png')}
            />
          </View>
          <View style={styles.seeMoreView}>
            <Text style={styles.seemoreTxt}>{translate.t('common.more')}</Text>
            <Image
              style={styles.leftArrow}
              source={require('../assets/img/leftArrow.png')}
            />
          </View>
        </View>

        <Text style={styles.descriptionText}>
          {(prod && props.product?.name) || (org && props.orgs?.result_name)}
        </Text>
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
    marginHorizontal: 15,
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
