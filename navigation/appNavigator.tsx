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
import {BackHandler, Image, Text, TouchableOpacity, View} from 'react-native';
import RegistrationScreen from '../screens/notAuth/RegistrationScreen';
import RegistrationDetailsScreen from '../screens/notAuth/RegistrationDetailsScreen';
import PasswordInfo from '../screens/notAuth/PasswordInfo';
import RegistrationDone from '../screens/notAuth/RegistrationDone';
import AuthScreen from '../screens/notAuth/AuthScreen';
import Colors from '../theme/Colors';
import SmsCode from '../screens/notAuth/SmsCode';
import Barcode from '../screens/auth/Barcode';
import {useNavigation} from '@react-navigation/native';
import MyPage from '../screens/auth/MyPage';
import SingleOfferScreen from '../screens/auth/SingleOfferScreen';
import SpendOptions from '../screens/auth/SpendOptions';
import AboutUs from '../screens/auth/AboutUs';
import News from '../screens/auth/News';
import Parameters from '../screens/auth/Parameters';
import ChangePassword from '../screens/auth/ChangePassword';
import DrawerRight from './DrawerRight';
import GetGift from '../screens/auth/getGift';
import OrderIsDone from '../screens/auth/OrderIsDone';
import PasswordChangingMessage from '../screens/auth/PasswordChangingMessage';
import PasswordChangingError from '../screens/auth/PasswordChangingError';
import PassCode from '../components/CostumComponents/PassCode';
import AuthPage from '../components/CostumComponents/AuthPage';
import SingleNewsScreen from '../screens/auth/SingleNewsScreen';
import Partners from '../screens/auth/Partners';
import SinglePartners from '../screens/auth/SinglePartners';
import MerchantsMap from '../screens/auth/merchants/MerchantsMap';
// import SearchScreen from '../screens/auth/SearchScreen';
import {subscriptionService} from '../services/SubscribeService';
import SingleMerchantsScreen from '../screens/auth/merchants/SingleMerchantsScreen';
import AllMerchants from '../screens/auth/merchants/AllMerchants';
import {ITranslateReducer, ITranslateState} from '../Store/types/translate';
import MyCardInfo from '../screens/notAuth/MyCardInfo';
import Organizations from '../screens/auth/organizations';

const authStack = createStackNavigator();

const DrawerContainer = gestureHandlerRootHOC(() => <AppNavigator />);

const AppNavigator = () => {
  const translate = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;
  const navigation = useNavigation();
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
      if (data?.key === 'close-leftdrawer') {
        sideDraver.current?.closeDrawer();
      }
    });

    return () => {
      subscriptionService?.clearData();
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <>
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
          // isDrawerOpened.current
          //   ? sideDraver.current?.closeDrawer()
          //   : sideDraver.current?.openDrawer();
        }}
        renderNavigationView={props => <SideBarDrawer props={props} />}>
        <DrawerRight>
          <authStack.Navigator initialRouteName={notAuthRoutes.login}>
            {authReducer.isAuthentificated ? (
              <>
                {/* <StatusBar barStyle={'light-content'} /> */}
                <authStack.Screen
                  name={authRoutes.home}
                  component={HomeScreen}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    title: translate.t('screens.homePage'),
                    headerLeft: () => (
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity
                          onPress={() => {
                            isDrawerOpened.current
                              ? sideDraver.current?.closeDrawer()
                              : sideDraver.current?.openDrawer();
                          }}>
                          <Image
                            style={{width: 25, height: 17, marginLeft: 29}}
                            source={require('../assets/img/burgerIcon.png')}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: 50, marginLeft: 15}}>
                          <Text>ENG</Text>
                        </TouchableOpacity>
                      </View>
                    ),
                    headerRight: () => (
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 4,
                          marginRight: 23,
                        }}>
                        <TouchableOpacity>
                          <Image
                            style={{width: 18, height: 25, marginRight: 15}}
                            resizeMode={'contain'}
                            source={require('../assets/img/locationLogo.png')}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <Image
                            style={{width: 19, height: 25}}
                            resizeMode={'contain'}
                            source={require('../assets/img/notificationLogo.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    ),
                    headerTintColor: Colors.black,
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerTitleStyle: {
                      fontWeight: '400',
                      textTransform: 'uppercase',
                      fontSize: 14,
                    },
                  }}
                />
                <authStack.Screen
                  name={authRoutes.myPage}
                  component={MyPage}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    title: translate.t('screens.myPages'),
                    headerLeft: () => (
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity
                          onPress={() => {
                            isDrawerOpened.current
                              ? sideDraver.current?.closeDrawer()
                              : sideDraver.current?.openDrawer();
                          }}>
                          <Image
                            style={{width: 25, height: 17, marginLeft: 29}}
                            source={require('../assets/img/burgerIcon.png')}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: 50, marginLeft: 15}}>
                          <Text>ENG</Text>
                        </TouchableOpacity>
                      </View>
                    ),
                    headerTintColor: Colors.black,
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerTitleStyle: {
                      fontWeight: '400',
                      textTransform: 'uppercase',
                      fontSize: 14,
                    },
                  }}
                />
                <authStack.Screen
                  name={authRoutes.barcode}
                  component={Barcode}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    title: '',
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerTintColor: Colors.bgGreen,
                  }}
                />
                <authStack.Screen
                  name={authRoutes.spendOptions}
                  component={SpendOptions}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    title: translate.t('home.whatShouldSpend'),
                    headerLeft: () => (
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity
                          onPress={() => {
                            isDrawerOpened.current
                              ? sideDraver.current?.closeDrawer()
                              : sideDraver.current?.openDrawer();
                          }}>
                          <Image
                            style={{width: 25, height: 17, marginLeft: 29}}
                            source={require('../assets/img/burgerIcon.png')}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: 50, marginLeft: 15}}>
                          <Text>ENG</Text>
                        </TouchableOpacity>
                      </View>
                    ),
                    headerRight: () => (
                      <TouchableOpacity
                        onPress={() => {
                          subscriptionService?.sendData(
                            'open-RightDrawer',
                            true,
                          );
                        }}>
                        <Image
                          style={{width: 22, height: 21, marginRight: 29}}
                          source={require('../assets/img/cartIconsec.png')}
                        />
                      </TouchableOpacity>
                    ),
                    headerTintColor: Colors.black,
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerTitleStyle: {
                      fontWeight: '400',
                      textTransform: 'uppercase',
                      fontSize: 14,
                    },
                  }}
                />
                <authStack.Screen
                  name={authRoutes.spendOptions2}
                  component={SpendOptions}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    title: translate.t('home.whatShouldSpend'),
                    headerLeft: () => (
                      <TouchableOpacity
                        onPress={() => {
                          isDrawerOpened.current
                            ? sideDraver.current?.closeDrawer()
                            : sideDraver.current?.openDrawer();
                        }}>
                        <Image
                          style={{width: 25, height: 17, marginLeft: 29}}
                          source={require('../assets/img/burgerIcon.png')}
                        />
                      </TouchableOpacity>
                    ),
                    headerRight: () => (
                      <TouchableOpacity
                        onPress={() => {
                          subscriptionService?.sendData(
                            'open-RightDrawer',
                            true,
                          );
                        }}>
                        <Image
                          style={{width: 22, height: 21, marginRight: 29}}
                          source={require('../assets/img/cartIconsec.png')}
                        />
                      </TouchableOpacity>
                    ),
                    headerTintColor: Colors.black,
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerTitleStyle: {
                      fontWeight: '400',
                      textTransform: 'uppercase',
                      fontSize: 14,
                    },
                  }}
                />
                <authStack.Screen
                  name={authRoutes.spendOptions3}
                  component={SpendOptions}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    title: translate.t('home.whatShouldSpend'),
                    headerLeft: () => (
                      <TouchableOpacity
                        onPress={() => {
                          isDrawerOpened.current
                            ? sideDraver.current?.closeDrawer()
                            : sideDraver.current?.openDrawer();
                        }}>
                        <Image
                          style={{width: 25, height: 17, marginLeft: 29}}
                          source={require('../assets/img/burgerIcon.png')}
                        />
                      </TouchableOpacity>
                    ),
                    headerRight: () => (
                      <TouchableOpacity
                        onPress={() => {
                          subscriptionService?.sendData(
                            'open-RightDrawer',
                            true,
                          );
                        }}>
                        <Image
                          style={{width: 22, height: 21, marginRight: 29}}
                          source={require('../assets/img/cartIconsec.png')}
                        />
                      </TouchableOpacity>
                    ),
                    headerTintColor: Colors.black,
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerTitleStyle: {
                      fontWeight: '400',
                      textTransform: 'uppercase',
                      fontSize: 14,
                    },
                  }}
                />
                <authStack.Screen
                  name={authRoutes.singleOffer}
                  component={SingleOfferScreen}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    title: translate.t('home.whatShouldSpend'),

                    headerTintColor: Colors.black,
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },

                    headerTitleStyle: {
                      fontWeight: '400',
                      textTransform: 'uppercase',
                      fontSize: 14,
                    },
                  }}
                />
                <authStack.Screen
                  name={authRoutes.aroundUs}
                  component={MerchantsMap}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    title: translate.t('screens.aroundMe'),

                    headerTintColor: Colors.black,
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerLeft: () => (
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity
                          onPress={() => {
                            isDrawerOpened.current
                              ? sideDraver.current?.closeDrawer()
                              : sideDraver.current?.openDrawer();
                          }}>
                          <Image
                            style={{width: 25, height: 17, marginLeft: 29}}
                            source={require('../assets/img/burgerIcon.png')}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: 50, marginLeft: 15}}>
                          <Text>ENG</Text>
                        </TouchableOpacity>
                      </View>
                    ),
                    headerRight: () => (
                      <TouchableOpacity
                        onPress={() => {
                          // isDrawerOpened.current
                          //   ? sideDraver.current?.closeDrawer()
                          //   : sideDraver.current?.openDrawer();
                        }}>
                        <Image
                          style={{width: 25, marginRight: 29}}
                          source={require('../assets/img/icon-search.png')}
                        />
                      </TouchableOpacity>
                    ),
                    headerTitleStyle: {
                      fontWeight: '400',
                      textTransform: 'uppercase',
                      fontSize: 14,
                    },
                  }}
                />
                <authStack.Screen
                  name={authRoutes.singleMerchants}
                  component={SingleMerchantsScreen}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    title: translate.t('screens.aroundMe'),
                    headerBackTitle: '',
                    headerTintColor: Colors.black,
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerRight: () => (
                      <TouchableOpacity
                        onPress={() => {
                          // isDrawerOpened.current
                          //   ? sideDraver.current?.closeDrawer()
                          //   : sideDraver.current?.openDrawer();
                        }}>
                        <Image
                          style={{width: 25, marginRight: 29}}
                          source={require('../assets/img/icon-search.png')}
                        />
                      </TouchableOpacity>
                    ),
                    headerTitleStyle: {
                      fontWeight: '400',
                      textTransform: 'uppercase',
                      fontSize: 14,
                    },
                  }}
                />
                <authStack.Screen
                  name={authRoutes.allMerchants}
                  component={AllMerchants}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    title: translate.t('screens.aroundMe'),

                    headerTintColor: Colors.black,
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerLeft: () => (
                      <TouchableOpacity
                        onPress={() => {
                          isDrawerOpened.current
                            ? sideDraver.current?.closeDrawer()
                            : sideDraver.current?.openDrawer();
                        }}>
                        <Image
                          style={{width: 25, height: 17, marginLeft: 29}}
                          source={require('../assets/img/burgerIcon.png')}
                        />
                      </TouchableOpacity>
                    ),
                    headerRight: () => (
                      <TouchableOpacity
                        onPress={() => {
                          // isDrawerOpened.current
                          //   ? sideDraver.current?.closeDrawer()
                          //   : sideDraver.current?.openDrawer();
                        }}>
                        <Image
                          style={{width: 25, marginRight: 29}}
                          source={require('../assets/img/icon-search.png')}
                        />
                      </TouchableOpacity>
                    ),
                    headerTitleStyle: {
                      fontWeight: '400',
                      textTransform: 'uppercase',
                      fontSize: 14,
                    },
                  }}
                />
                <authStack.Screen
                  name={authRoutes.getGift}
                  component={GetGift}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    title: translate.t('news.getGift'),
                    headerRight: () => (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginRight: 41,
                        }}>
                        <View
                          style={{
                            width: 4,
                            height: 4,
                            backgroundColor: Colors.lightOrange,
                            marginLeft: 6,
                            borderRadius: 50,
                          }}
                        />
                        <View
                          style={{
                            width: 4,
                            height: 4,
                            backgroundColor: Colors.lightGrey,
                            marginLeft: 6,
                            borderRadius: 50,
                          }}
                        />
                      </View>
                    ),
                    headerTintColor: Colors.black,
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },

                    headerTitleStyle: {
                      fontWeight: '400',
                      textTransform: 'uppercase',
                      fontSize: 14,
                    },
                  }}
                />
                <authStack.Screen
                  name={authRoutes.orderDone}
                  component={OrderIsDone}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    title: translate.t('news.getGift'),
                    headerRight: () => (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginRight: 41,
                        }}>
                        <View
                          style={{
                            width: 4,
                            height: 4,
                            backgroundColor: Colors.lightGrey,
                            marginLeft: 6,
                            borderRadius: 50,
                          }}
                        />
                        <View
                          style={{
                            width: 4,
                            height: 4,
                            backgroundColor: Colors.lightOrange,
                            marginLeft: 6,
                            borderRadius: 50,
                          }}
                        />
                      </View>
                    ),
                    headerTintColor: Colors.black,
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },

                    headerTitleStyle: {
                      fontWeight: '400',
                      textTransform: 'uppercase',
                      fontSize: 14,
                    },
                  }}
                />
                <authStack.Screen
                  name={authRoutes.news}
                  component={News}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    title: translate.t('screens.news'),
                    headerLeft: () => (
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity
                          onPress={() => {
                            isDrawerOpened.current
                              ? sideDraver.current?.closeDrawer()
                              : sideDraver.current?.openDrawer();
                          }}>
                          <Image
                            style={{width: 25, height: 17, marginLeft: 29}}
                            source={require('../assets/img/burgerIcon.png')}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: 50, marginLeft: 15}}>
                          <Text>ENG</Text>
                        </TouchableOpacity>
                      </View>
                    ),
                    headerTintColor: Colors.black,
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerTitleStyle: {
                      fontWeight: '400',
                      textTransform: 'uppercase',
                      fontSize: 14,
                    },
                  }}
                />
                <authStack.Screen
                  name={authRoutes.singleNewsScreen}
                  component={SingleNewsScreen}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerBackTitle: '',
                    title: translate.t('screens.news'),
                    headerTintColor: Colors.black,
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                  }}
                />
                <authStack.Screen
                  name={authRoutes.aboutUs}
                  component={AboutUs}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    title: translate.t('screens.aboutUs'),
                    headerLeft: () => (
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity
                          onPress={() => {
                            isDrawerOpened.current
                              ? sideDraver.current?.closeDrawer()
                              : sideDraver.current?.openDrawer();
                          }}>
                          <Image
                            style={{width: 25, height: 17, marginLeft: 29}}
                            source={require('../assets/img/burgerIcon.png')}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: 50, marginLeft: 15}}>
                          <Text>ENG</Text>
                        </TouchableOpacity>
                      </View>
                    ),
                    headerTintColor: Colors.black,
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerTitleStyle: {
                      fontWeight: '400',
                      textTransform: 'uppercase',
                      fontSize: 14,
                    },
                  }}
                />
                <authStack.Screen
                  name={authRoutes.parameters}
                  component={Parameters}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    title: translate.t('screens.parameters'),
                    headerLeft: () => (
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity
                          onPress={() => {
                            isDrawerOpened.current
                              ? sideDraver.current?.closeDrawer()
                              : sideDraver.current?.openDrawer();
                          }}>
                          <Image
                            style={{width: 25, height: 17, marginLeft: 29}}
                            source={require('../assets/img/burgerIcon.png')}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: 50, marginLeft: 15}}>
                          <Text>ENG</Text>
                        </TouchableOpacity>
                      </View>
                    ),
                    headerTintColor: Colors.black,
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerTitleStyle: {
                      fontWeight: '400',
                      textTransform: 'uppercase',
                      fontSize: 14,
                    },
                  }}
                />
                <authStack.Screen
                  name={authRoutes.partners}
                  component={Partners}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerBackTitle: '',
                    title: translate.t('screens.partners'),
                    headerLeft: () => (
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity
                          onPress={() => {
                            isDrawerOpened.current
                              ? sideDraver.current?.closeDrawer()
                              : sideDraver.current?.openDrawer();
                          }}>
                          <Image
                            style={{width: 25, height: 17, marginLeft: 29}}
                            source={require('../assets/img/burgerIcon.png')}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: 50, marginLeft: 15}}>
                          <Text>ENG</Text>
                        </TouchableOpacity>
                      </View>
                    ),
                    headerRight: () => (
                      <TouchableOpacity
                        onPress={() => {
                          // navigation.navigate(authRoutes.searchScreen, {
                          //   key: 'partners',
                          // });
                        }}>
                        <Image
                          style={{width: 21.01, height: 21, marginRight: 29}}
                          source={require('../assets/img/greenSearch.png')}
                        />
                      </TouchableOpacity>
                    ),
                    headerTintColor: Colors.black,
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerTitleStyle: {
                      fontWeight: '400',
                      textTransform: 'uppercase',
                      fontSize: 14,
                    },
                  }}
                />
                <authStack.Screen
                  name={authRoutes.singlePartners}
                  component={SinglePartners}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerLeft: () => (
                      <TouchableOpacity
                        onPress={() => {
                          isDrawerOpened.current
                            ? sideDraver.current?.closeDrawer()
                            : sideDraver.current?.openDrawer();
                        }}>
                        <Image
                          style={{width: 25, height: 17, marginLeft: 29}}
                          source={require('../assets/img/burgerIcon.png')}
                        />
                      </TouchableOpacity>
                    ),
                    headerRight: () => (
                      <TouchableOpacity onPress={() => {}}>
                        <Image
                          style={{width: 21.01, height: 21, marginRight: 29}}
                          source={require('../assets/img/greenSearch.png')}
                        />
                      </TouchableOpacity>
                    ),
                    headerBackTitle: '',
                    title: translate.t('screens.partners'),
                    headerTintColor: Colors.black,
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerTitleStyle: {
                      fontWeight: '400',
                      textTransform: 'uppercase',
                      fontSize: 14,
                    },
                  }}
                />
                <authStack.Screen
                  name={authRoutes.changePassword}
                  component={ChangePassword}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerBackTitle: '',
                    title: translate.t('settings.changePwd'),
                    headerTintColor: Colors.black,
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerTitleStyle: {
                      fontWeight: '400',
                      textTransform: 'uppercase',
                      fontSize: 14,
                    },
                  }}
                />
                <authStack.Screen
                  name={authRoutes.PasswordChangingMessage}
                  component={PasswordChangingMessage}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerBackTitle: '',
                    title: '',
                    headerTintColor: Colors.black,
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                  }}
                />
                <authStack.Screen
                  name={authRoutes.PasswordChangingError}
                  component={PasswordChangingError}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerBackTitle: '',
                    title: '',
                    headerTintColor: Colors.black,
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                  }}
                />
                <authStack.Screen
                  name={authRoutes.changePin}
                  component={PassCode}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerBackTitleVisible: false,

                    title: '',
                    headerTintColor: Colors.black,
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                  }}
                />
                <authStack.Screen
                  name={authRoutes.searchResults}
                  component={Organizations}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerBackTitleVisible: false,
                    headerTintColor: Colors.black,
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    title: translate.t('home.whatShouldSpend'),
                    headerLeft: () => (
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity
                          onPress={() => {
                            isDrawerOpened.current
                              ? sideDraver.current?.closeDrawer()
                              : sideDraver.current?.openDrawer();
                          }}>
                          <Image
                            style={{width: 25, height: 17, marginLeft: 29}}
                            source={require('../assets/img/burgerIcon.png')}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: 50, marginLeft: 15}}>
                          <Text>ENG</Text>
                        </TouchableOpacity>
                      </View>
                    ),
                    headerRight: () => (
                      <TouchableOpacity
                        onPress={() => {
                          subscriptionService?.sendData(
                            'open-RightDrawer',
                            true,
                          );
                        }}>
                        <Image
                          style={{width: 22, height: 21, marginRight: 29}}
                          source={require('../assets/img/cartIconsec.png')}
                        />
                      </TouchableOpacity>
                    ),
                  }}
                />
                {/* <authStack.Screen
                  name={authRoutes.searchScreen}
                  component={SearchScreen}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerLeft: () => (
                      <TouchableOpacity
                        onPress={() => {
                          isDrawerOpened.current
                            ? sideDraver.current?.closeDrawer()
                            : sideDraver.current?.openDrawer();
                        }}>
                        <Image
                          style={{width: 25, height: 17, marginLeft: 29}}
                          source={require('../assets/img/burgerIcon.png')}
                        />
                      </TouchableOpacity>
                    ),
                    headerBackTitle: '',
                    title: '',
                    headerTintColor: Colors.black,
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerTitleStyle: {
                      fontWeight: '400',
                      textTransform: 'uppercase',
                      fontSize: 14,
                    },
                  }}
                /> */}
              </>
            ) : (
              <>
                <authStack.Screen
                  name={notAuthRoutes.login}
                  component={LoginScreen}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    title: translate.t('screens.welcome'),
                    headerTitleAlign: 'left',
                    headerTitleContainerStyle: {
                      marginLeft: 41,
                    },
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerRight: () => (
                      <TouchableOpacity style={{marginRight: 20, width: 50}}>
                        <Text>ENG</Text>
                      </TouchableOpacity>
                    ),
                    headerTintColor: Colors.bgGreen,
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
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    title: translate.t('auth.register'),
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },

                    headerTintColor: Colors.bgGreen,
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      fontSize: 20,
                    },
                  }}
                />
                <authStack.Screen
                  name={notAuthRoutes.myCardInfo}
                  component={MyCardInfo}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    title: translate.t('auth.register'),
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerTintColor: Colors.bgGreen,
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
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    title: translate.t('auth.register'),
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerTintColor: Colors.bgGreen,
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
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    title: translate.t('auth.register'),
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerTintColor: Colors.bgGreen,
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      fontSize: 20,
                    },
                  }}
                />
                <authStack.Screen
                  name={notAuthRoutes.smsCode}
                  component={SmsCode}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    title: translate.t('auth.register'),
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerTintColor: Colors.bgGreen,
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
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    title: '',
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerTintColor: Colors.bgGreen,
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      fontSize: 20,
                    },
                  }}
                />
                <authStack.Screen
                  name={notAuthRoutes.authScreen}
                  component={AuthScreen}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    title: translate.t('screens.welcome'),
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerRight: () => (
                      <TouchableOpacity style={{marginRight: 20, width: 50}}>
                        <Text>ENG</Text>
                      </TouchableOpacity>
                    ),
                    headerTintColor: Colors.bgGreen,
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      fontSize: 20,
                    },
                  }}
                />
                <authStack.Screen
                  name={notAuthRoutes.authPage}
                  component={AuthPage}
                  options={{
                    cardStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    title: translate.t('auth.authorize'),
                    headerStyle: {
                      backgroundColor: Colors.bgColor,
                    },
                    headerTintColor: Colors.bgGreen,
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
        </DrawerRight>
      </DrawerLayout>
    </>
  );
};

export default DrawerContainer;
