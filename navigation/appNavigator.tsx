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
import {BackHandler} from 'react-native';
import RegistrationScreen from '../screens/notAuth/RegistrationScreen';
import RegistrationDetailsScreen from '../screens/notAuth/RegistrationDetailsScreen';
import PasswordInfo from '../screens/notAuth/PasswordInfo';
import RegistrationDone from '../screens/notAuth/RegistrationDone';

const authStack = createStackNavigator();

const DrawerContainer = gestureHandlerRootHOC(() => <AppNavigator />);

const AppNavigator = () => {
  const authReducer = useSelector<IAuthReducer>(
    state => state.AuthReducer,
  ) as IAuthState;

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
      drawerLockMode={
        authReducer.isAuthentificated ? 'unlocked' : 'locked-closed'
      }
      keyboardDismissMode="on-drag"
      onDrawerOpen={() => (isDrawerOpened.current = true)}
      onDrawerClose={() => (isDrawerOpened.current = false)}
      ref={drawer => {
        sideDraver.current = drawer;
      }}
      renderNavigationView={props => <SideBarDrawer props={props} />}>
      <authStack.Navigator initialRouteName={notAuthRoutes.login}>
        {authReducer.isAuthentificated ? (
          <>
            <authStack.Screen name={authRoutes.home} component={HomeScreen} />
          </>
        ) : (
          <>
            <authStack.Screen
              name={notAuthRoutes.login}
              component={LoginScreen}
              options={{
                title: 'მოგესალმებით',
                headerStyle: {
                  backgroundColor: '#fff',
                },
                headerTintColor: '#8AD00B',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  fontSize: 20,
                },
              }}
            />
            <authStack.Screen
              name={notAuthRoutes.registration}
              component={RegistrationScreen}
              options={{
                title: 'რეგისტრაცია',
                headerStyle: {
                  backgroundColor: '#fff',
                },
                headerTintColor: '#8AD00B',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  fontSize: 20,
                },
              }}
            />
            <authStack.Screen
              name={notAuthRoutes.registrationDetails}
              component={RegistrationDetailsScreen}
              options={{
                title: 'რეგისტრაცია',
                headerStyle: {
                  backgroundColor: '#fff',
                },
                headerTintColor: '#8AD00B',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  fontSize: 20,
                },
              }}
            />
            <authStack.Screen
              name={notAuthRoutes.passwordInfo}
              component={PasswordInfo}
              options={{
                title: 'რეგისტრაცია',
                headerStyle: {
                  backgroundColor: '#fff',
                },
                headerTintColor: '#8AD00B',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  fontSize: 20,
                },
              }}
            />
            <authStack.Screen
              name={notAuthRoutes.registrationDone}
              component={RegistrationDone}
              options={{
                title: '',
                headerStyle: {
                  backgroundColor: '#fff',
                },
                headerTintColor: '#8AD00B',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  fontSize: 20,
                },
              }}
            />
          </>
        )}
      </authStack.Navigator>
    </DrawerLayout>
  );
};

export default DrawerContainer;
