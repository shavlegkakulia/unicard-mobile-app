import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../theme/Colors';

export interface IAppBtnProps {
  onPress: () => void | undefined;
  title: string;
  backgroundColor: string;
  loading?: boolean;
  disabled?: boolean;
}

const AppButton: React.FC<IAppBtnProps> = props => {
  const {onPress, title, backgroundColor, loading, disabled} = props;

  return (
    <View style={styles.main}>
      <TouchableOpacity
        disabled={disabled}
        style={[styles.btnStyle, {backgroundColor: backgroundColor}]}
        onPress={onPress}>
        {loading ? (
          <ActivityIndicator color={Colors.white} size={'small'} />
        ) : (
          <Text style={styles.btnTitle}>{title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
export default AppButton;

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStyle: {
    width: 327,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  btnTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
  },
});
