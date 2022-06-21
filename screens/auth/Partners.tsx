import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import PartnersCard from '../../components/CostumComponents/PartnersCard';
import {ScreenNavigationProp} from '../../interfaces/commons';

import PartnersService, {
  IgetPartnersResponse,
} from '../../services/PartnersService';
import Colors from '../../theme/Colors';

const Partners: React.FC<ScreenNavigationProp> = () => {
  const [partners, setPartners] = useState<IgetPartnersResponse>();
  const [loading, setLoading] = useState(false);
  const getPartners = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    PartnersService.GeneratePartners().subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          setPartners(Response.data);
        }
      },
      complete: () => setLoading(false),
      error: err => {
        setLoading(false);
        console.log(err.response);
      },
    });
  };
  useEffect(() => {
    getPartners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size={'small'} color={Colors.bgGreen} />
      </View>
    );
  }

  return (
    <ScrollView>
      {partners?.organizations?.map(partn => (
        <PartnersCard partners={partn} key={partn.org_id} />
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Partners;
