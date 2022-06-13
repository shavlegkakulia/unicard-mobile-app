import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import { useSelector } from 'react-redux';
import AppTextInput from '../../components/CostumComponents/AppTextInput';

import {ScreenNavigationProp} from '../../interfaces/commons';
import {authRoutes} from '../../navigation/routes';
import PartnersService, {
  IgetPartnersResponse,
} from '../../services/PartnersService';
import { ITranslateReducer, ITranslateState } from '../../Store/types/translate';

import Colors from '../../theme/Colors';
type RouteParamList = {
  params: {
    key?: string;
  };
};

const SearchScreen: React.FC<ScreenNavigationProp> = props => {
  const translate = useSelector<ITranslateReducer>(state => state.TranslateReducer) as ITranslateState;

  const [partners, setPartners] = useState<IgetPartnersResponse>();
  console.log('esssssssss', partners?.organizations);
  const Organization = partners?.organizations;

  const route = useRoute<RouteProp<RouteParamList, 'params'>>();
  console.log(route.params.key);
  const icon = require('../../assets/img/searchSmallGreen.png');

  const getPartners = () => {
    if (route.params.key === 'partners') {
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
    } else {
      //
    }
  };
  useEffect(() => {
    getPartners();
  }, []);

  return (
    <>
      <KeyboardAvoidingView style={styles.center}>
        <AppTextInput placeholder={translate.t('common.search')} icon={icon} onChange={function (value: string): void {
          
        } } />
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
});

export default SearchScreen;
