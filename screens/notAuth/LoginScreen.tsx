import React from 'react';
import {
  ScrollView,
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
        onPress={() => {}}
        title={'facebook-ით შესვლა'}
        backgroundColor={'#0073F6'}
      />

      <View style={styles.titleView}>
        <Text style={styles.or}>ან</Text>
      </View>
      <AppButton
        onPress={() => {
          props.navigation.navigate(notAuthRoutes.registration);
        }}
        title={'რეგისტრაცია'}
        backgroundColor={'#8AD00B'}
      />
      <View style={styles.btnWrapper}>
        <AppButton
          onPress={() => {}}
          title={'ავტორიზაცია'}
          backgroundColor={'#F9BD15'}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="name"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="email"
        keyboardType="numeric"
      />

      <TouchableOpacity
        onPress={() => dispatch(login())}
        style={{padding: 10, backgroundColor: Colors.red}}>
        <Text>login</Text>
      </TouchableOpacity>
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
    color: '#8AD00B',
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  or: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#FFAF00',
  },
  btnWrapper: {
    paddingVertical: 60,
  },
});

export default LoginScreen;
