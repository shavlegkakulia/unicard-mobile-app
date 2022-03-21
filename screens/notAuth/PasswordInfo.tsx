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

const PasswordInfo: React.FC<ScreenNavigationProp> = () => {
  const dispatch = useDispatch();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <>
      <View style={styles.flex1}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>შეავსეთ თქვენი მონაცემები</Text>
        </View>
        <View style={styles.textInput}>
          <AppTextInput placeholder={'პაროლი'} secureTextEntry={true} />
          <AppTextInput
            placeholder={'გაიმეორეთ პაროლი'}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.checkboxWrapper}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
            tintColor="#8AD00B"
            onCheckColor="#fff"
            onFillColor="#8AD00B"
            onTintColor="#8AD00B"
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
          onPress={() => {}}
          title={'შემდეგი'}
          backgroundColor={'#8AD00B'}
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
    alignItems: 'center',
    marginTop: 48,
  },
  title: {
    color: '#6B6B6B',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
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
    textTransform: 'uppercase',
    fontSize: 14,
    marginLeft: 10,
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
