import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IMerchants} from '../../../services/MerchantsService';
import Colors from '../../../theme/Colors';

const MerchantItem: React.FC<IMerchants> = props => {
  console.log(props.address);
  return (
    <TouchableOpacity style={styles.item}>
      <View style={styles.cardShadow}>
        <View style={styles.cardContainer}>
          <Image source={{uri: props.logo_url}} style={styles.logo} />
        </View>
      </View>
      <View style={styles.desc}>
        <Text style={styles.name}>{props.merch_name}</Text>
        <Text style={styles.address}>
          <Image
            source={require('./../../../assets/img/icon-pin.png')}
            style={styles.pin}
          />{' '}
          {props.address?.trim().replace(/<[^>]*>?/gm, '')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    flex: 1,
  },
  cardShadow: {
    borderRadius: 25,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 25,
    overflow: 'hidden',
  },
  logo: {
    width: 50,
    height: 50,
  },
  desc: {
    marginLeft: 15,
    flex: 1,
    justifyContent: 'space-around',
  },
  name: {
    color: Colors.dark,
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'BPG DejaVu Sans Mt',
    fontWeight: '400',
  },
  address: {
    color: Colors.darkGrey,
    fontSize: 10,
    lineHeight: 14,
    fontFamily: 'BPG DejaVu Sans Mt',
  },
  pin: {
      marginRight: 7
  },
});

export default MerchantItem;
