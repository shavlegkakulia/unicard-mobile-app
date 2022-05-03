import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';
import AppButton from '../../components/CostumComponents/AppButton';
import AppTextInput from '../../components/CostumComponents/AppTextInput';
import {ScreenNavigationProp} from '../../interfaces/commons';
import {notAuthRoutes} from '../../navigation/routes';
import AuthService, {IAyuthData} from '../../services/AuthService';
import {login} from '../../Store/actions/auth';
import Colors from '../../theme/Colors';

interface IUserData {
  username?: string;
  password?: string;
}

const AuthScreen: React.FC<ScreenNavigationProp> = props => {
  const [userData, setUserData] = useState<IUserData>({
    username: 'levani1308@gmail.com',
    password: 'Abcd123!',
  });
  const dispatch = useDispatch();

  const LogIn = () => {
    if (!userData?.username || !userData?.password) {
      return;
    }
    const data: IAyuthData = {
      username: userData?.username,
      password: userData?.password,
    };
    AuthService.SignIn(data).subscribe({
      next: async Response => {
        if (Response.access_token) {
          await AuthService.setToken(
            Response.access_token,
            Response.refresh_token,
          );

          dispatch(login());
        }
      },
      complete: () => {
        console.log('complate');
      },
      error: e => console.log('err', e.response),
    });
  };

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <ScrollView>
      <View style={styles.titleView}>
        <Text style={styles.title}>ავტორიზაცია</Text>
      </View>
      <View style={styles.imgView}>
        <Image
          style={styles.img}
          source={require('../../assets/img/authScreenLogo.png')}
        />
      </View>
      <View style={styles.inputView}>
        <AppTextInput
          placeholder="ელ-ფოსტა"
          value={userData?.username}
          onChange={e =>
            setUserData({password: userData?.password, username: e})
          }
        />
        <AppTextInput
          placeholder="პაროლი"
          secureTextEntry={true}
          value={userData?.password}
          onChange={e =>
            setUserData({username: userData?.username, password: e})
          }
        />
        <View style={styles.checkBoxView}>
          <View style={styles.row}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(
                newValue: boolean | ((prevState: boolean) => boolean),
              ) => setToggleCheckBox(newValue)}
              style={styles.checkBox}
              onCheckColor={Colors.bgGreen}
              onTintColor={Colors.bgGreen}
            />
            <Text style={styles.text}>დამახსოვრება</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.text}>დაგავიწყდა პაროლი?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.button}>
        <AppButton
          onPress={LogIn}
          title={'შემდეგი'}
          backgroundColor={Colors.bgGreen}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  titleView: {
    alignItems: 'center',
    marginTop: 16,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.darkGrey,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 14.4,
  },
  imgView: {
    alignItems: 'center',
    marginTop: 33,
  },
  img: {
    width: 220,
    height: 306.78,
  },
  inputView: {
    alignItems: 'center',
  },
  checkBoxView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 325,
    marginTop: 32,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 14.4,
    color: Colors.darkGrey,
  },
  button: {
    marginTop: 95,
  },
});

export default AuthScreen;
