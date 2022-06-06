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
import AuthService, { IRegisterRequestData } from '../../services/AuthService';

const SmsCode: React.FC<ScreenNavigationProp> = props => {
  const dispatch = useDispatch();

  const params = props.route.params;
console.log(props.route.params)
  const register = () => {
    const {user_name, surname, person_code, birthDate, phone, email, password, fb_token, new_card_registration} =
      params.data;
    const data: IRegisterRequestData = {
      user_name,
      surname,
      person_code,
      birthDate,
      phone,
      email,
      password,
      fb_token,
      new_card_registration
    };
    AuthService.SignUp(data).subscribe({
      next: Response => {
        if(Response.data.succes) {
          props.navigation.navigate(
            notAuthRoutes.registrationDone,
            props.route.params,
          );
        }
      },
      complete: () => {},
      error: err => {
        console.log('>>>', err);
      },
    });
  };

  return (
    <View style={styles.main}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>შეიყვანეთ SMS კოდი</Text>
      </View>
      <View style={styles.sendTextView}>
        <Text style={styles.sendText}>
          ავტორიზაციისთვის საჭირო SMS კოდი გამოგზავნილია
        </Text>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.text}>SMS კოდი</Text>

        <TextInput style={styles.input} keyboardType="numeric" />
        <TouchableOpacity>
          <Text style={styles.text}>თავიდან</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <AppButton
          onPress={register}
          title={'შემდეგი'}
          backgroundColor={Colors.bgGreen}
        />
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
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 24,
  },
  sendTextView: {
    marginTop: 35,
  },
  sendText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.darkGrey,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
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
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
  },
  button: {
    top: 150,
  },
});

export default SmsCode;
