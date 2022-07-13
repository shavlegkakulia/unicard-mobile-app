import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {ICountry} from '../../../services/UserInfoService';
import Colors from '../../../theme/Colors';

interface IItemProps extends ICountry {
  isSelected?: boolean;
  style?: StyleProp<ViewStyle>;
  activeItemStyle?: StyleProp<ViewStyle>;
  disable?: boolean;
  placeholder?: string;
  isOptionList?: boolean;
}

export const CountryPlaceholder: React.FC<IItemProps> = ({
  placeholder,
  activeItemStyle,
}) => {
  console.log('activeItemStyle, placeholder', activeItemStyle, placeholder );
  return (
    <View style={[styles.item, styles.placeholderItem, activeItemStyle]}>
      {placeholder !== undefined ? (
        <Text style={styles.placeholderItem}>{placeholder}</Text>
      ) : null}
    </View>
  );
};

export const CountryItem: React.FC<IItemProps> = props => {
  if (!props.dialCode) {
    return <CountryPlaceholder {...props} placeholder={props.placeholder} />;
  } else {
    return (
      <View style={[styles.item, styles.placeholderItem]}>
        <Text style={styles.placeholderText}>
          {props.isOptionList ? props.countryName : `+${props.dialCode}`}
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  item: {
    // paddingHorizontal: 15,
    // paddingVertical: 14,
    marginTop: 35,
    // width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: 7,
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
    // paddingVertical: 4,
    textAlign: 'center',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 19.2,
    color: Colors.bgGreen,
    fontSize: 14,
    // borderBottomColor: Colors.darkGrey,
    // borderBottomWidth: 1,
  },
  placeholderText: {
    marginTop: 5,
    fontFamily: 'BPG DejaVu Sans Mt',
    fontSize: 14,
    lineHeight: 17,
    color: Colors.black,
  },
});
