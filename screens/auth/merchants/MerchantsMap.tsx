import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView from 'react-native-map-clustering';
import {Callout, CalloutSubview, Marker} from 'react-native-maps';
import {useSelector} from 'react-redux';
import {ScreenNavigationProp} from '../../../interfaces/commons';
import {authRoutes} from '../../../navigation/routes';
import MerchantsService, {
  IgetMerchantsRequest,
  IMerchants,
} from '../../../services/MerchantsService';
import {
  ITranslateState,
  ITranslateReducer,
} from '../../../Store/types/translate';
import Colors from '../../../theme/Colors';
import MerchantItem from './merchantItem';

const INITIAL_REGION = {
  latitude: 41.80737670360194,
  longitude: 44.793170490777214,
  latitudeDelta: 8.5,
  longitudeDelta: 8.5,
};

const MerchantsMap: React.FC<ScreenNavigationProp> = props => {
  const [merchants, setMerchnts] = useState<IMerchants[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [merchView, setMerchView] = useState(false);
  const translate = useSelector<ITranslateReducer>(
    tran => tran.TranslateReducer,
  ) as ITranslateState;
  const navigation = useNavigation();

  useEffect(() => {
    const data: IgetMerchantsRequest = {};

    MerchantsService.GetMerchantList(data).subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          setMerchnts(Response.data.merchants);
        }
      },
      complete: () => {
        setIsLoading(false);
      },
      error: err => {
        console.log(err);
        setIsLoading(false);
      },
    });
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={Colors.bgGreen} size={'small'} />
      </View>
    );
  }

  const randomElements = merchants
    ?.sort(() => Math.random() - Math.random())
    .slice(0, 2);

  // const infoHandler = () => {
  //   console.log('lallall  is clicked');
  //   // setMerchView(prev => !prev);

  // }

  return (
    <View style={styles.mapcontainer}>
      <MapView initialRegion={INITIAL_REGION} style={styles.map}>
        {merchants?.map((m, i) => (
          <Marker
            coordinate={{
              latitude: parseFloat(m.lat),
              longitude: parseFloat(m.lon),
            }}
            key={i}>
            <Image
              source={require('./../../../assets/img/mapCircle.png')}
              style={styles.icon}
            />

            {merchView && <Text>{m.merch_name}</Text>}
            <Callout tooltip={true} style={styles.merchView}>
              <View style={styles.merchInfoWrapper}>
                <View style={styles.logoView}>
                  <Image
                    resizeMode="contain"
                    style={styles.merchLogo}
                    source={{uri: m.logo_url}}
                  />
                </View>
                <View style={styles.merchlocation}>
                  <Text style={styles.merchName}>{m.merch_name}</Text>
                  <View style={styles.addressView}>
                    <Image
                      style={styles.pin}
                      source={require('../../../assets/img/icon-pin.png')}
                    />
                    <Text style={styles.addressText}>{m.address}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.scoreView}>
                <Text style={styles.scoreTxt}>-{m.unit_score} ქულა</Text>
                <CalloutSubview
                  onPress={() =>
                    props.navigation.navigate(authRoutes.singleMerchants, {
                      merchId: m.new_id,
                    })
                  }
                  >
                  <Image
                    style={styles.seeMore}
                    source={require('../../../assets/img/seeMoreIcon.png')}
                  />
                </CalloutSubview>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.bottomView}>
        <TouchableOpacity>
          <Text style={styles.allText}>{translate.t('common.all')}</Text>
        </TouchableOpacity>
        {randomElements?.map((m, i) => (
          <MerchantItem {...m} key={m.lat + i} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapcontainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 200,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgColor,
  },
  bottomView: {
    height: 200,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.bgColor,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
  allText: {
    color: Colors.lightOrange,
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'BPG DejaVu Sans Mt',
    fontWeight: '700',
    alignSelf: 'flex-end',
  },
  merchView: {
    width: 248,
    height: 140,
    borderRadius: 15,
    backgroundColor: Colors.bgGreen,
    overflow: 'hidden',
  },
  merchInfoWrapper: {
    width: 248,
    height: 105,
    backgroundColor: Colors.white,
    paddingHorizontal: 9,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
  },
  merchLogo: {
    width: 67,
    height: 67,
    borderRadius: 50,
  },
  logoView: {
    width: 80,
    height: 80,
    shadowOffset: {width: 0, height: 2},
    shadowColor: Colors.bgGreen,
    shadowOpacity: 5,
    shadowRadius: 1.5,
    backgroundColor: Colors.white,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  merchlocation: {
    paddingLeft: 10,
  },
  addressText: {
    width: 129.82,
    fontSize: 10,
    fontFamily: 'BPG DejaVu Sans Mt',
    color: Colors.darkGrey,
    lineHeight: 14,
  },
  addressView: {
    flexDirection: 'row',
    marginTop: 7,
  },
  scoreView: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    justifyContent: 'space-between',
  },
  merchName: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: 'BPG DejaVu Sans Mt',
  },
  pin: {
    width: 8.08,
    height: 11.49,
  },
  scoreTxt: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
  },
  seeMore: {
    width: 21,
    height: 21,
  },
});

export default MerchantsMap;
