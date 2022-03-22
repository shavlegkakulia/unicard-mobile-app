import React from 'react';
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

import Colors from '../../theme/Colors';

const RegistrationDetailsScreen: React.FC<ScreenNavigationProp> = props => {
  const dispatch = useDispatch();
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
          />
          <AppTextInput
            placeholder={'გვარი'}
            icon={0}
            secureTextEntry={false}
            textContentType={'name'}
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
