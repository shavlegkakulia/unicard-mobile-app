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
import AppTextInput, {
  requireTypes,
} from '../../components/CostumComponents/AppTextInput';
import {ScreenNavigationProp} from '../../interfaces/commons';
import {notAuthRoutes} from '../../navigation/routes';
import AuthService, {IRegisterRequestData} from '../../services/AuthService';

import {inputErrors} from './../../components/CostumComponents/AppTextInput';

import Colors from '../../theme/Colors';

const RegistrationDetailsScreen: React.FC<ScreenNavigationProp> = props => {
  const [regData, setRegData] = useState<IRegisterRequestData>();
  const [chekCount, setChekCount] = useState<number>(0);
  const dispatch = useDispatch();

  const nextStep = () => {
    setChekCount(t => ++t);
    if (inputErrors.length > 0) {
      return;
    }

    props.navigation.navigate(notAuthRoutes.passwordInfo, {data: regData});
  };

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
            requireType={requireTypes.require}
            name="name"
            chekCount={chekCount}
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
            chekCount={chekCount}
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
            requireType={requireTypes.min}
            minValue={6}
            name="personalnumber"
            chekCount={chekCount}
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
            requireType={requireTypes.minLength}
            minLength={4}
            chekCount={chekCount}
            name="birthdate"
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
            requireType={requireTypes.maxLength}
            maxLength={18}
            chekCount={chekCount}
            name="telephoneNumber"
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
            requireType={requireTypes.email}
            name="email"
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
    marginTop: 116,
  },
});

export default RegistrationDetailsScreen;
