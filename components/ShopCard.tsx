import React from 'react';
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

export interface ShoplistProps {
  amount: number;
  image: ImageSourcePropType;
  description: string;
  id: number;
}


const ShopingCard: React.FC<ShoplistProps> = props => {
  const {amount, image, description, id} = props;
  const navigation = useNavigation();
  

  return (
    <TouchableOpacity
      style={styles.cardWrapper}
      onPress={navigation.navigate.bind(this, authRoutes.singleOffer, {
        itemId: id,
      })}>
      <View>
        <Image source={image} style={styles.img} />
      </View>
      <View style={styles.describeView}>
        <View style={styles.markView}>
          <Text style={styles.amountTxt}>{amount}</Text>
          <Image
            style={styles.mark}
            source={require('../assets/img/UniMark.png')}
          />
        </View>

        <Text style={styles.descriptionText}>{description}</Text>
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
  },
  descriptionText: {
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: '400',
    color: Colors.black,
    marginTop: 3,
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
});

export default ShopingCard;
