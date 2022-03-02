import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
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
      <TouchableOpacity onPress={login}>
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
        backgroundColor: Colors.white
    }
});
