import React, {useEffect, useRef} from 'react';
import {
  DrawerLayout,
  gestureHandlerRootHOC,
} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import SideBarDrawer from './sidebarDrawer';
import {authRoutes, notAuthRoutes} from './routes';
import HomeScreen from '../screens/auth/HomeScreen';
import {useSelector} from 'react-redux';
import {IAuthReducer, IAuthState} from '../Store/types/auth';
import LoginScreen from '../screens/notAuth/LoginScreen';
import {
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SidebarRightDrawer from './sidebarRightDrawer';
import Colors from '../theme/Colors';
import navigation from './navigation';

const authStack = createStackNavigator();

const DrawerRight: React.FC = props => {
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isDrawerOpened.current) {
        sideDraver.current?.closeDrawer();
        return true;
      } else {
        return false;
      }
    });

    return () => sub.remove();
  }, []);

  const sideDraver = useRef<DrawerLayout | null>();
  const isDrawerOpened = useRef<boolean>();

  return (
    <DrawerLayout
      drawerWidth={300}
      drawerPosition="right"
      drawerLockMode={'unlocked'}
      keyboardDismissMode="on-drag"
      drawerBackgroundColor={Colors.bgGreen}
      onDrawerOpen={() => (isDrawerOpened.current = true)}
      onDrawerClose={() => (isDrawerOpened.current = false)}
      ref={drawer => {
        sideDraver.current = drawer;
        isDrawerOpened.current
          ? sideDraver.current?.closeDrawer()
          : sideDraver.current?.openDrawer();
      }}
      renderNavigationView={() => <SidebarRightDrawer props={props} />}
    />
  );
};

export default DrawerRight;
