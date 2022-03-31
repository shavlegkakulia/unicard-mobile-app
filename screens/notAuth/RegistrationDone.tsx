import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import AppButton from '../../components/CostumComponents/AppButton';

import {ScreenNavigationProp} from '../../interfaces/commons';
import { notAuthRoutes } from '../../navigation/routes';
import AuthService, {IRegisterRequestData} from '../../services/AuthService';

import {login} from '../../Store/actions/auth';

import Colors from '../../theme/Colors';

const RegistrationDone: React.FC<ScreenNavigationProp> = props => {
  const dispatch = useDispatch();

  const params = props.route.params;

  const register = () => {
    const {user_name, surname, person_code, birthDate, phone, email, password} =
      params.data;
    const data: IRegisterRequestData = {
      user_name,
      surname,
      person_code,
      birthDate,
      phone,
      email,
      password,
    };
    console.log(data);
    AuthService.SignUp(data).subscribe({
      next: Response => {
        //Response.data.succes
        console.log('response', Response.data);
        // dispatch(login())
        props.navigation.navigate(notAuthRoutes.authScreen)
      
      },
      complete: () => {},
      error: err => {
        console.log('>>>', err);
      },
    });
  };
  return (
    <>
      <View style={styles.main}>
        <View style={styles.raund}>
          <Image source={require('../../assets/img/doneIcon.png')} />
        </View>
        <View style={styles.imageView}>
          <Image
            style={styles.img}
            source={require('../../assets/img/doneImg.png')}
          />
        </View>
        <View style={styles.textView}>
          <Text style={styles.text}>რეგისტრაცია დასრულებულია</Text>
        </View>
      </View>
      <View style={styles.buttonView}>
        <AppButton
          // onPress={() => dispatch(login())}
          onPress={register}
          title={'დახურვა'}
          backgroundColor={Colors.lightOrange}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  raund: {
    width: 64,
    height: 64,
    backgroundColor: Colors.bgGreen,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView: {
    marginTop: 17,
    marginLeft: 45,
  },
  textView: {
    width: 182,
    marginTop: 32.78,
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: Colors.bgGreen,
    textAlign: 'center',
  },
  buttonView: {
    flex: 1,
  },
  img: {
    width: 162.19,
    height: 289.22,
  },
});

export default RegistrationDone;
