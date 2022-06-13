import React, {useEffect, useState} from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Loader from '../../components/loader';
import {ScreenNavigationProp} from '../../interfaces/commons';
import ContactService, {
  IgetContactDetailsRequest,
  IgetContactResponse,
} from '../../services/ContactService';
import { ITranslateReducer, ITranslateState } from '../../Store/types/translate';
import Colors from '../../theme/Colors';

const AboutUs: React.FC<ScreenNavigationProp> = () => {
  const [contact, setContact] = useState<IgetContactResponse>();
  const translate = useSelector<ITranslateReducer>(state => state.TranslateReducer) as ITranslateState;

  
  const getBarcode = () => {
    const req: IgetContactDetailsRequest = {
      lang: '',
    };
    ContactService.GenerateContact(req).subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          setContact(Response.data);
        }
      },
      error: err => {
        console.log(err.response);
      },
    });
  };
  useEffect(() => {
    getBarcode();
  }, []);

  const main = Platform.select({
    ios: styles.main,
    android: styles.androidmain
  })
  
  return (
    // <View style={styles.main}>
    //   {!loading && cardInfo ? (
    //     <>
    //       <View style={styles.barcodeNum}>
    //         <Text style={styles.num}>{cardInfo?.vcard}</Text>
    //       </View>
    //       <Image
    //         style={styles.img}
    //         source={require('../../assets/img/barcodeImg.png')}
    //       />
    //     </>
    //   ) : (
    //     <Loader visible={true} />
    //   )}
    // </View>
    <ScrollView>
      <View style={main}>
        <Image
          style={styles.img}
          source={require('../../assets/img/UniCardImg.png')}
        />
      </View>
      {contact ? (
        <View style={styles.listView}>
          <View style={styles.row}>
            <View style={styles.IconView}>
              <Image
                style={styles.icon}
                source={require('../../assets/img/timeIconGreen.png')}
              />
            </View>
            <Text style={styles.txt}>{contact?.work_hours}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.IconView}>
              <Image
                style={styles.phoneIcon}
                source={require('../../assets/img/phoneIcon.png')}
              />
            </View>
            <Text style={styles.txt}>{contact?.phone}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.IconView}>
              <Image
                style={styles.mailIcon}
                source={require('../../assets/img/mailIcon.png')}
              />
            </View>
            <Text style={styles.txt}>{contact?.contact_email}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.IconView}>
              <Image
                style={styles.icon}
                source={require('../../assets/img/globeIcon.png')}
              />
            </View>
            <Text style={styles.txt}>{contact?.web_page_link}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.IconView}>
              <Image
                style={styles.icon}
                source={require('../../assets/img/fbIcon.png')}
              />
            </View>
            <Text style={styles.txt}>{contact?.fb_link}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.IconView}>
              <Image
                style={styles.shareIcon}
                source={require('../../assets/img/shareIcon.png')}
              />
            </View>
            <Text style={styles.txt}>{translate.t('aboutUs.shareApp')}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.IconView}>
              <Image
                style={styles.starIcon}
                source={require('../../assets/img/starIcon.png')}
              />
            </View>
            <Text style={styles.txt}>{translate.t('aboutUs.evaluate')}</Text>
          </View>
        </View>
      ) : (
        <Loader visible={true} />
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  main: {
    height: 244,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    shadowOffset: {width: 0, height: 11},
    shadowColor: Colors.bgGreen,
    shadowOpacity: 5,
    shadowRadius: 8,
  },
  androidmain: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    height: 244,
    shadowColor: Colors.bgGreen,
    elevation: 20,
  },
  img: {
    width: 175.96,
    height: 98,
  },
  listView: {
    marginHorizontal: Platform.OS === 'ios' ? 20 : 0,
    marginTop: Platform.OS === 'ios' ? 103 : 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 31,
  },
  IconView: {
    width: 100,
    alignItems: 'center',
  },
  icon: {
    width: 35.08,
    height: 35.08,
  },
  phoneIcon: {
    width: 20.4,
    height: 35.02,
  },
  mailIcon: {
    width: 35.08,
    height: 24.85,
  },
  shareIcon: {
    width: 35.08,
    height: 34.01,
  },
  starIcon: {
    width: 35.07,
    height: 35.09,
  },

  txt: {
    color: Colors.bgGreen,
    fontSize: 14,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
  },
});

export default AboutUs;
