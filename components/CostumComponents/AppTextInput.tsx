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
import Colors from '../../theme/Colors';

export interface IAppTextInputProps {
  placeholder?: string;
  icon?: ImageSourcePropType;
  secureTextEntry?: boolean;
  textContentType?: any;
  keyboardType?: KeyboardTypeOptions | undefined;
  value?: string;
  onChange: (value: string) => void;
}

const AppTextInput: React.FC<IAppTextInputProps> = props => {
  const {placeholder, icon, secureTextEntry, textContentType, keyboardType, value, onChange} =
    props;

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
          onChangeText={onChange}
          value={value}
          placeholderTextColor={Colors.darkGrey}
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
});
