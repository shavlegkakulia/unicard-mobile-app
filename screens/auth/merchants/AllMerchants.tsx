import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import MerchantsService, {
  IgetMerchantsRequest,
  IMerchants,
} from '../../../services/MerchantsService';
import Colors from '../../../theme/Colors';
import MerchantItem from './merchantItem';

const AllMerchants: React.FC<IMerchants> = props => {
  const [merchants, setMerchnts] = useState<IMerchants[]>();
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <ScrollView contentContainerStyle={styles.main}>
      {merchants?.map((m, i) => (
        <MerchantItem merchant={m} key={i} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgColor,
  },
  main: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
});

export default AllMerchants;
