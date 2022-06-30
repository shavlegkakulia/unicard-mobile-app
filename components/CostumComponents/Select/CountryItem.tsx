import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { ICountry } from '../../../services/UserInfoService';
import Colors from '../../../theme/Colors';

interface IItemProps extends ICountry {
  isSelected?: boolean;
  style?: StyleProp<ViewStyle>;
  activeItemStyle?: StyleProp<ViewStyle>;
  disable?: boolean;
  placeholder?: string;
}

export const CountryPlaceholder: React.FC<IItemProps> = ({
  placeholder,
  activeItemStyle
}) => { console.log(activeItemStyle, placeholder)
  return (
    <View style={[styles.item, styles.placeholderItem, activeItemStyle]}>
      {placeholder !== undefined ? <Text style={styles.placeholderItem}>{placeholder}</Text> : null}
    </View>
  );
};

export const CountryItem: React.FC<IItemProps> = props => {

  if (!props.dialCode) {
    return <CountryPlaceholder {...props} placeholder={props.placeholder} />;
  } else {
    return <View style={[styles.item, styles.placeholderItem]}>
    <Text style={styles.placeholderItem}>+{props.dialCode}</Text>
  </View>
  }
};

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 15,
    paddingVertical: 14,
    marginTop: 35,
    width: 100,
  },
  activeIitem: {
    borderTopColor: Colors.bgGreen,
    borderBottomColor: Colors.bgGreen,
  },
  disabledAccount: {
    opacity: 0.5,
  },
  amount: {
    fontFamily: 'FiraGO-Book',
    fontSize: 14,
    lineHeight: 17,
    color: Colors.black,
    marginLeft: 15,
  },
  itemLeft: {
    flexDirection: 'row',
  },
  accountDetail: {
    justifyContent: 'center',
  },
  imageContainer: {
    marginRight: 15,
    justifyContent: 'center',
  },
  image: {
    width: 20,
    height: 20,
  },
  accountNumber: {
    fontFamily: 'FiraGO-Book',
    fontSize: 14,
    lineHeight: 17,
    color: Colors.black,
  },
  ccyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ccy: {
    fontFamily: 'FiraGO-Book',
    fontSize: 10,
    lineHeight: 12,
    color: Colors.black,
  },
  placeholderItem: {
    paddingVertical: 9,
    color: Colors.black,
    textAlign: 'center'
  },
  placeholderText: {
    fontFamily: 'FiraGO-Book',
    fontSize: 14,
    lineHeight: 17,
    color: Colors.black,
  }
});
