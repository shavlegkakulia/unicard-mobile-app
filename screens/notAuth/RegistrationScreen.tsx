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
import {ScreenNavigationProp} from '../../interfaces/commons';
import {notAuthRoutes} from '../../navigation/routes';

import Colors from '../../theme/Colors';

const RegistrationScreen: React.FC<ScreenNavigationProp> = props => {
  const dispatch = useDispatch();
  return (
    <>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>გაქვთ თუ არა უნიქარდის ბარათი?</Text>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={require('../../assets/img/cardGreen.png')}
          />
          <Image
            style={styles.image}
            source={require('../../assets/img/cardBlack.png')}
          />
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <AppButton
          onPress={() => {
            props.navigation.navigate(notAuthRoutes.registrationDetails);
          }}
          title={'დიახ'}
          backgroundColor={'#8AD00B'}
        />
        <View style={styles.button}>
          <AppButton
            onPress={() => {
              props.navigation.navigate(notAuthRoutes.registrationDetails);
            }}
            title={'არა'}
            backgroundColor={'#F9BD15'}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  titleWrapper: {
    alignItems: 'center',
    flex: 2,
    justifyContent: 'center',
  },
  title: {
    color: '#6B6B6B',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  imageWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '90%',
    marginTop: 48,
  },
  image: {
    width: 160.4,
    height: 103.74,
  },
  buttonWrapper: {
    flex: 1,
  },
  button: {
    marginTop: 34,
  },
});

export default RegistrationScreen;
