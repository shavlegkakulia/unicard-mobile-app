import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, Image} from 'react-native';
import {ScreenNavigationProp} from '../../../interfaces/commons';
import Colors from '../../../theme/Colors';
import {
  IgetPartnersDetailsRequest,
  IgetPartnersResponse,
} from '../../../services/SinglePartnersService';
import SinglePartnersService from '../../../services/SinglePartnersService';
import AppButton from '../../../components/CostumComponents/AppButton';

const SingleMerchantsScreen: React.FC<ScreenNavigationProp> = props => {
  const [organization, setOrganization] = useState<IgetPartnersResponse>();
  const id = props.route.params.merchId;

  const getOrgDetails = () => {
    const req: IgetPartnersDetailsRequest = {
      org_id: id,
      lang: '',
    };
    SinglePartnersService.GenerateSinglePartners(req).subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          setOrganization(Response.data);
          console.log(Response.data);
        }
      },
      error: err => {
        console.log(err.response);
      },
    });
  };
  useEffect(() => {
    getOrgDetails();
  }, []);
  console.log('>>>>>>>>>>>', organization?.organization?.name);
  return (
    <ScrollView>
 
      <View style={styles.shadow}>
        <View style={styles.main}>
          <Image
            resizeMode="contain"
            style={{width: 100, height: 140.4}}
            source={{uri: organization?.organization?.url}}
          />
        </View>
        <View style={styles.orgNameView}>
          <Text style={styles.name}>{organization?.organization?.name}</Text>
          <View style={styles.scoreView}>
            <Text style={styles.greenText}>
              {organization?.organization?.unit_score}{' '}
              {organization?.organization?.unit_score ? 'ქულა' : ''}
            </Text>
            <Text style={styles.pointText}>
              {organization?.organization?.unit_score
                ? organization?.organization?.unit_desc
                : ''}
            </Text>
          </View>
        </View>
      </View>
      {organization?.organization?.org_working_hours_s ? (
        <View style={styles.contactView}>
          <View style={styles.iconView}>
            <Image
              style={styles.time}
              source={require('../../../assets/img/timeIconGreen.png')}
            />
          </View>

          <Text style={styles.addressTxt}>
            {organization?.organization?.org_working_hours_s}
          </Text>
        </View>
      ) : null}
      {organization?.organization?.org_phone_s ? (
        <View style={styles.contactView}>
          <View style={styles.iconView}>
            <Image
              style={styles.phone}
              source={require('../../../assets/img/phoneIcon.png')}
            />
          </View>

          <Text style={styles.addressTxt}>
            {organization?.organization?.org_phone_s}
          </Text>
        </View>
      ) : null}
      {organization?.organization?.org_email ? (
        <View style={styles.contactView}>
          <View style={styles.iconView}>
            <Image
              style={styles.email}
              source={require('../../../assets/img/mailIcon.png')}
            />
          </View>

          <Text style={styles.addressTxt}>
            {organization?.organization?.org_email}
          </Text>
        </View>
      ) : null}
      {organization?.organization?.org_web_add ? (
        <View style={styles.contactView}>
          <View style={styles.iconView}>
            <Image
              style={styles.globe}
              source={require('../../../assets/img/globeIcon.png')}
            />
          </View>

          <Text style={styles.addressTxt}>
            {organization?.organization?.org_web_add}
          </Text>
        </View>
      ) : null}

      {organization?.organization?.org_fb ? (
        <View style={styles.contactView}>
          <View style={styles.iconView}>
            <Image
              style={styles.social}
              source={require('../../../assets/img/fbIcon.png')}
            />
          </View>

          <Text style={styles.addressTxt}>
            {organization?.organization?.org_fb}
          </Text>
        </View>
      ) : null}
      <View style={styles.btn}>
      <AppButton onPress={() => {}} title={'ობიექტების სია'} backgroundColor={Colors.bgGreen} />
      </View>
     
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  shadow: {
    height: 215,
    backgroundColor: Colors.white,
    shadowOffset: {width: 0, height: 11},
    shadowColor: Colors.bgGreen,
    shadowOpacity: 5,
    shadowRadius: 8,
    paddingHorizontal: 34,
  },
  main: {
    alignItems: 'center',
  },
  orgNameView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    width: 226,
    color: Colors.black,
    fontSize: 14,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
  },
  scoreView: {
    width: 93,
    alignItems: 'flex-end',
  },
  greenText: {
    color: Colors.bgGreen,
    fontSize: 16,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 19.2,
  },
  pointText: {
    fontSize: 10,
    color: Colors.darkGrey,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 14,
  },
  padding: {
    paddingHorizontal: 34,
  },
  aboutTxt: {
    marginTop: 45,
    fontSize: 14,
    color: Colors.black,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 23,
  },
  descTxt: {
    color: Colors.darkGrey,
    fontSize: 12,
    fontFamily: 'BPG DejaVu Sans',
    lineHeight: 13.97,
  },
  time: {
    width: 35.08,
    height: 35.08,
  },
  contactView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 19,
    marginTop: 30,
  },
  iconView: {
    width: 65,
    alignItems: 'center',
  },
  addressTxt: {
    width: 228,
    fontSize: 14,
    fontFamily: 'BPG DejaVu Sans',
    lineHeight: 16.8,
    color: Colors.bgGreen,
  },
  phone: {
    width: 20.4,
    height: 35.02,
  },
  email: {
    width: 35.08,
    height: 24.85,
  },
  globe: {
    width: 35.08,
    height: 35.08,
  },
  social: {
    width: 35.08,
    height: 35.08,
  },
  btn: {
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 41,
  },
});

export default SingleMerchantsScreen;
