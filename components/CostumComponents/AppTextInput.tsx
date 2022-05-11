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
}

let inputErrors: any[] = [];
console.log('shesvla1', inputErrors);

export const gError = {
  errors: inputErrors,
};

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
    return String(value)
      .toLowerCase()
      .match(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$',
      );
  };

  const check = () => {
    if (isFocused) {
      switch (requireType) {
        case requireTypes.require:
          {
            if (!value) {
              if (inputErrors.indexOf(name) < 0) {
                inputErrors.push(name);
              }
              setHasEror(errorMessages.required);
            } else if (value && value?.trim().length <= 0) {
              if (inputErrors.indexOf(name) < 0) {
                inputErrors.push(name);
              }
              setHasEror(errorMessages.required);
            } else {
              inputErrors = [...inputErrors.filter(n => n !== name)];
              setHasEror(undefined);
            }
          }
          break;
        case requireTypes.email:
          {
            if (!value) {
              if (inputErrors.indexOf(name) < 0) {
                inputErrors.push(name);
              }
              setHasEror(errorMessages.email);
            } else if (
              (value && value?.trim().length <= 0) ||
              !validateEmail()
            ) {
              if (inputErrors.indexOf(name) < 0) {
                inputErrors.push(name);
              }
              setHasEror(errorMessages.email);
            } else {
              inputErrors = [...inputErrors.filter(n => n !== name)];
              setHasEror(undefined);
            }
          }
          break;
        case requireTypes.password:
          {
            if (!value) {
              if (inputErrors.indexOf(name) < 0) {
                inputErrors.push(name);
              }
              setHasEror(errorMessages.password);
            } else if (
              (value && value?.trim().length <= 0) ||
              !validatePassword()
            ) {
              if (inputErrors.indexOf(name) < 0) {
                inputErrors.push(name);
              }
              setHasEror(errorMessages.password);
            } else {
              inputErrors = [...inputErrors.filter(n => n !== name)];
              setHasEror(undefined);
            }
          }
          break;
        case requireTypes.min:
          {
            if (minValue) {
              if (!value) {
                if (inputErrors.indexOf(name) < 0) {
                  inputErrors.push(name);
                }
                setHasEror(errorMessages.min);
              } else if (isNaN(parseFloat(value))) {
                if (inputErrors.indexOf(name) < 0) {
                  inputErrors.push(name);
                }
                setHasEror(errorMessages.min);
              } else if (value && parseFloat(value) < minValue) {
                if (inputErrors.indexOf(name) < 0) {
                  inputErrors.push(name);
                }
                setHasEror(errorMessages.min);
              } else {
                inputErrors = [...inputErrors.filter(n => n !== name)];
                setHasEror(undefined);
              }
            }
          }
          break;
        case requireTypes.minLength:
          {
            if (minLength) {
              if (!value) {
                if (inputErrors.indexOf(name) < 0) {
                  inputErrors.push(name);
                }
                setHasEror(errorMessages.minLength);
              } else if (value && value.length < minLength) {
                if (inputErrors.indexOf(name) < 0) {
                  inputErrors.push(name);
                }
                setHasEror(errorMessages.minLength);
              } else {
                inputErrors = [...inputErrors.filter(n => n !== name)];
                setHasEror(undefined);
              }
            }
          }
          break;
        case requireTypes.maxLength:
          {
            if (maxLength) {
              if (!value) {
                if (inputErrors.indexOf(name) < 0) {
                  inputErrors.push(name);
                }
                setHasEror(errorMessages.maxLength);
              } else if (value && value.length > maxLength) {
                if (inputErrors.indexOf(name) < 0) {
                  inputErrors.push(name);
                }
                setHasEror(errorMessages.maxLength);
              } else {
                inputErrors = [...inputErrors.filter(n => n !== name)];
                setHasEror(undefined);
              }
            }
          }
          break;
      }
    }
    setIsFocused(true);
  };

  useEffect(() => {
    setIsFocused(true);
    if (requireType) {
      check();
    }
  }, [value]);
  console.log(inputErrors);
  return (
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
        {hasError !== undefined && isFocused && (
          <Text style={styles.errMessage}>{hasError}</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.iconWrapper}
        onPress={() => setVisible(!visible)}>
        {iconUrl !== undefined && (
          <Image source={iconUrl} style={styles.icon} />
        )}
      </TouchableOpacity>
    </View>
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
    height: 19,
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
