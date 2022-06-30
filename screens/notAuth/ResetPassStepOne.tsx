import React, {useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AppButton from '../../components/CostumComponents/AppButton';
import AppTextInput from '../../components/CostumComponents/AppTextInput';
import {ScreenNavigationProp} from '../../interfaces/commons';
import {notAuthRoutes} from '../../navigation/routes';
import {IpostRessetPasswordResponse} from '../../services/ResetPasswordService';

import Colors from '../../theme/Colors';

const ResetPassStepOne: React.FC<ScreenNavigationProp> = props => {
  const [name, setName] = useState<IpostRessetPasswordResponse>();

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.main}>
      <View style={styles.titleView}>
        <Text style={styles.title}>დაგავიწყდა პაროლი?</Text>
      </View>
      <View style={styles.inputView}>
        <AppTextInput
          onChange={e => setName(e)}
          placeholder="სახელი"
          value={name?.user_name}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <AppButton
          onPress={() => {
            props.navigation.navigate(notAuthRoutes.smsCode, {
              name,
            });
          }}
          title={'შემდეგი'}
          backgroundColor={Colors.bgGreen}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  titleView: {
    alignItems: 'center',
    marginTop: 163,
  },
  title: {
    color: Colors.darkGrey,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
  },
  inputView: {
    alignItems: 'center',
  },
  buttonWrapper: {
    marginTop: 218,
  },
});

export default ResetPassStepOne;
