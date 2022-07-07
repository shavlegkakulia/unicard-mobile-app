import React, {useEffect, useState} from 'react';
import {
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Share,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import Loader from '../../components/loader';
import {ScreenNavigationProp} from '../../interfaces/commons';
import ContactService, {
  IgetContactDetailsRequest,
  IgetContactResponse,
} from '../../services/ContactService';
import {ITranslateReducer, ITranslateState} from '../../Store/types/translate';
import Colors from '../../theme/Colors';

const AboutUs: React.FC<ScreenNavigationProp> = () => {
  const [contact, setContact] = useState<IgetContactResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const translate = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Unicard Mobile App',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {}
  };
  const getInfo = () => {
    const req: IgetContactDetailsRequest = {
      lang: '',
    };
    ContactService.GenerateContact(req).subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          setContact(Response.data);
        }
      },
      complete: () => {
        setLoading(false);
      },
      error: err => {
        console.log(err.response);
        setLoading(true);
      },
    });
  };
  useEffect(() => {
    getInfo();
  }, []);

  const main = Platform.select({
    ios: styles.main,
    android: styles.androidmain,
  });

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={Colors.bgGreen} size={'small'} />
      </View>
    );
  }

  //აპლიკაცია რომ გაეშვება, შეფასებისთვის ფუნქცია
  // const rateApp = () => {
  //   if (Platform.OS != 'ios') {
  //     //To open the Google Play Store
  //     Linking.openURL(`market://details?id=${GOOGLE_PACKAGE_NAME}`).catch(err =>
  //       alert('Please check for the Google Play Store')
  //     );
  //   } else {
  //     //To open the Apple App Store
  //     Linking.openURL(
  //       `itms://itunes.apple.com/in/app/apple-store/${APPLE_STORE_ID}`
  //     ).catch(err => alert('Please check for the App Store'));
  //   }
  // }

  return (
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
          <TouchableOpacity
            style={styles.row}
            onPress={() => Linking.openURL(`tel:${contact?.phone}`)}>
            <View style={styles.IconView}>
              <Image
                style={styles.phoneIcon}
                source={require('../../assets/img/phoneIcon.png')}
              />
            </View>
            <Text style={styles.txt}>{contact?.phone}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => Linking.openURL(`mailto:${contact?.contact_email}`)}>
            <View style={styles.IconView}>
              <Image
                style={styles.mailIcon}
                source={require('../../assets/img/mailIcon.png')}
              />
            </View>
            <Text style={styles.txt}>{contact?.contact_email}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => Linking.openURL('https://www.unicard.ge/')}>
            <View style={styles.IconView}>
              <Image
                style={styles.icon}
                source={require('../../assets/img/globeIcon.png')}
              />
            </View>
            <Text style={styles.txt}>{contact?.web_page_link}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() =>
              Linking.openURL('https://www.facebook.com/unicard.ge/')
            }>
            <View style={styles.IconView}>
              <Image
                style={styles.icon}
                source={require('../../assets/img/fbIcon.png')}
              />
            </View>
            <Text style={styles.txt}>{contact?.fb_link}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={onShare}>
            <View style={styles.IconView}>
              <Image
                style={styles.shareIcon}
                source={require('../../assets/img/shareIcon.png')}
              />
            </View>
            <Text style={styles.txt}>{translate.t('aboutUs.shareApp')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <View style={styles.IconView}>
              <Image
                style={styles.starIcon}
                source={require('../../assets/img/starIcon.png')}
              />
            </View>
            <Text style={styles.txt}>{translate.t('aboutUs.evaluate')}</Text>
          </TouchableOpacity>
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
    marginTop: Platform.OS === 'ios' ? 60 : 50,
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgColor,
  },
});

export default AboutUs;
