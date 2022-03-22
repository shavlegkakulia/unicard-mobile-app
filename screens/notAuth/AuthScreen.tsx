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

const AuthScreen: React.FC<ScreenNavigationProp> = props => {
  const dispatch = useDispatch();
  return (
    <ScrollView>
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
});

export default AuthScreen;
