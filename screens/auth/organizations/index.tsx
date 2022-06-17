import React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import NotFound from '../../../components/CostumComponents/NotFound';
import PartnersCard from '../../../components/CostumComponents/PartnersCard';
import ShopingCard from '../../../components/ShopCard';
import {ScreenNavigationProp} from '../../../interfaces/commons';
import {
  IOrganizationReducer,
  IOrganizatiosState,
} from '../../../Store/types/organizations_types';
import {
  ITranslateReducer,
  ITranslateState,
} from '../../../Store/types/translate';
import Colors from '../../../theme/Colors';

const Organizations: React.FC<ScreenNavigationProp> = props => {
  const organizations = useSelector<IOrganizationReducer>(
    state => state.OrganizationReducer,
  ) as IOrganizatiosState;
  const translate = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;

  if (organizations.fetching) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size={'small'} color={Colors.bgGreen} />
      </View>
    );
  }
  const image = require('../../../assets/img/error.png');

  let activePrize = props.route.params.activePrize;
  let activeOrg = props.route.params.activeOrg;

  return (
    <ScrollView contentContainerStyle={styles.main}>
      {organizations.organizations?.length ? (
        organizations.organizations?.map((org, index) =>
          activePrize ? (
            <ShopingCard orgs={org} key={index} />
          ) : (
            <PartnersCard orgs={org} key={index} />
          ),
        )
      ) : (
        <NotFound
          onPress={() => {}}
          title={translate.t('generalErrors.contentNotFound')}
          backgroundColor={Colors.red}
          image={image}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default Organizations;
