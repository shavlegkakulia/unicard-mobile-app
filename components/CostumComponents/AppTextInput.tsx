import React, {useEffect, useState} from 'react';
import {
  ImageSourcePropType,
  StyleSheet,
  View,
  TextInput,
  Image,
  KeyboardTypeOptions,
  Text,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../../theme/Colors';

export const requireTypes = {
  email: 'email',
  password: 'password',
  require: 'require',
  min: 'min',
  minLength: 'minLength',
  maxLength: 'maxLength',
  repeatPassword: 'repeatPassword',
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
  requireType?: string;
  chekCount?: number;
}

export const inputErrors: any[] = [];

const AppTextInput: React.FC<IAppTextInputProps> = props => {
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
  } = props;

  const errorMessages = {
    email: 'wrong email',
    password:
      'პაროლი უნდა შეიცავდეს მინიმუმ: \n- 8 სიმბოლოს \n- ერთ დიდ ასოს \n- ერთ პატარა ასოს \n- ერთ ციფრს \n- ერთ სპეციალურ სიმბოლოს (გარდა წერტილისა და @ სიმბოლოსი)',
    required: 'fill field',
    min: 'min value must ' + minValue,
    minLength: 'min length must ' + minLength,
    maxLength: 'max length must ' + maxLength,
    repeatPassword: 'პაროლი არასწორია',
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

    console.log('>>>>', result);
    return result;
  };

  const check = (imediately?: boolean) => {
    console.log('>>>1', value, requireType);
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
    } else if (requireType === requireTypes.min) {
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
  }, [value, chekCount]);

  console.log(inputErrors);
  return (
    <>
      <View style={styles.main}>
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
          />
        </View>

        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => setVisible(!visible)}>
          {iconUrl !== undefined && (
            <Image source={iconUrl} style={styles.icon} />
          )}
        </TouchableOpacity>
      </View>
      {hasError !== undefined && isFocused && (
        <Text style={styles.errMessage}>{hasError}</Text>
      )}
    </>
  );
};
export default AppTextInput;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 35,
    width: 325,
    paddingVertical: 12,
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
    width: 23,
    height: 21,
  },
  inputPlaceholder: {
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
  },
  errMessage: {
    color: Colors.red,
    fontSize: 10,
  },
});
