import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';
import AppButton from '../../components/CostumComponents/AppButton';
import AppTextInput from '../../components/CostumComponents/AppTextInput';
import {ScreenNavigationProp} from '../../interfaces/commons';
import {notAuthRoutes} from '../../navigation/routes';
import {login} from '../../Store/actions/auth';
import Colors from '../../theme/Colors';

const AuthScreen: React.FC<ScreenNavigationProp> = props => {
  const dispatch = useDispatch();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <ScrollView>
      <View style={styles.titleView}>
        <Text style={styles.title}>ავტორიზაცია</Text>
      </View>
      <View style={styles.imgView}>
        <Image
          style={styles.img}
          source={require('../../assets/img/authScreenLogo.png')}
        />
      </View>
      <View style={styles.inputView}>
        <AppTextInput placeholder="ელ-ფოსტა" />
        <AppTextInput placeholder="პაროლი" secureTextEntry={true} />
        <View style={styles.checkBoxView}>
          <View style={styles.row}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
              style={styles.checkBox}
              onCheckColor={Colors.bgGreen}
              onTintColor={Colors.bgGreen}
            />
            <Text style={styles.text}>დამახსოვრება</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.text}>დაგავიწყდა პაროლი?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.button}>
        <AppButton
          onPress={() => dispatch(login())}
          title={'შემდეგი'}
          backgroundColor={Colors.bgGreen}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  titleView: {
    alignItems: 'center',
    marginTop: 16,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: Colors.darkGrey,
  },
  imgView: {
    alignItems: 'center',
    marginTop: 33,
  },
  img: {
    width: 220,
    height: 306.78,
  },
  inputView: {
    alignItems: 'center',
  },
  checkBoxView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 325,
    marginTop: 32,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: '400',
    textTransform: 'uppercase',
    color: Colors.darkGrey,
  },
  button: {
    marginTop: 95,
  },
});

export default AuthScreen;
