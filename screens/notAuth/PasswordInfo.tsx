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
import AuthService, {IRegisterRequestData} from '../../services/AuthService';

const PasswordInfo: React.FC<ScreenNavigationProp> = props => {
  const dispatch = useDispatch();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [passData, setPassData] = useState<IRegisterRequestData>();

  const params = props.route.params;


  const OtpAuth = () => {
    AuthService.SendOtp({phone: params.data.phone}).subscribe({
      next: Response => {
        props.navigation.navigate(notAuthRoutes.smsCode, {
          data: {...params.data, ...passData},
        });
      },
      complete: () => {},
      error: err => {
        console.log(err);
      },
    });
  };

  return (
    <>
      <View style={styles.flex1}>
        
        <View style={styles.textInput}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>შეავსეთ თქვენი მონაცემები</Text>
        </View>
          <AppTextInput
            placeholder={'პაროლი'}
            secureTextEntry={true}
            value={passData?.password}
            onChange={e => {
              setPassData({
                password: e,
                confirm_password: passData?.confirm_password,
              });
            }}
          />
          <AppTextInput
            placeholder={'გაიმეორეთ პაროლი'}
            secureTextEntry={true}
            value={passData?.confirm_password}
            onChange={e => {
              setPassData({
                password: passData?.password,
                confirm_password: e,
              });
            }}
          />
        </View>
        <View style={styles.checkboxWrapper}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
            tintColor={Colors.bgGreen}
            onCheckColor={Colors.white}
            onFillColor={Colors.bgGreen}
            onTintColor={Colors.bgGreen}
            offAnimationType="stroke"
            style={styles.checkbox}
          />
          <TouchableOpacity>
            <Text style={styles.text}>
              ვეთანხმები <Text style={styles.subText}>წესებს და პირობებს</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <AppButton
          // onPress={() => {
          //   // props.navigation.navigate(notAuthRoutes.smsCode, passData);
          // }}
          onPress={OtpAuth}
          title={'შემდეგი'}
          backgroundColor={Colors.bgGreen}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 5,
  },
  titleWrapper: {
    width: 325,
    marginTop: 48,
  },
  title: {
    color: '#6B6B6B',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
  },
  textInput: {
    alignItems: 'center',
  },
  checkboxWrapper: {
    width: 340,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 48,
  },
  text: {
    color: '#8AD00B',
    fontSize: 14,
    marginLeft: 10,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
  },
  subText: {
    textDecorationLine: 'underline',
    fontWeight: '700',
  },
  checkbox: {
    width: 16,
    height: 16,
  },
  buttonWrapper: {
    flex: 1,
  },
});

export default PasswordInfo;
