import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Colors from '../../theme/Colors';
import {authRoutes} from '../navigation/routes';
import navigation from '../navigation/navigation';
import {IgetNewsResponse} from '../services/NewsService';
import UserInfoService, {
  IgetUserInfoDetailsRequest,
  IgetUserServiceResponse,
} from '../../services/UserInfoService';
import {ScrollView} from 'react-native-gesture-handler';

const ChangePinCode: React.FC<IgetNewsResponse> = props => {
  const navigation = useNavigation();
  const [user, setUser] = useState<IgetUserServiceResponse>();

  const getUserInfo = () => {
    const req: IgetUserInfoDetailsRequest = {
      user_id: '',
      lang: '',
    };
    UserInfoService.GenerateUserInfo(req).subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          setUser(Response.data);
        }
      },
      error: err => {
        console.log(err.response);
      },
    });
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <ScrollView>
      <View style={styles.titleView}>
        <Text style={styles.title}>პინ-კოდის ცვლილება</Text>
      </View>
      <View style={styles.avatarView}>
        <Image
          style={styles.avatar}
          source={require('../../assets/img/avatar.png')}
        />
        <Text style={styles.name}>
          {user?.name} {user?.surname}
        </Text>
      </View>
      <View style={styles.dotCenter}>
        <View style={styles.dotsView}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
      <View style={styles.numbersMainView}>
        <View style={styles.numberView}>
          <TouchableOpacity style={styles.number}>
            <Text style={styles.numberTxt}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.number}>
            <Text style={styles.numberTxt}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.number}>
            <Text style={styles.numberTxt}>3</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.numberView}>
          <TouchableOpacity style={styles.number}>
            <Text style={styles.numberTxt}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.number}>
            <Text style={styles.numberTxt}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.number}>
            <Text style={styles.numberTxt}>6</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.numberView}>
          <TouchableOpacity style={styles.number}>
            <Text style={styles.numberTxt}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.number}>
            <Text style={styles.numberTxt}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.number}>
            <Text style={styles.numberTxt}>9</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.numberView}>
          <TouchableOpacity style={styles.number}>
            <Image
              style={styles.face}
              source={require('../../assets/img/face.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.number}>
            <Text style={styles.numberTxt}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.number}>
            <Text style={styles.numberTxtDelete}>წაშლა</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  titleView: {
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    color: Colors.bgGreen,
    fontFamily: 'BPG DejaVu Sans Mt',
    fontWeight: '700',
    lineHeight: 24,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 50,
    marginTop: 41,
  },
  avatarView: {
    alignItems: 'center',
  },
  name: {
    marginTop: 12,
    fontSize: 18,
    lineHeight: 21.6,
    color: Colors.black,
    fontFamily: 'BPG DejaVu Sans Mt',
  },
  dotsView: {
    flexDirection: 'row',
    width: 88,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: Colors.cancelBtnCol,
  },
  dotCenter: {
    alignItems: 'center',
    marginTop: 80,
  },
  numbersMainView: {
    alignItems: 'center',
    marginTop: 80,
    height: 360,
    justifyContent: 'space-between',
    marginBottom: 59,
  },
  numberView: {
    width: 280,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  number: {
    width: 72,
    height: 72,
    borderRadius: 50,
    backgroundColor: Colors.buttonGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberTxt: {
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 28.8,
    color: Colors.black,
  },
  numberTxtDelete: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
  },
  face: {
    width: 32,
    height: 32,
  },
});

export default ChangePinCode;
