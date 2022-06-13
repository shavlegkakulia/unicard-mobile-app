import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import PartnersCard from '../../components/CostumComponents/PartnersCard';
import Loader from '../../components/loader';
import {ScreenNavigationProp} from '../../interfaces/commons';

import PartnersService, {
  IgetPartnersResponse,
} from '../../services/PartnersService';
import Colors from '../../theme/Colors';

const Partners: React.FC<ScreenNavigationProp> = () => {
  const [partners, setPartners] = useState<IgetPartnersResponse>();
  const [loading, setLoading] = useState(false);
  console.log('>>>>>>>>', partners);
  let logo = {uri: partners?.url};
  const getPartners = () => {
    if(loading) return;
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
  }, []);

  if(loading) {
    return <View style={styles.loader}>
      <ActivityIndicator size={'small'} color={Colors.bgGreen} />
    </View>
  }

  return (
    <ScrollView>
      {partners?.organizations?.map(e => (
        <PartnersCard
          key={e?.org_id}
          name={e?.name}
          logo={e?.url}
          point={e?.unit_score}
          pointDesc={e?.unit_desc}
          id={e?.org_id}
        />
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Partners;
