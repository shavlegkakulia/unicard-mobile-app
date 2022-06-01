import React from 'react';
import {ScrollView, Text, StyleSheet, View, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import AppButton from '../../components/CostumComponents/AppButton';
import {ScreenNavigationProp} from '../../interfaces/commons';
import {notAuthRoutes} from '../../navigation/routes';
import {login} from '../../Store/actions/auth';
import Colors from '../../theme/Colors';

const LoginScreen: React.FC<ScreenNavigationProp> = props => {
  const dispatch = useDispatch();
  return (
    <ScrollView>
      <View style={styles.imgContainer}>
        <Image source={require('../../assets/img/authLogo.png')} />
      </View>

      <AppButton
        onPress={() => {props.navigation.navigate(notAuthRoutes.FBAuth)}}
        title={'facebook-ით შესვლა'}
        backgroundColor={Colors.blue}
      />

      <View style={styles.titleView}>
        <Text style={styles.or}>ან</Text>
      </View>
      <AppButton
        onPress={() => {
          props.navigation.navigate(notAuthRoutes.authScreen);
        }}
        title={'ავტორიზაცია'}
        backgroundColor={Colors.bgGreen}
      />
      <View style={styles.btnWrapper}>
        <AppButton
          onPress={() => {
            props.navigation.navigate(notAuthRoutes.registration);
           
          }}
          title={'რეგისტრაცია'}
          backgroundColor={Colors.lightOrange}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  titleView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: Colors.bgGreen,
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  or: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
    color: Colors.lightOrange,
  },
  btnWrapper: {
    paddingVertical: 60,
  },
});

export default LoginScreen;
