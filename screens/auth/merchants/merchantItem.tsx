import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {authRoutes} from '../../../navigation/routes';
import {IMerchants} from '../../../services/MerchantsService';
import Colors from '../../../theme/Colors';

interface IPageProps {
  merchant: IMerchants;
}

const MerchantItem: React.FC<IPageProps> = props => {
  const navigation = useNavigation();
  console.log('>>>>>>>>', props);
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate(authRoutes.aroundUs, {
          merchant: {...props?.merchant},
        })
      }>
      <View style={styles.cardContainer}>
        <Image
          resizeMode="contain"
          source={{uri: props?.merchant.logo_url}}
          style={styles.logo}
        />
      </View>
      <View style={styles.main}>
        <Text style={styles.name}>{props?.merchant.merch_name}</Text>
        <View style={styles.mapView}>
          <Image
            source={require('./../../../assets/img/icon-pin.png')}
            style={styles.pin}
          />
          <Text style={styles.address}>
            {props?.merchant.address?.trim().replace(/<[^>]*>?/gm, '')}
          </Text>
        </View>
      </View>
      {/* <View style={styles.desc}>
        <Text style={styles.name}>{props.merch_name}</Text>
        <Text style={styles.address}>
          <Image
            source={require('./../../../assets/img/icon-pin.png')}
            style={styles.pin}
          />{' '}
          {props.address?.trim().replace(/<[^>]*>?/gm, '')}
        </Text>
      </View> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    flex: 1,
    width: 272,
  },
  cardContainer: {
    width: 50,
    height: 50,
    shadowOffset: {width: 0, height: 2},
    shadowColor: Colors.bgGreen,
    shadowOpacity: 5,
    shadowRadius: 1.5,
    backgroundColor: Colors.white,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 25,
    height: 23,
  },
  desc: {
    marginLeft: 15,
    flex: 1,
    justifyContent: 'space-around',
  },
  name: {
    color: Colors.black,
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'BPG DejaVu Sans Mt',
  },
  address: {
    color: Colors.darkGrey,
    fontSize: 10,
    lineHeight: 14,
    fontFamily: 'BPG DejaVu Sans Mt',
  },
  pin: {
    marginRight: 7,
    width: 8.78,
    height: 11.49,
  },
  mapView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },
  main: {
    marginLeft: 16,
  },
});

export default MerchantItem;
