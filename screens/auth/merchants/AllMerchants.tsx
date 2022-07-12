import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  RefreshControl,
  Linking,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import MerchantsService, {
  IgetMerchantsRequest,
  IMerchants,
} from '../../../services/MerchantsService';
import Colors from '../../../theme/Colors';
import MerchantItem from './merchantItem';

const AllMerchants: React.FC<IMerchants> = props => {
  const [merchants, setMerchnts] = useState<IMerchants[]>();
  const [refreshing, setRefreshing] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMore();
  }, []);

  const onRefresh = () => {
    //Clear old data of the list
    setMerchnts([]);
    //Call the Service to get the latest data
    getMerchantsList();
  };

  const fetchMore = () => {
    setMerchnts(prevState => {
      return [
        ...(prevState || []),
        ...Array.from({length: 10}).map(
          (_, i) => i + 1 + (prevState?.length || 0),
        ),
      ];
    });
  };

  const getMerchantsList = () => {
    const data: IgetMerchantsRequest = {};

    MerchantsService.GetMerchantList(data).subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          setMerchnts(Response.data.merchants);
          setRefreshing(false);
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
  };
  useEffect(() => {
    getMerchantsList();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={Colors.bgGreen} size={'small'} />
      </View>
    );
  }

  return (
    // <ScrollView contentContainerStyle={styles.main}>
    //   {merchants?.map((m, i) => (
    //     <MerchantItem merchant={m} key={i} />
    //   ))}
    // </ScrollView>
    <FlatList
    showsVerticalScrollIndicator={true}
      style={styles.main}
      data={merchants}
      onEndReached={fetchMore}
      renderItem={m => {
        return <MerchantItem merchant={m.item} key={m.index} />;
      }}
      refreshControl={
        <RefreshControl
          tintColor={Colors.bgGreen}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    />
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
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});

export default AllMerchants;
