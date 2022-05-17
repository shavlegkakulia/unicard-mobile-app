import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import PartnersCard from '../../components/CostumComponents/PartnersCard';
import Loader from '../../components/loader';
import {ScreenNavigationProp} from '../../interfaces/commons';

import PartnersService, {
  IgetPartnersResponse,
} from '../../services/PartnersService';

const Partners: React.FC<ScreenNavigationProp> = () => {
  const [partners, setPartners] = useState<IgetPartnersResponse>();
  const [loading, setLoading] = useState();
  console.log(partners);
  let logo = {uri: partners?.url};
  const getPartners = () => {
    PartnersService.GeneratePartners().subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          setPartners(Response.data);
        }
      },
      error: err => {
        console.log(err.response);
      },
    });
  };
  useEffect(() => {
    getPartners();
  }, []);
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
const styles = StyleSheet.create({});

export default Partners;
