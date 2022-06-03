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

const SidebarRightDrawer: React.FC<ScreenNavigationProp> = () => {
  const [catdata, setCatData] = useState<IgetfilterCategoriesResponse>();
  const [category, setCategory] = useState<boolean>(false);
  const [userType, setUserType] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>();
  const [point, setPoint] = useState<boolean>(false);
  const navigation = useNavigation();
  console.log('category', catdata?.customer_types);

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
    getProducFiltertList();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.main}>
        <Text style={styles.mainText}>კატალოგი</Text>
      </View>
      <View style={styles.searchView}>
        <View style={styles.inputWrapper}>
          <Image
            style={styles.searchImg}
            source={require('../assets/img/search.png')}
          />
          <TextInput style={styles.input} />
        </View>
        <TouchableOpacity>
          <Text style={styles.cancel}>გაუქმება</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnView}>
        <CategoryButton onPress={() => {}} title={'ფასდაკლებულები'} />
        <CategoryButton onPress={() => {}} title={'ბოლოს დამატებულები'} />
      </View>
      <TouchableOpacity style={styles.catView} onPress={toggleCategory}>
        <Text style={styles.catText}>კატეგორიები</Text>
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
            <CategoryButton onPress={() => {}} title={cat.name} />
          </View>
        ))}

      <TouchableOpacity style={styles.catView} onPress={toggleUserType}>
        <Text style={styles.catText}>მომხმარებლის ტიპი</Text>
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
            <CategoryButton onPress={() => {}} title={user.name} />
          </View>
        ))}
      <TouchableOpacity style={styles.catView} onPress={togglePoint}>
        <Text style={styles.catText}>ქულების მიხედვით</Text>
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
            <CategoryButton onPress={() => {}} title={p.range_description} />
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
  },
  inputWrapper: {
    borderBottomWidth: 0.7,
    borderBottomColor: Colors.white,
    flexDirection: 'row',
  },
  input: {
    width: 170,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: Colors.white,
    fontSize: 14,
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
