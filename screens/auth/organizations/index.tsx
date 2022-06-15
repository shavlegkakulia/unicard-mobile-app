import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {
  IOrganizationReducer,
  IOrganizatiosState,
} from '../../../Store/types/organizations_types';
import Colors from '../../../theme/Colors';

const Organizations: React.FC = () => {
  const organizations = useSelector<IOrganizationReducer>(
    state => state.OrganizationReducer,
  ) as IOrganizatiosState;

  if (organizations.fetching) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size={'small'} color={Colors.bgGreen} />
      </View>
    );
  }

  return (
    <View>
      {organizations.organizations?.length ? (
        organizations.organizations?.map(org => (
          <Text key={org.result_id}>{org.result_name}</Text>
        ))
      ) : (
        <Text>no data</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Organizations;
