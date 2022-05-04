import React, {useEffect, useRef} from 'react';
import {DrawerLayout} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {IAuthReducer, IAuthState} from '../Store/types/auth';
import {BackHandler} from 'react-native';
import SidebarRightDrawer from './sidebarRightDrawer';
import Colors from '../theme/Colors';
import {subscriptionService} from '../services/SubscribeService';

const authStack = createStackNavigator();

const DrawerRight: React.FC = props => {
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

  useEffect(() => {
    if (!authReducer.isAuthentificated) {
      sideDraver.current?.closeDrawer();
    }
  }, [authReducer.isAuthentificated]);

  const sideDraver = useRef<DrawerLayout | null>();
  const isDrawerOpened = useRef<boolean>();

  useEffect(() => {
    const subscription = subscriptionService?.getData()?.subscribe(data => {
      if (data?.key === 'open-RightDrawer') {
        if (isDrawerOpened.current) {
          sideDraver.current?.closeDrawer();
        } else {
          sideDraver.current?.openDrawer();
        }
      }
    });

    return () => {
      subscriptionService?.clearData();
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <DrawerLayout
      drawerWidth={300}
      drawerPosition="right"
      drawerLockMode={
        authReducer.isAuthentificated ? 'unlocked' : 'locked-closed'
      }
      keyboardDismissMode="on-drag"
      onDrawerOpen={() => (isDrawerOpened.current = true)}
      onDrawerClose={() => (isDrawerOpened.current = false)}
      ref={drawer => {
        sideDraver.current = drawer;
        // isDrawerOpened.current
        //   ? sideDraver.current?.closeDrawer()
        //   : sideDraver.current?.openDrawer();
      }}
      renderNavigationView={() => <SidebarRightDrawer props={props} />}>
      {props.children}
    </DrawerLayout>
  );
};

export default DrawerRight;
