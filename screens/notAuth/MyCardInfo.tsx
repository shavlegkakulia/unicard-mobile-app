import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, createRef, useState} from 'react';
import {Text, StyleSheet, View, Image, TextInput, Platform} from 'react-native';
import {useSelector} from 'react-redux';
import AppButton from '../../components/CostumComponents/AppButton';
import {ScreenNavigationProp} from '../../interfaces/commons';
import {notAuthRoutes} from '../../navigation/routes';
import {ITranslateReducer, ITranslateState} from '../../Store/types/translate';

import Colors from '../../theme/Colors';

type RouteParamList = {
  params: {
    fb_token?: string;
  };
};

const MyCardInfo: React.FC<ScreenNavigationProp> = props => {
  const route = useRoute<RouteProp<RouteParamList, 'params'>>();
  //   const [num0, setNum0] = useState('');
  //   const [num1, setNum1] = useState('');
  //   const [num2, setNum2] = useState('');
  //   const [num3, setNum3] = useState('');
  const translate = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;

  //   const input0 = useRef<TextInput>(null);
  //   const input1 = useRef<TextInput>(null);
  //   const input2 = useRef<TextInput>(null);
  //   const input3 = useRef<TextInput>(null);

  const goNext = () => {
    if (!userCardNumber.trim()) {
      return;
    } else {
      props.navigation.navigate(notAuthRoutes.registrationDetails, {
        cardNum: userCardNumber,
        fb_token: route?.params?.fb_token,
      });
    }
  };

  //   useEffect(() => {
  //     if (input0.current?.isFocused && num0.length >= 4) {
  //       input1.current?.focus();
  //     }
  //     if (input1.current?.isFocused && num1.length >= 4) {
  //       input2.current?.focus();
  //     }
  //     if (input2.current?.isFocused && num2.length >= 4) {
  //       input3.current?.focus();
  //     }
  //   }, [num0, num1, num2, num3, input0, input1, input2, input3]);

  //   const cardNum = num0 + num1 + num2 + num3;


  const [cardNumber, setCardNumber] = useState<string[]>(new Array(4).fill(''));
  //   const [error, setError] = useState<boolean>(false);
  const inputRef0 = useRef<TextInput>(null);
  const inputRef1 = useRef<TextInput>(null);
  const inputRef2 = useRef<TextInput>(null);
  const inputRef3 = useRef<TextInput>(null);

  const refs = [inputRef0, inputRef1, inputRef2, inputRef3];
  let isEditableInputArray: any[] = [true, false, false, false];
  const userCardNumber = cardNumber.join('');

  const handleChangeText = (value: any, index: number) => {
    if (isNaN(value)) {
      return;
    }
    setCardNumber([...cardNumber.map((v, i) => (i === index ? value : v))]);

    if (refs[index + 1] && value !== '' && value.length >= 4) {
      isEditableInputArray = [
        ...isEditableInputArray,
        isEditableInputArray.splice(1, 1, true),
      ];
      refs[index + 1].current!.focus();
    }
  };

  const handleFocusPrev = (event: any, index: number) => {
    if (event.nativeEvent.key === 'Backspace' && cardNumber[index] === '') {
      if (refs[index - 1]) {
        refs[index - 1].current?.focus();
      }
    }
  };

  //   const handleEditableInput = (index: number) => {
  //     if (index === 0) {
  //       return true;
  //     }
  //     if (index !== 0 && cardNumber[index - 1].trim().length === 4) {
  //       return true;
  //     }

  //     return false;
  //   };


  return (
    <>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{translate.t('auth.userRegistration')}</Text>
        <View style={styles.imageWrapper}>
          <View style={styles.cardnumView}>
            <Text style={styles.cardText}>
              {translate.t('auth.addCardNumber')}
            </Text>
            <View style={styles.inputView}>
              {/* <View style={styles.border}>
                <TextInput
                  maxLength={4}
                  ref={input0}
                  value={num0}
                  onChangeText={e => setNum0(e.trim())}
                />
              </View>
              <View style={styles.border}>
                <TextInput
                  maxLength={4}
                  ref={input1}
                  value={num1}
                  onChangeText={e => setNum1(e.trim())}
                  editable={!num0.trim() ? false : true}
                />
              </View>
              <View style={styles.border}>
                <TextInput
                  maxLength={4}
                  ref={input2}
                  value={num2}
                  onChangeText={e => setNum2(e.trim())}
                  editable={!num1.trim() ? false : true}
                />
              </View>
              <View style={styles.border}>
                <TextInput
                  style={styles.input}
                  maxLength={4}
                  ref={input3}
                  value={num3}
                  onChangeText={e => setNum3(e.trim())}
                  editable={!num2.trim() ? false : true}
                />
              </View> */}
              {cardNumber.map((element, index) => (
                <View style={styles.border} key={index}>
                  <TextInput
                    style={[styles.input, Platform.OS === 'android' && {height: 24}]}
                    ref={refs[index]}
                    maxLength={4}
                    keyboardType="numeric"
                    value={element}
                    onChangeText={newValue => handleChangeText(newValue, index)}
                    onKeyPress={event => {
                      handleFocusPrev(event, index);
                    }}
                    editable={(index === 0) ? true : cardNumber?.[index - 1].length > 0 ? true : false}
                  />
                </View>

                // <TextInput
                //     ref={refs[index]}
                //     style={[styles.otpBox, { borderColor: error ? 'red' : '#8d949e' }]}
                //     key={index}
                //     maxLength={1}
                //     selectTextOnFocus
                //     keyboardType='numeric'
                //     value={element}
                //     onFocus={() => setError(false)}
                //     onBlur={() => setError(false)}
                //     onChangeText={(newValue) => handleChangeText(newValue, index)}
                //     onKeyPress={event => { handleFocusPrev(event, index) }}
                // />
              ))}
            </View>
          </View>

          <Image
            style={styles.image}
            source={require('../../assets/img/blurCard.png')}
          />
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <AppButton
          onPress={goNext}
          title={translate.t('common.next')}
          backgroundColor={Colors.bgGreen}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  titleWrapper: {
    alignItems: 'center',
    flex: 2,
    justifyContent: 'center',
  },
  title: {
    color: Colors.darkGrey,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
  },
  imageWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '90%',
    marginTop: 48,
  },
  image: {
    width: 303,
    height: 196,
  },
  buttonWrapper: {
    flex: 1,
  },
  button: {
    marginTop: 34,
  },
  cardnumView: {
    position: 'absolute',
    top: 75,
    zIndex: 10,
  },
  cardText: {
    marginLeft: 16,
    color: Colors.darkGrey,
    fontSize: 12,
    fontFamily: 'BPG DejaVu Sans',
    lineHeight: 13.97,
  },
  inputView: {
    flexDirection: 'row',
    width: 290,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 7,
    marginTop: 13,
  },
  border: {
    borderColor: Colors.darkGrey,
    borderWidth: 1,
    width: 68.64,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 5,
  },
  input: {
    fontSize: 16,
    width: 68,
    padding: 0
  },
});

export default MyCardInfo;
