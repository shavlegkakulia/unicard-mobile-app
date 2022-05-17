import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import AppButton from '../../components/CostumComponents/AppButton';
import AppTextInput from '../../components/CostumComponents/AppTextInput';
import {ScreenNavigationProp} from '../../interfaces/commons';
import {authRoutes} from '../../navigation/routes';
import AuthService, {
  IChangePasswordRequestData,
} from '../../services/AuthService';
import Colors from '../../theme/Colors';

const ChangePassword: React.FC<ScreenNavigationProp> = props => {
  const [password, setPassword] = useState<IChangePasswordRequestData>();

  const changePassword = () => {
    const data: IChangePasswordRequestData = {
      password: '',
    };

    AuthService.ChangePassword(data).subscribe({
      next: Response => {
        props.navigation.navigate(authRoutes.barcode);
      },
      complete: () => {},
      error: err => {
        console.log('>>>', err);
      },
    });
  };
  return (
    <>
      <View style={styles.inputView}>
        <AppTextInput
          placeholder={'ძველი პაროლი'}
          secureTextEntry={true}
          value={password?.password}
          onChange={e => {
            setPassword({
              password: e,
              new_password: password?.new_password,
              confirm_password: password?.confirm_password,
            });
          }}
        />
        <AppTextInput
          placeholder={'ახალი პაროლი'}
          secureTextEntry={true}
          value={password?.new_password}
          onChange={e => {
            setPassword({
              password: password?.password,
              new_password: e,
              confirm_password: password?.confirm_password,
            });
          }}
        />
        <AppTextInput
          placeholder={'გაიმეორეთ პაროლი'}
          secureTextEntry={true}
          value={password?.confirm_password}
          onChange={e => {
            setPassword({
              password: password?.password,
              new_password: password?.new_password,
              confirm_password: e,
            });
          }}
        />
      </View>
      <View style={styles.btn}>
        <AppButton
          //   onPress={changePassword}
          onPress={() =>
            props.navigation.navigate(authRoutes.PasswordChangingMessage)
          }
          title={'შეცვლა'}
          backgroundColor={Colors.bgGreen}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  inputView: {
    flex: 3,
    alignItems: 'center',
    marginTop: 20,
  },
  btn: {
    flex: 1,
  },
});

export default ChangePassword;
