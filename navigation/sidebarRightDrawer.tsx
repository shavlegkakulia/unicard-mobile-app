import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

import {ScreenNavigationProp} from '../interfaces/commons';
import {useNavigation} from '@react-navigation/native';
import Colors from '../theme/Colors';
import CategoryButton from '../components/CostumComponents/CategoryButton';
import ProductFiltersService, {
  IgetfilterCategoriesResponse,
} from '../services/ProductFiltersService';
import {subscriptionService} from '../services/SubscribeService';
import {authRoutes} from './routes';
import {useDispatch, useSelector} from 'react-redux';
import {ITranslateReducer, ITranslateState} from '../Store/types/translate';
import {ISearchDetailsRequest} from '../services/SearchService';
import {get_organizations} from '../Store/actions/organizations_actions';
import {IAuthReducer, IAuthState} from '../Store/types/auth';

const DISCOUNTED = 'DISCOUNTED';
const LAST_ADDED = 'LAST_ADDED';

const SidebarRightDrawer: React.FC<ScreenNavigationProp> = () => {
  const translate = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;
  const [catdata, setCatData] = useState<IgetfilterCategoriesResponse>();
  const [category, setCategory] = useState<boolean>(false);
  const [userType, setUserType] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>();
  const [loading, setLoading] = useState<boolean>();
  const [point, setPoint] = useState<boolean>(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const authdata = useSelector<IAuthReducer>(
    state => state.AuthReducer,
  ) as IAuthState;

  const goTo = (roteName: string, props: any) => {
    subscriptionService?.sendData('close-rightdrawer', true);
    navigation.navigate(roteName, props);
  };
  const toggleCategory = () => {
    setCategory(prev => !prev);
  };
  const toggleUserType = () => {
    setUserType(prev => !prev);
  };
  const togglePoint = () => {
    setPoint(prev => !prev);
  };

  const getProducFiltertList = () => {
    ProductFiltersService.GenerateFilter().subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          setLoading(false);
          setCatData(Response.data);
        }
      },
      error: err => {
        console.log(err.response);
      },
    });
  };
  useEffect(() => {
    if (authdata.token?.length) {
      getProducFiltertList();
    }
  }, [authdata.token]);

  let activePrize = true;

  const SearchProduct = () => {
    let data: ISearchDetailsRequest = {
      input_text: searchValue,
      page_index: '1',
      row_count: '10',
      prizes: true,
      organisations: false,
    };

    dispatch(get_organizations(data));
    goTo(authRoutes.searchResults, {activePrize: activePrize});
  };

  const cancelSearch = () => {
    setSearchValue('');
  };

  const getPriceList = (type: any) => {
    let filter = {};
    if (type === 'DISCOUNTED') {
      filter = {discount: true};
    }
    if (type === 'LAST_ADDED') {
      filter = {...filter, latest_prod: true};
    }
    if (type.cat_id !== '') {
      filter = {...filter, category_id: type.cat_id};
    }
    if (type.custValue !== '') {
      filter = {...filter, customer_type_id: type.custValue};
    }
    if (type.priceValue !== '') {
      filter = {...filter, price_range_id: type.priceValue};
    }
    goTo(authRoutes.spendOptions2, {
      filter,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.main}>
        <Text style={styles.mainText}>{translate.t('filters.catalogue')}</Text>
      </View>
      <View style={styles.searchView}>
        <View style={styles.inputWrapper}>
          <TouchableOpacity onPress={SearchProduct}>
            <Image
              style={styles.searchImg}
              source={require('../assets/img/search.png')}
            />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            value={searchValue}
            onChangeText={v => setSearchValue(v)}
            placeholder={translate.t('home.whatShouldSpend')}
            placeholderTextColor={Colors.switchGrey}
          />
        </View>
        <TouchableOpacity onPress={cancelSearch}>
          <Text style={styles.cancel}>{translate.t('common.cancel')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnView}>
        <CategoryButton
          onPress={() => getPriceList(DISCOUNTED)}
          title={translate.t('filters.discounts')}
        />
        <CategoryButton
          onPress={() => getPriceList(LAST_ADDED)}
          title={translate.t('filters.lastAdded')}
        />
      </View>
      <TouchableOpacity style={styles.catView} onPress={toggleCategory}>
        <Text style={styles.catText}>{translate.t('filters.categories')}</Text>
        <Image
          style={category ? styles.rotate : styles.arrow}
          source={require('../assets/img/downWhiteArrow.png')}
        />
      </TouchableOpacity>
      {!loading &&
        category &&
        catdata?.categories &&
        catdata.categories.map(cat => (
          <View key={cat.id} style={styles.catMain}>
            <CategoryButton
              onPress={() => getPriceList({cat_id: cat.id})}
              title={cat.name}
            />
          </View>
        ))}

      <TouchableOpacity style={styles.catView} onPress={toggleUserType}>
        <Text style={styles.catText}>{translate.t('filters.userType')}</Text>
        <Image
          style={!userType ? styles.arrow : styles.rotate}
          source={require('../assets/img/downWhiteArrow.png')}
        />
      </TouchableOpacity>
      {!loading &&
        userType &&
        catdata?.customer_types &&
        catdata?.customer_types.map(user => (
          <View key={user.id} style={styles.catMain}>
            <CategoryButton
              onPress={() => getPriceList({custValue: user.id})}
              title={user.name}
            />
          </View>
        ))}
      <TouchableOpacity style={styles.catView} onPress={togglePoint}>
        <Text style={styles.catText}>{translate.t('filters.byScore')}</Text>
        <Image
          style={!point ? styles.arrow : styles.rotate}
          source={require('../assets/img/downWhiteArrow.png')}
        />
      </TouchableOpacity>
      {!loading &&
        point &&
        catdata?.price_ranges &&
        catdata?.price_ranges.map(p => (
          <View key={p.id} style={styles.catMain}>
            <CategoryButton
              onPress={() => getPriceList({priceValue: p.id})}
              title={p.range_description}
            />
          </View>
        ))}
    </ScrollView>
  );
};

export default SidebarRightDrawer;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    borderBottomLeftRadius: 40,
    borderTopLeftRadius: 40,
    paddingHorizontal: 34,
    paddingBottom: 30,
    backgroundColor: Colors.bgGreen,
    alignItems: 'center',
  },
  main: {
    marginTop: 61,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 14,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
    color: Colors.white,
  },
  searchView: {
    marginTop: 46,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapper: {
    borderBottomWidth: 0.7,
    borderBottomColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 170,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: Colors.white,
    fontSize: 14,
    fontFamily: 'BPG DejaVu Sans',
    lineHeight: 16.3,
  },
  cancel: {
    marginLeft: 7,
    fontSize: 14,
    fontFamily: 'BPG DejaVu Sans',
    lineHeight: 16.3,
    color: Colors.white,
  },
  searchImg: {
    width: 16,
    height: 15.99,
    marginBottom: 10,
  },
  btnView: {
    marginTop: 33,
    width: 265,
    height: 90,
    justifyContent: 'space-between',
  },
  btn: {
    backgroundColor: Colors.bgGreenLight,
    height: 35,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 12,
    color: Colors.white,
    lineHeight: 14.4,
    fontFamily: 'BPG DejaVu Sans Mt',
  },
  catView: {
    width: 265,
    marginTop: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 13,
  },
  catText: {
    fontSize: 12,
    color: Colors.white,
    lineHeight: 14.4,
    fontFamily: 'BPG DejaVu Sans Mt',
  },
  arrow: {
    width: 16,
    height: 8.67,
  },
  catMain: {
    width: 265,
    height: 50,
  },
  rotate: {
    transform: [{rotate: '180deg'}],
    width: 16,
    height: 8.67,
  },
});
