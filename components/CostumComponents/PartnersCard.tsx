import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import navigation from '../../navigation/navigation';
import {authRoutes} from '../../navigation/routes';
import Colors from '../../theme/Colors';

export interface IPartnersProps {
  name?: string;
  logo?: string;
  point?: string;
  pointDesc?: string;
  id?: string;
}

const PartnersCard: React.FC<IPartnersProps> = props => {
  const {name, logo, point, pointDesc, id} = props;
  const navigation = useNavigation();
  console.log(id);
  return (
    <TouchableOpacity
      style={styles.padding}
      onPress={navigation.navigate.bind(this, authRoutes.singlePartners, {
        id: id,
      })}>
      <View style={styles.main}>
        <View style={styles.imgView}>
          <Image
            style={styles.logo}
            source={{
              uri: logo,
            }}
          />
        </View>

        <Text style={styles.text}>{name}</Text>
      </View>
      <View style={styles.pointView}>
        <Text style={styles.pointTxt}>
          {point} {point ? 'ქულა' : ''}
        </Text>
        <Text style={styles.amountTxt}>{point ? pointDesc : ''}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default PartnersCard;

const styles = StyleSheet.create({
  padding: {
    paddingHorizontal: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  main: {
    flexDirection: 'row',
    marginTop: 35,
    alignItems: 'center',
    height: 56,
  },
  imgView: {
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
    width: 25.9,
    height: 23.14,
  },
  text: {
    fontSize: 14,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
    color: Colors.black,
    marginLeft: 16,
    width: 164,
  },
  pointView: {
    marginTop: 35,
    alignItems: 'flex-end',
  },
  pointTxt: {
    color: Colors.bgGreen,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 19.2,
    fontSize: 16,
  },
  amountTxt: {
    color: Colors.darkGrey,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 14,
    fontSize: 10,
    marginTop: 10,
  },
});
