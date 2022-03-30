import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useStore} from 'react-redux';
import AppButton from '../../components/CostumComponents/AppButton';
import AppTextInput from '../../components/CostumComponents/AppTextInput';
import {ScreenNavigationProp} from '../../interfaces/commons';
import {notAuthRoutes} from '../../navigation/routes';
import AuthService, { IRegisterRequestData } from '../../services/AuthService';

import Colors from '../../theme/Colors';

const RegistrationDetailsScreen: React.FC<ScreenNavigationProp> = props => {
  const [regData, setRegData] = useState<IRegisterRequestData>();

  const dispatch = useDispatch();

  const clearState = () => {
    setRegData({email: '', name: '', birthDate: ''});
  }
  
  const register = () => {

    AuthService.SignUp(regData).subscribe({
      next: Response => {
        //Response.data.succes
      },
      complete: () => {},
      error: err => {
        console.log(err)
      }
    })
  }
  return (
    <>
      <ScrollView>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>შეავსეთ თქვენი მონაცემები</Text>
        </View>
        <View style={styles.textInput}>
          <AppTextInput
            placeholder={'სახელი'}
            icon={0}
            secureTextEntry={false}
            textContentType={'name'}
            value={regData?.name}
            onChange={e => setRegData({name: e, email: regData?.email, birthDate: regData?.birthDate})}
          />
          <AppTextInput
            placeholder={'გვარი'}
            icon={0}
            secureTextEntry={false}
            textContentType={'name'}
            value={regData?.email}
            onChange={e => setRegData({email: e, name: regData?.name, birthDate: regData?.birthDate})}
          />
          <AppTextInput
            placeholder={'პირადი ნომერი'}
            icon={0}
            secureTextEntry={false}
            textContentType={''}
          />
          <AppTextInput
            placeholder={'დაბადების თარიღი'}
            icon={0}
            secureTextEntry={false}
            textContentType={''}
          />
          <AppTextInput
            placeholder={'+995 5xx xxx xxx'}
            icon={0}
            secureTextEntry={false}
            textContentType={'telephoneNumber'}
          />
          <AppTextInput
            placeholder={'ელ-ფოსტა'}
            icon={0}
            secureTextEntry={false}
            textContentType={'emailAddress'}
          />
        </View>
        <View style={styles.button}>
          <AppButton
            onPress={() => {
              props.navigation.navigate(notAuthRoutes.passwordInfo);
            }}
            title={'შემდეგი'}
            backgroundColor={Colors.bgGreen}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  titleWrapper: {
    width: 325,
    alignItems: 'center',
    marginTop: 48,
  },
  title: {
    color: Colors.darkGrey,
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  textInput: {
    alignItems: 'center',
  },
  button: {
    top: 116,
  },
});

export default RegistrationDetailsScreen;
