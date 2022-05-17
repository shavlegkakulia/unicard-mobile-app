import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, Image} from 'react-native';
import {ScreenNavigationProp} from '../../interfaces/commons';
import Colors from '../../theme/Colors';

import {htmlToString} from '../../utils/converts';
import {
  IgetPartnersDetailsRequest,
  IgetPartnersResponse,
} from '../../services/SinglePartnersService';
import SinglePartnersService from '../../services/SinglePartnersService';

const SinglePartners: React.FC<ScreenNavigationProp> = props => {
  const [organization, setOrganization] = useState<IgetPartnersResponse>();
  const id = props.route.params.id;

  const getOrgDetails = () => {
    const req: IgetPartnersDetailsRequest = {
      org_id: id,
      lang: '',
    };
    SinglePartnersService.GenerateSinglePartners(req).subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          setOrganization(Response.data);
          console.log(Response.data);
        }
      },
      error: err => {
        console.log(err.response);
      },
    });
  };
  useEffect(() => {
    getOrgDetails();
  }, []);
  console.log('>>>>>>>>>>>', organization?.organization?.url);
  return (
    <ScrollView style={styles.main}>
      <Image style={{width: 200, height: 200}} source={{uri: organization?.organization?.url}} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});

export default SinglePartners;
