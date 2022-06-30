import React, {useEffect, useState} from 'react';
import {
  ImageSourcePropType,
  StyleSheet,
  View,
  TextInput,
  Image,
  KeyboardTypeOptions,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {ITranslateReducer, ITranslateState} from '../../Store/types/translate';
import Colors from '../../theme/Colors';

export const requireTypes = {
  email: 'email',
  password: 'password',
  require: 'require',
  min: 'min',
  minLength: 'minLength',
  maxLength: 'maxLength',
  repeatPassword: 'repeatPassword',
  mutch: 'mutch',
};

export interface IAppTextInputProps {
  placeholder?: string;
  icon?: ImageSourcePropType;
  secureTextEntry?: boolean;
  textContentType?: any;
  keyboardType?: KeyboardTypeOptions | undefined;
  value?: string;
  minValue?: number;
  minLength?: number;
  maxLength?: number;
  onChange: (value: string) => void;
  name?: string;
  requireType?: string | null;
  chekCount?: number;
  onPressProp?: () => void;
  borderColor?: string;
  search?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  skipError?:boolean;
  inputStyle?: StyleProp<ViewStyle>
}

export let inputErrors: any[] = [];

export const deleteError = (name: string) => {
  inputErrors = [...inputErrors.filter(err => err !== name)];
};

const AppTextInput: React.FC<IAppTextInputProps> = props => {
  const translate = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;
  const {
    placeholder,
    icon,
    secureTextEntry,
    textContentType,
    keyboardType,
    value,
    minValue,
    minLength,
    maxLength,
    name,
    requireType,
    chekCount,
    onChange,
    onPressProp,
    search,
    onFocus,
    onBlur,
    skipError,
    inputStyle
  } = props;

  const errorMessages = {
    email: translate.t('generalErrors.wrongEmail'),
    password: translate.t('generalErrors.pwdMatchText'),
    required: translate.t('generalErrors.requiredField'),
    min: translate.t('generalErrors.minValue') + minValue,
    minLength: translate.t('generalErrors.minLength') + minLength,
    maxLength: translate.t('generalErrors.maxLength') + maxLength,
    repeatPassword: translate.t('generalErrors.wrongRepeatPwd'),
  };

  const [visible, setVisible] = useState(secureTextEntry);
  const [hasError, setHasEror] = useState<string | undefined>(undefined);
  const [isFocused, setIsFocused] = useState(false);

  let iconUrl = !secureTextEntry
    ? icon
    : visible
    ? require('../../assets/img/passwordIcon.png')
    : require('../../assets/img/iconShow.png');

  const validateEmail = () => {
    return String(value)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const validatePassword = () => {
    if (!value) {
      return false;
    }
    const text = value;
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!=+\/\\#$%^&*~`}{\]\[|()_+-])[A-Za-z\d#?!$()>`}{\]\[|=+\/\\<%^&_,*-]{8,100}$/gm;
    const result = pattern.test(text);

    return result;
  };
useEffect(() => {
if(skipError) setHasEror(undefined)
}, [skipError])
  const check = (imediately?: boolean) => {
    if(skipError) {
      setHasEror(undefined);
      return;
    }
    if (requireType === requireTypes.require) {
      if (!value) {
        if (inputErrors.indexOf(name) < 0) {
          inputErrors.push(name);
        }
        if (isFocused || imediately) {
          setHasEror(errorMessages.required);
        }
      } else if (value && value?.trim().length <= 0) {
        if (inputErrors.indexOf(name) < 0) {
          inputErrors.push(name);
        }
        if (isFocused || imediately) {
          setHasEror(errorMessages.required);
        }
      } else {
        const filtered = [...inputErrors.filter(n => n !== name)];
        inputErrors.splice(0, inputErrors.length);
        inputErrors.push(...filtered);
        setHasEror(undefined);
      }
    } else if (requireType === requireTypes.email) {
      if (!value) {
        if (inputErrors.indexOf(name) < 0) {
          inputErrors.push(name);
        }
        if (isFocused || imediately) {
          setHasEror(errorMessages.email);
        }
      } else if ((value && value?.trim().length <= 0) || !validateEmail()) {
        if (inputErrors.indexOf(name) < 0) {
          inputErrors.push(name);
        }
        if (isFocused || imediately) {
          setHasEror(errorMessages.email);
        }
      } else {
        const filtered = [...inputErrors.filter(n => n !== name)];
        inputErrors.splice(0, inputErrors.length);
        inputErrors.push(...filtered);
        setHasEror(undefined);
      }
    } else if (requireType === requireTypes.password) {
      if (!value) {
        if (inputErrors.indexOf(name) < 0) {
          inputErrors.push(name);
        }
        if (isFocused || imediately) {
          setHasEror(errorMessages.password);
        }
      } else if ((value && value?.trim().length <= 0) || !validatePassword()) {
        if (inputErrors.indexOf(name) < 0) {
          inputErrors.push(name);
        }
        if (isFocused || imediately) {
          setHasEror(errorMessages.password);
        }
      } else {
        const filtered = [...inputErrors.filter(n => n !== name)];
        inputErrors.splice(0, inputErrors.length);
        inputErrors.push(...filtered);
        setHasEror(undefined);
      }
    } else if (requireType === requireTypes.repeatPassword) {
      if (!value) {
        if (inputErrors.indexOf(name) < 0) {
          inputErrors.push(name);
        }
        if (isFocused || imediately) {
          setHasEror(errorMessages.repeatPassword);
        }
      } else if (value && value?.trim().length <= 0) {
        if (inputErrors.indexOf(name) < 0) {
          inputErrors.push(name);
        }
        if (isFocused || imediately) {
          setHasEror(errorMessages.repeatPassword);
        }
      } else {
        const filtered = [...inputErrors.filter(n => n !== name)];
        inputErrors.splice(0, inputErrors.length);
        inputErrors.push(...filtered);
        setHasEror(undefined);
      }
    } else if (requireType !== null && requireType === requireTypes.min) {
      if (minValue) {
        if (!value) {
          if (inputErrors.indexOf(name) < 0) {
            inputErrors.push(name);
          }
          if (isFocused || imediately) {
            setHasEror(errorMessages.min);
          }
        } else if (isNaN(parseFloat(value))) {
          if (inputErrors.indexOf(name) < 0) {
            inputErrors.push(name);
          }
          if (isFocused || imediately) {
            setHasEror(errorMessages.min);
          }
        } else if (value && parseFloat(value) < minValue) {
          if (inputErrors.indexOf(name) < 0) {
            inputErrors.push(name);
          }
          if (isFocused || imediately) {
            setHasEror(errorMessages.min);
          }
        } else {
          const filtered = [...inputErrors.filter(n => n !== name)];
          inputErrors.splice(0, inputErrors.length);
          inputErrors.push(...filtered);
          setHasEror(undefined);
        }
      }
    } else if (requireType === requireTypes.minLength) {
      if (minLength) {
        if (!value) {
          if (inputErrors.indexOf(name) < 0) {
            inputErrors.push(name);
          }
          if (isFocused || imediately) {
            setHasEror(errorMessages.minLength);
          }
        } else if (value && value.length < minLength) {
          if (inputErrors.indexOf(name) < 0) {
            inputErrors.push(name);
          }
          if (isFocused || imediately) {
            setHasEror(errorMessages.minLength);
          }
        } else {
          const filtered = [...inputErrors.filter(n => n !== name)];
          inputErrors.splice(0, inputErrors.length);
          inputErrors.push(...filtered);
          setHasEror(undefined);
        }
      }
    } else if (requireType === requireTypes.maxLength) {
      if (maxLength) {
        if (!value) {
          if (inputErrors.indexOf(name) < 0) {
            inputErrors.push(name);
          }
          if (isFocused || imediately) {
            setHasEror(errorMessages.maxLength);
          }
        } else if (value && value.length > maxLength) {
          if (inputErrors.indexOf(name) < 0) {
            inputErrors.push(name);
          }
          if (isFocused || imediately) {
            setHasEror(errorMessages.maxLength);
          }
        } else {
          const filtered = [...inputErrors.filter(n => n !== name)];
          inputErrors.splice(0, inputErrors.length);
          inputErrors.push(...filtered);
          setHasEror(undefined);
        }
      }
    }

    setIsFocused(true);
  };

  useEffect(() => {
    setIsFocused(true);
    if (requireType) {
      check();
    }
  }, [value, chekCount, translate.key]);

  const mainstyle = Platform.select({
    ios: styles.main,
    android: styles.mainAndroid,
  });

  return (
    <>
      <KeyboardAvoidingView style={[mainstyle, inputStyle]}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder={placeholder || ''}
            onChangeText={onChange}
            value={value}
            placeholderTextColor={Colors.darkGrey}
            keyboardType={keyboardType || 'default'}
            secureTextEntry={visible}
            textContentType={textContentType || 'none'}
            style={styles.inputPlaceholder}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </View>

        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => {
            if (!search) {
              setVisible(!visible);
            } else {
              onPressProp?.();
            }
          }}>
          {iconUrl !== undefined && (
            <Image
              source={iconUrl}
              style={styles.icon}
              resizeMode={'contain'}
            />
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
      {hasError !== undefined && isFocused && (
        <View style={styles.errWrapper}>
          <Text style={styles.errMessage}>{hasError}</Text>
        </View>
      )}
    </>
  );
};
export default AppTextInput;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 35,
    width: 325,
    paddingVertical: 12,
    paddingHorizontal: 7,
    borderBottomColor: Colors.darkGrey,
    borderBottomWidth: 1,
  },
  mainAndroid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 35,
    width: 325,
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderBottomColor: Colors.darkGrey,
    borderBottomWidth: 1,
  },
  inputWrapper: {
    width: 295,
  },
  iconWrapper: {
    width: 30,
  },
  icon: {
    width: 22,
  },
  inputPlaceholder: {
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
  },
  errWrapper: {
    width: 325,
    paddingHorizontal: 7,
    marginTop: 6,
  },
  errMessage: {
    color: Colors.red,
    fontSize: 10,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
  },
});
