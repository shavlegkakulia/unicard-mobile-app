import React from 'react';
import {Text, StyleSheet, View, ScrollView, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ScreenNavigationProp} from '../../interfaces/commons';
import Colors from '../../theme/Colors';

const MyPage: React.FC<ScreenNavigationProp> = () => {
  return (
    <ScrollView>
      <View style={styles.titleView}>
        <Text style={styles.title}>მიმდინარე ნაშთი</Text>
        <View style={styles.amountView}>
          <Text style={styles.amount}>862.4</Text>
          <Image
            style={styles.icon}
            source={require('../../assets/img/UniMark.png')}
          />
        </View>
        <View style={styles.detailView}>
          <View style={styles.borderView}>
            <Text style={styles.detailTitle}>დაბლოკილი</Text>
            <View style={styles.row}>
              <Text style={styles.detailAmount}>0</Text>
              <Image
                style={styles.detailIcon}
                source={require('../../assets/img/UniMark.png')}
              />
            </View>
            <Text />
          </View>
          <View style={styles.borderView}>
            <Text style={styles.detailTitle}>დახარჯული</Text>
            <View style={styles.row}>
              <Text style={styles.detailAmount}>1117.4</Text>
              <Image
                style={styles.detailIcon}
                source={require('../../assets/img/UniMark.png')}
              />
            </View>
            <Text />
          </View>
          <View style={styles.last}>
            <Text style={styles.detailTitle}>დაგროვებული</Text>
            <View style={styles.row}>
              <Text style={styles.detailAmount}>1979.8</Text>
              <Image
                style={styles.detailIcon}
                source={require('../../assets/img/UniMark.png')}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.linearView}>
        <LinearGradient
          style={styles.linear}
          colors={[Colors.gradiantDark, Colors.gradiantLight, Colors.bgColor]}
        />
      </View>
      <View style={styles.listMainView}>
        <View style={styles.listView}>
          <View>
            <Text style={styles.payUnicard}>Payunicard</Text>
            <View style={styles.listIconView}>
              <Image
                style={styles.timeIcon}
                source={require('../../assets/img/timeIcon.png')}
              />
              <Text style={styles.timeText}>გუშინ 14:16 11.67₾</Text>
            </View>
            <View style={styles.listIconView}>
              <Image
                style={styles.pinIcon}
                source={require('../../assets/img/pinGrey.png')}
              />
              <Text style={styles.addrsText}>ვაჟა-ფშაველას გამზირი #71</Text>
            </View>
          </View>
          <View>
            <Text>+1.1</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  titleView: {
    alignItems: 'center',
    marginTop: 40,
    marginHorizontal: 25,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.bgGreen,
    textTransform: 'uppercase',
  },
  amountView: {
    flexDirection: 'row',
  },
  amount: {
    fontSize: 45,
    fontWeight: 'bold',
    color: Colors.amountTxt,
  },
  icon: {
    width: 19.31,
    height: 19.31,
    marginTop: 9,
    marginLeft: 5,
  },
  detailView: {
    flexDirection: 'row',
    marginTop: 43,
  },
  row: {
    flexDirection: 'row',
    marginTop: 6,
  },
  borderView: {
    borderRightColor: Colors.bgGreen,
    borderRightWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  last: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  detailTitle: {
    fontSize: 12,
    fontWeight: '400',
    textTransform: 'uppercase',
    color: Colors.bgGreen,
  },
  detailIcon: {
    width: 11,
    height: 11,
    marginTop: 3,
    marginLeft: 3,
  },
  detailAmount: {
    fontSize: 20,
    color: Colors.amountTxt,
  },
  linearView: {
    width: '100%',
    marginTop: 43,
  },
  linear: {
    height: 20,
  },
  listMainView: {
    marginHorizontal: 25,
  },
  listView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  payUnicard: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.darkGrey,
    lineHeight: 17,
  },
  listIconView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIcon: {
    width: 11.71,
    height: 11.71,
    marginRight: 4,
  },
  pinIcon: {
    width: 8.78,
    height: 11.49,
    marginRight: 4,
  },
  timeText: {
      fontSize: 12,
      color: Colors.darkGrey,
      textTransform: 'uppercase',
  },
  addrsText: {
      color: Colors.lightGreyTxt,
      fontSize: 10,
      textTransform: 'uppercase',
  }
});

export default MyPage;
