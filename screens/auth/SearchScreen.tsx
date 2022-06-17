import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, KeyboardAvoidingView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AppTextInput from '../../components/CostumComponents/AppTextInput';
import {ScreenNavigationProp} from '../../interfaces/commons';
import { authRoutes } from '../../navigation/routes';
import {ISearchDetailsRequest} from '../../services/SearchService';
import {get_organizations} from '../../Store/actions/organizations_actions';
import {ITranslateReducer, ITranslateState} from '../../Store/types/translate';

const SearchScreen: React.FC<ScreenNavigationProp> = () => {
  const translate = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;

  const [searchValue, setSearchValue] = useState<string>();
  const dispatch = useDispatch();

  const icon = require('../../assets/img/searchSmallGreen.png');
  const navigation = useNavigation();

  let activeOrg = true;

  const SearchProduct = () => {
    let data: ISearchDetailsRequest = {
      input_text: searchValue,
      page_index: '1',
      row_count: '10',
      prizes: false,
      organisations: true,
    };

    dispatch(get_organizations(data));
    console.log('organization dataaaaa', data);
    navigation.navigate(authRoutes.searchResults, {activeOrg: activeOrg});
  };

  return (
    <>
      <KeyboardAvoidingView style={styles.center}>
        <AppTextInput
          placeholder={translate.t('common.search')}
          icon={icon}
          value={searchValue}
          onChange={o => setSearchValue(o)}
          onPressProp={SearchProduct}
        />
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
