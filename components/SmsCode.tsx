import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Colors from '../theme/Colors';

const SmsCode = () => {
  const [smsCode, setSmsCode] = useState('');

  const placeholder = 'სმს კოდი';
  return (
    <View style={styles.inputWrapper}>
      <Text>ავტორიზაციისთვის საჭირო სმს კოდი გამოგზავნილია</Text>
      <View >
        <TextInput
          onChangeText={() => setSmsCode(smsCode)}
          value={smsCode}
          placeholder={placeholder.toLocaleUpperCase()}
          placeholderTextColor={Colors.primary}
          
        />
      </View>
    </View>
  );
};

export default SmsCode;

const styles = StyleSheet.create({
  inputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    paddingVertical: 10,
    width: 325,
    
  },
});
