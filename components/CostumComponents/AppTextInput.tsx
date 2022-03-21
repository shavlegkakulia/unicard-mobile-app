import React, {useState} from 'react';
import {
  ImageSourcePropType,
  StyleSheet,
  View,
  TextInput,
  Image,
  KeyboardTypeOptions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export interface IAppTextInputProps {
  placeholder?: string;
  icon?: ImageSourcePropType;
  secureTextEntry?: boolean;
  textContentType?: any;
  keyboardType?: KeyboardTypeOptions | undefined;
}

const AppTextInput: React.FC<IAppTextInputProps> = props => {
  const {placeholder, icon, secureTextEntry, textContentType, keyboardType} =
    props;
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(secureTextEntry);

  let iconUrl = !secureTextEntry
    ? icon
    : visible
    ? require('../../assets/img/passwordIcon.png')
    : require('../../assets/img/iconShow.png');
  return (
    <View style={styles.main}>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder={placeholder?.toUpperCase() || ''}
          onChangeText={setText}
          value={text}
          placeholderTextColor={'#6B6B6B'}
          keyboardType={keyboardType}
          secureTextEntry={visible}
          textContentType={textContentType}
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
    borderBottomColor: '#6B6B6B',
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
});
