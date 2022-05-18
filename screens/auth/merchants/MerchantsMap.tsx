import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MapView from 'react-native-map-clustering';
import {Marker} from 'react-native-maps';
import { useSelector } from 'react-redux';
import MerchantsService, { IgetMerchantsRequest, IMerchants } from '../../../services/MerchantsService';
import { ITranslateState,  ITranslateReducer } from '../../../Store/types/translate';
import Colors from '../../../theme/Colors';
import MerchantItem from './merchantItem';


const INITIAL_REGION = {
  latitude: 41.80737670360194,
  longitude: 44.793170490777214,
  latitudeDelta: 8.5,
  longitudeDelta: 8.5,
};

const MerchantsMap = () => {
  const [merchants, setMerchnts] = useState<IMerchants[]>();
  const [isLoading, setIsLoading] = useState(true);
  const translate = useSelector<ITranslateReducer>(tran => tran.TranslateReducer) as ITranslateState;

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

  const randomElements = merchants?.sort(() => Math.random() - Math.random()).slice(0, 2);

  return (
    <View style={styles.mapcontainer}>
      <MapView initialRegion={INITIAL_REGION} style={styles.map}>
        {merchants?.map((m, i) => (
          <Marker
            coordinate={{
              latitude: parseFloat(m.lat),
              longitude: parseFloat(m.lon),
            }}
            key={i}
          >
            <Image source={require('./../../../assets/img/mapCircle.png')} style={styles.icon} />
          </Marker>
        ))}
      </MapView>
      <View style={styles.bottomView}>
        <TouchableOpacity>
          <Text style={styles.allText}>
            {translate.t('common.all')}
          </Text>
        </TouchableOpacity>
        {randomElements?.map((m, i) => <MerchantItem {...m} key={m.lat + i} />)}
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
    paddingVertical: 20
  },
  icon: {
    width: 30,
    height: 30
  },
  allText: {
    color: Colors.lightOrange,
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'BPG DejaVu Sans Mt',
    fontWeight: '700',
    alignSelf: 'flex-end'
  }
});

export default MerchantsMap;
