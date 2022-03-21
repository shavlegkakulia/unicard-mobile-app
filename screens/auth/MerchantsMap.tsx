import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-map-clustering';
import {Marker} from 'react-native-maps';

const INITIAL_REGION = {
  latitude: 52.5,
  longitude: 19.2,
  latitudeDelta: 8.5,
  longitudeDelta: 8.5,
};

const MerchantsMap = () => (
  <View style={styles.mapcontainer}>
    <MapView initialRegion={INITIAL_REGION} style={styles.map}>
      <Marker coordinate={{latitude: 52.4, longitude: 18.7}} />
      <Marker coordinate={{latitude: 52.1, longitude: 18.4}} />
      <Marker coordinate={{latitude: 52.6, longitude: 18.3}} />
      <Marker coordinate={{latitude: 51.6, longitude: 18.0}} />
      <Marker coordinate={{latitude: 53.1, longitude: 18.8}} />
      <Marker coordinate={{latitude: 52.9, longitude: 19.4}} />
      <Marker coordinate={{latitude: 52.2, longitude: 21}} />
      <Marker coordinate={{latitude: 52.4, longitude: 21}} />
      <Marker coordinate={{latitude: 51.8, longitude: 20}} />
    </MapView>
  </View>
);

const styles = StyleSheet.create({
  mapcontainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MerchantsMap;
