import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import AppButton from '../../components/CostumComponents/AppButton';
import AppTextInput from '../../components/CostumComponents/AppTextInput';
import {ScreenNavigationProp} from '../../interfaces/commons';
import {notAuthRoutes} from '../../navigation/routes';

import Colors from '../../theme/Colors';

const SmsCode: React.FC<ScreenNavigationProp> = props => {
  const dispatch = useDispatch();

  console.log(props.route.params);
  return (
    <View style={styles.main}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>შეიყვანეთ სმს კოდი</Text>
      </View>
      <View style={styles.sendTextView}>
        <Text style={styles.sendText}>
          ავტორიზაციისთვის საჭირო სმს კოდი გამოგზავნილია
        </Text>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.text}>სმს კოდი</Text>

        <TextInput style={styles.input} keyboardType="numeric" />
        <TouchableOpacity>
          <Text style={styles.text}>თავიდან</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <AppButton
          onPress={() => {
            props.navigation.navigate(
              notAuthRoutes.registrationDone,
              props.route.params,
            );
          }}
          title={'შემდეგი'}
          backgroundColor={Colors.bgGreen}
        />
        {console.log(props.route.params)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginHorizontal: 43,
  },
  titleWrapper: {
    marginTop: 48,
  },
  title: {
    color: '#6B6B6B',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  sendTextView: {
    marginTop: 35,
  },
  sendText: {
    fontSize: 14,
    fontWeight: '400',
    textTransform: 'uppercase',
    color: Colors.darkGrey,
  },
  inputView: {
    marginTop: 35,
    borderBottomWidth: 1,
    borderBottomColor: Colors.bgGreen,
    paddingHorizontal: 8,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: 50,
  },
  text: {
    color: Colors.bgGreen,
    textTransform: 'uppercase',
  },
  button: {
    top: 150,
  },
});

export default SmsCode;
