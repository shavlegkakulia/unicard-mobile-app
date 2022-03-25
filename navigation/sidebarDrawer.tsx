import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import { logout } from '../Store/actions/auth';
import {AuthActions} from '../Store/types/auth';
import Colors from '../theme/Colors';

const SidebarDrawer: React.FC<any> = props => {
  const dispath = useDispatch();
  const login = () => {
    dispath({
      type: AuthActions.setIsAuthentificated,
      isAuthentificated: true,
    });
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => dispath(logout())}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SidebarDrawer;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.lightOrange,
    borderBottomRightRadius: 40,
    borderTopRightRadius: 40,
  },
});
