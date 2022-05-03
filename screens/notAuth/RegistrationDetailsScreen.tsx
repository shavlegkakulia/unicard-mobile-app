import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import AppButton from '../../components/CostumComponents/AppButton';
import AppTextInput from '../../components/CostumComponents/AppTextInput';
import {ScreenNavigationProp} from '../../interfaces/commons';
import {notAuthRoutes} from '../../navigation/routes';
import AuthService, {IRegisterRequestData} from '../../services/AuthService';

import Colors from '../../theme/Colors';

const RegistrationDetailsScreen: React.FC<ScreenNavigationProp> = props => {
  const [regData, setRegData] = useState<IRegisterRequestData>();

  const dispatch = useDispatch();

  const nextStep = () => {
    props.navigation.navigate(notAuthRoutes.passwordInfo, {data: regData});
  }
  
  return (
    <>
      <ScrollView>
        <View style={styles.textInput}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>შეავსეთ თქვენი მონაცემები</Text>
        </View>
          <AppTextInput
            placeholder={'სახელი'}
            icon={0}
            secureTextEntry={false}
            textContentType={'name'}
            value={regData?.user_name}
            onChange={e =>
              setRegData({
                user_name: e,
                surname: regData?.surname,
                person_code: regData?.person_code,
                birthDate: regData?.birthDate,
                phone: regData?.phone,
                email: regData?.email,
              })
            }
          />
          <AppTextInput
            placeholder={'გვარი'}
            icon={0}
            secureTextEntry={false}
            textContentType={'name'}
            value={regData?.surname}
            onChange={e =>
              setRegData({
                user_name: regData?.user_name,
                surname: e,
                person_code: regData?.person_code,
                birthDate: regData?.birthDate,
                phone: regData?.phone,
                email: regData?.email,
              })
            }
          />
          <AppTextInput
            placeholder={'პირადი ნომერი'}
            icon={0}
            secureTextEntry={false}
            textContentType={''}
            value={regData?.person_code}
            onChange={e =>
              setRegData({
                user_name: regData?.user_name,
                surname: regData?.surname,
                person_code: e,
                birthDate: regData?.birthDate,
                phone: regData?.phone,
                email: regData?.email,
              })
            }
          />

          <AppTextInput
            placeholder={'დაბადების თარიღი'}
            icon={0}
            secureTextEntry={false}
            textContentType={''}
            value={regData?.birthDate}
            onChange={e =>
              setRegData({
                user_name: regData?.user_name,
                surname: regData?.surname,
                person_code: regData?.person_code,
                birthDate: e,
                phone: regData?.phone,
                email: regData?.email,
              })
            }
          />

          <AppTextInput
            placeholder={'+995 5xx xxx xxx'}
            icon={0}
            secureTextEntry={false}
            textContentType={'telephoneNumber'}
            value={regData?.phone}
            onChange={e =>
              setRegData({
                user_name: regData?.user_name,
                surname: regData?.surname,
                person_code: regData?.person_code,
                birthDate: regData?.birthDate,
                phone: e,
                email: regData?.email,
              })
            }
          />

          <AppTextInput
            placeholder={'ელ-ფოსტა'}
            icon={0}
            secureTextEntry={false}
            textContentType={'emailAddress'}
            value={regData?.email}
            onChange={e =>
              setRegData({
                user_name: regData?.user_name,
                surname: regData?.surname,
                person_code: regData?.person_code,
                birthDate: regData?.birthDate,
                phone: regData?.phone,
                email: e,
              })
            }
          />
        </View>
        <View style={styles.button}>
          <AppButton
            onPress={nextStep}
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
    // alignItems: 'center',
    marginTop: 48,
  },
  title: {
    color: Colors.darkGrey,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 19.2,
  },
  textInput: {
    alignItems: 'center',
  },
  button: {
    top: 116,
  },
});

export default RegistrationDetailsScreen;
