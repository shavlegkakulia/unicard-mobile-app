import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {authRoutes} from '../../navigation/routes';
import {IgetPartnersResponse} from '../../services/PartnersService';
import {ISearchServiceResponse} from '../../services/SearchService';
import {ITranslateReducer, ITranslateState} from '../../Store/types/translate';
import Colors from '../../theme/Colors';

interface IPartnersProps {
  partners?: IgetPartnersResponse;
  orgs?: ISearchServiceResponse;
}

const PartnersCard: React.FC<IPartnersProps> = props => {
  const translate = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;
  const partn = true;
  const org = true;
  // const {name, logo, point, pointDesc, id} = props;
  const navigation = useNavigation();
  let logo = '';
  if (partn && props?.partners?.url) {
    logo = props.partners.url;
  }
  if (org && props?.orgs?.image_url) {
    logo = `${props.orgs.image_url}/108x65.jpg`;
  }

  return (
    <TouchableOpacity
      style={styles.padding}
      onPress={navigation.navigate.bind(this, authRoutes.singlePartners, {
        id:
          (partn && props?.partners?.org_id) || (org && props.orgs?.result_id),
      })}>
      <View style={styles.main}>
        <View style={styles.imgView}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={{
              uri: logo,
            }}
          />
        </View>

        <Text style={styles.text}>
          {(partn && props?.partners?.name) ||
            (org && props?.orgs?.result_name)}
        </Text>
      </View>
      <View style={styles.pointView}>
        <Text style={styles.pointTxt}>
          {(partn && props?.partners?.unit_score) ||
            (org && props?.orgs?.unit_score)}{' '}
          {props?.partners?.unit_score || props?.orgs?.unit_score
            ? translate.t('common.score')
            : ''}
        </Text>
        <Text style={styles.amountTxt}>
          {(partn && props?.partners?.unit) || (org && props?.orgs?.unit)}{' '}
          {translate.t('common.gel')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default PartnersCard;

const styles = StyleSheet.create({
  padding: {
    paddingHorizontal: 30,
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
