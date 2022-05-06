import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
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
  let logo = {uri: partners?.partner_logo};
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
    <View>
      {partners?.partners?.map(e => (
        <PartnersCard
          key={e?.partner_id}
          name={e?.partner_name}
          logo={e?.partner_logo}
        />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({});

export default Partners;
