import React from 'react';
import {
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';
import AppButton from '../../components/CostumComponents/AppButton';
import SmsCode from '../../components/SmsCode';
import {ScreenNavigationProp} from '../../interfaces/commons';
import {notAuthRoutes} from '../../navigation/routes';

import Colors from '../../theme/Colors';

const RegistrationDone: React.FC<ScreenNavigationProp> = props => {
  const dispatch = useDispatch();
  return (
    <>
      <View style={styles.main}>
        <View style={styles.raund}>
          <Image source={require('../../assets/img/doneIcon.png')} />
        </View>
        <View style={styles.imageView}>
          <Image source={require('../../assets/img/doneImg.png')} />
        </View>
        <View style={styles.textView}>
          <Text style={styles.text}>რეგისტრაცია დასრულებულია</Text>
        </View>
      </View>
      <View style={styles.buttonView}>
        <AppButton
          onPress={() => {}}
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
    backgroundColor: Colors.primary,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView: {
    marginTop: 43,
  },
  textView: {
    width: 182,
    marginTop: 64,
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: Colors.primary,
    textAlign: 'center',
  },
  buttonView: {
    flex: 1,
  }
});

export default RegistrationDone;
