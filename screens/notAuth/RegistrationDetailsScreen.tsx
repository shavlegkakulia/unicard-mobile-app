import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import AppButton from '../../components/CostumComponents/AppButton';
import AppTextInput, {
  deleteError,
  requireTypes,
} from '../../components/CostumComponents/AppTextInput';
import {ScreenNavigationProp} from '../../interfaces/commons';
import {notAuthRoutes} from '../../navigation/routes';
import {IRegisterRequestData} from '../../services/AuthService';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {inputErrors} from './../../components/CostumComponents/AppTextInput';
import DatePicker from 'react-native-date-picker';

import Colors from '../../theme/Colors';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {ITranslateReducer, ITranslateState} from '../../Store/types/translate';
import CheckBox from '@react-native-community/checkbox';
import UserInfoService, {ICountry} from '../../services/UserInfoService';
import Select from '../../components/CostumComponents/Select/Select';
import {CountryItem} from '../../components/CostumComponents/Select/CountryItem';
import {required} from '../../components/Validation';

type RouteParamList = {
  params: {
    hasCard?: boolean;
    fb_token?: string;
    cardNumber?: string;
  };
};

const RegistrationDetailsScreen: React.FC<ScreenNavigationProp> = props => {
  const route = useRoute<RouteProp<RouteParamList, 'params'>>();
  const [date, setDate] = useState(new Date());
  const [regData, setRegData] = useState<IRegisterRequestData>({});
  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(false);
  const [foreign, setForeign] = useState<boolean>(false);
  const [chekCount, setChekCount] = useState<number>(0);
  const [countries, setCountriew] = useState<ICountry[] | undefined>();
  const [country, setCountry] = useState<ICountry>();

  const [open, setOpen] = useState(false);
  const [dateTitle, setDateTiTle] = useState(true);
  const translate = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;

  const nextStep = () => {
    setChekCount(t => ++t);
    if (inputErrors.length > 0) {
      console.log(inputErrors);
      return;
    }
    props.navigation.navigate(notAuthRoutes.passwordInfo, {
      data: {
        ...regData,
        fb_token:
          route?.params?.fb_token?.length! > 0 ? route?.params?.fb_token : '',
        card:
          route?.params?.cardNumber?.length! > 0
            ? route?.params?.cardNumber
            : '',
        phone: country?.dialCode?.concat(regData?.phone || ''),
      },
    });
  };

  const onFocus = () => {
    setForeign(true);
  };
  const onBlur = () => {
    setForeign(false);
  };

  const activeToggle = () => {
    setToggleCheckBox(prev => !prev);
    deleteError('personalnumber');
    console.log(toggleCheckBox);
  };

  useEffect(() => {
    console.log('************');
    UserInfoService.GetCountries().subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          let _c = [...(Response.data.countries || [])];
          const georgia = _c.filter(el => el.dialCode === '995');
          _c = [georgia[0], ..._c.filter(el => el.dialCode !== '995')];

          setCountriew(_c);
        }
      },
      error: err => {
        console.log(err);
      },
    });
  }, []);

  return (
    <>
      <KeyboardAwareScrollView>
        <View style={styles.textInput}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{translate.t('auth.fillInfo')}</Text>
          </View>
          <AppTextInput
            placeholder={translate.t('common.name')}
            icon={0}
            secureTextEntry={false}
            textContentType={'name'}
            value={regData?.name}
            requireType={requireTypes.require}
            name="name"
            chekCount={chekCount}
            onChange={e =>
              setRegData({
                name: e,
                surname: regData?.surname,
                person_code: regData?.person_code,
                birthDate: date?.toLocaleDateString().split('.').join('/'),
                phone: regData?.phone,
                email: regData?.email,
                new_card_registration: route?.params?.hasCard ? '1' : '0',
                card: route?.params?.cardNumber,
                user_name: regData?.email,
              })
            }
          />
          <AppTextInput
            placeholder={translate.t('common.lname')}
            icon={0}
            secureTextEntry={false}
            textContentType={'name'}
            requireType={requireTypes.require}
            value={regData?.surname}
            chekCount={chekCount}
            onChange={e =>
              setRegData({
                name: regData?.name,
                user_name: regData?.email,
                surname: e,
                person_code: regData?.person_code,
                birthDate: date?.toLocaleDateString().split('.').join('/'),
                phone: regData?.phone,
                email: regData?.email,
                new_card_registration: route?.params?.hasCard ? '1' : '0',
                card: route?.params?.cardNumber,
              })
            }
          />
          <AppTextInput
            placeholder={translate.t('common.personalNumber')}
            icon={0}
            secureTextEntry={false}
            textContentType={''}
            value={regData?.person_code}
            skipError={toggleCheckBox}
            requireType={!toggleCheckBox ? requireTypes.min : undefined}
            minValue={!toggleCheckBox ? 6 : undefined}
            maxLength={!toggleCheckBox ? 11 : undefined}
            onFocus={onFocus}
            onBlur={onBlur}
            name={!toggleCheckBox ? 'personalnumber' : ''}
            chekCount={chekCount}
            onChange={e =>
              setRegData({
                name: regData?.name,
                user_name: regData?.email,
                surname: regData?.surname,
                person_code: e,
                birthDate: date?.toLocaleDateString().split('.').join('/'),
                phone: regData?.phone,
                email: regData?.email,
                new_card_registration: route?.params?.hasCard ? '1' : '0',
                card: route?.params?.cardNumber,
              })
            }
          />
          {foreign ? (
            <View style={styles.checkboxWrapper}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={activeToggle}
                tintColor={Colors.bgGreen}
                onCheckColor={Colors.white}
                onFillColor={Colors.bgGreen}
                onTintColor={Colors.bgGreen}
                offAnimationType="stroke"
                style={styles.checkbox}
              />
              <TouchableOpacity>
                <Text style={styles.text}>{translate.t('auth.foreign')}</Text>
              </TouchableOpacity>
            </View>
          ) : null}
          <TouchableOpacity
            style={styles.dateView}
            onPress={() => setOpen(true)}>
            <Text style={!dateTitle ? styles.dateTextBlack : styles.dateTxt}>
              {!dateTitle
                ? date?.toLocaleDateString().split('.').join('/')
                : 'MM/DD/YYYY'}
            </Text>
          </TouchableOpacity>

          <View style={styles.selectView}>
            <Select<ICountry>
              Item={i => (
                <CountryItem
                  {...i}
                  style={styles.countryItem}
                  placeholder={translate.t('auth.select')}
                />
              )}
              onChange={value => {
                setCountry(value);
              }}
              values={countries}
              value={country}
              activeItemStyle={[styles.currentAccountItem]}
              requireds={[required]}
              customKey={'countryCode'}
              context={'reg'}
            />
            <AppTextInput
              inputStyle={{width: 290}}
              placeholder={'5xx xxx xxx'}
              borderCol={Colors.bgColor}
              icon={0}
              secureTextEntry={false}
              textContentType={'telephoneNumber'}
              value={regData?.phone}
              requireType={requireTypes.maxLength}
              maxLength={18}
              chekCount={chekCount}
              name="telephoneNumber"
              onChange={e =>
                setRegData({
                  name: regData?.name,
                  user_name: regData?.email,
                  surname: regData?.surname,
                  person_code: regData?.person_code,
                  birthDate: date?.toLocaleDateString().split('.').join('/'),
                  phone: e,
                  email: regData?.email,
                  new_card_registration: route?.params?.hasCard ? '1' : '0',
                  card: route?.params?.cardNumber,
                })
              }
            />
          </View>

          <AppTextInput
            placeholder={translate.t('common.email')}
            icon={0}
            secureTextEntry={false}
            textContentType={'emailAddress'}
            requireType={requireTypes.email}
            name="email"
            value={regData?.email}
            onChange={e =>
              setRegData({
                name: regData?.name,
                user_name: e,
                surname: regData?.surname,
                person_code: regData?.person_code,
                birthDate: date?.toLocaleDateString().split('.').join('/'),
                phone: regData?.phone,
                email: e,
                new_card_registration: route?.params?.hasCard ? '0' : '1',
                card: route?.params?.cardNumber,
              })
            }
          />
        </View>

        <View style={styles.button}>
          <AppButton
            onPress={nextStep}
            title={translate.t('common.next')}
            backgroundColor={Colors.bgGreen}
          />
        </View>
        <DatePicker
          title={translate.t('auth.selectDate')}
          textColor={Colors.black}
          modal
          open={open}
          mode="date"
          date={date}
          onConfirm={dateB => {
            setOpen(false);
            setDate(dateB);
            setDateTiTle(false);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  titleWrapper: {
    width: 325,
    // alignItems: 'center',
    marginTop: 48,
  },
  title: {
    color: Colors.darkGrey,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 19.2,
  },
  textInput: {
    alignItems: 'center',
  },
  button: {
    marginTop: 116,
    marginBottom: 102,
  },
  checkboxWrapper: {
    width: 320,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  checkbox: {
    width: 16,
    height: 16,
  },
  text: {
    color: Colors.darkGrey,
    fontSize: 14,
    marginLeft: 10,
    fontFamily: 'BPG DejaVu Sans',
    lineHeight: 16.8,
  },
  countryItem: {
    borderRadius: 7,
  },
  currentAccountItem: {
    borderRadius: 7,
    marginTop: 35,
  },
  dateView: {
    marginTop: 35,
    width: 325,
    paddingVertical: 12,
    paddingHorizontal: 7,
    borderBottomColor: Colors.darkGrey,
    borderBottomWidth: 1,
  },
  dateTxt: {
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
    color: Colors.darkGrey,
  },
  dateTextBlack: {
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
    color: Colors.black,
  },
  selectView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    overflow: 'hidden',
    // backgroundColor: 'red',
    width: 325,
    borderBottomColor: Colors.darkGrey,
    borderBottomWidth: 1,
    paddingLeft: 7,
  },
});

export default RegistrationDetailsScreen;
