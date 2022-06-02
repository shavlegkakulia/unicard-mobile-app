import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AppButton from '../../components/CostumComponents/AppButton';
import AppTextInput from '../../components/CostumComponents/AppTextInput';
// import Loader from '../../components/loader';
import {ScreenNavigationProp} from '../../interfaces/commons';
import {authRoutes} from '../../navigation/routes';
import BuyProductService, {
  IBuyProductServiceResponse,
} from '../../services/BuyProductService';
import Colors from '../../theme/Colors';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const GetGift: React.FC<ScreenNavigationProp> = props => {
  const [client, setClient] = useState<IBuyProductServiceResponse>();
  const [check, setCheck] = useState<boolean>(false);
  const [chekCount, setChekCount] = useState<number>(0);
  const params = props.route.params;
  const typeId = params.type;
  const utilityId = '8';
  let date = new Date().toString();

  //იუზერის ინფოს რომ წამოიღებს, ლოგიკა უნდა შეიცვალოს, თაგლი არაა საჭირო
  //თვალსაჩინოებისთვის იყოს
  const chackHandler = () => {
    setCheck(prev => !prev);
  };
  const buyProduct = () => {
    const data: IBuyProductServiceResponse = {
      recipient_full_name: `${client?.name}${' '}${client?.surname}`,
      recipient_personal_id: client?.recipient_personal_id,
      product_id: params.data.id,
      amount: parseInt(params.data.price, 10),
      delivery_method_id: '4',
      delivery_date: moment(date).format('DD/MM/YYYY'),
      recipient_phone: '', // დალოგინებული იუზერის ტელ ნომერი.
      tran_date: moment(date).format('DD/MM/YYYY'),
      discount_id: '0',
      guid: '',
      bonus_amount: '',
      quantity: '1', //gasarkvevia, unda daixatos tu ara appshi,
      service_center_id: '0',
      online_payment_identifier: '0',
      recipient_address: '',
      comment: '0',
      product_type: '0',
    };

    BuyProductService.GenerateProduct(data).subscribe({
      next: Response => {
        props.navigation.navigate(authRoutes.orderDone);
      },
      complete: () => {},
      error: err => {
        console.log('>>>', err);
      },
    });
  };
  return (
    <KeyboardAwareScrollView style={styles.main}>
      <View style={styles.imageView}>
        <View>
          <Image style={styles.img} source={params?.data?.images} />
        </View>

        <View style={styles.txtView}>
          <Text style={styles.txt}>{params?.data?.name}</Text>
          <View style={styles.markView}>
            <Text style={styles.amountTxt}>{params?.data?.price}</Text>
            <Image
              style={styles.mark}
              source={require('../../assets/img/UniMark.png')}
            />
          </View>
        </View>
      </View>
      {typeId === utilityId ? (
        <>
          <View style={styles.textView}>
            <Text style={styles.text}>შეიყვანეთ აბონენტის ნომერი</Text>
          </View>
          <KeyboardAvoidingView style={styles.row}>
            <View style={styles.inputView}>
              <TextInput style={styles.input} />
            </View>
            <TouchableOpacity style={styles.chekView} onPress={chackHandler}>
              <Text style={styles.chekTxt}>შემოწმება</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
          {check && (
            <View style={styles.clientMainView}>
              <View style={styles.clientInfoView}>
                <Text style={styles.clientInfo}>აბონენტის სახელი</Text>
                <Text style={styles.clientInfo}>თ.კ</Text>
              </View>
              <View style={styles.clientInfoView}>
                <Text style={styles.clientInfo}>აბონენტის მისამართი</Text>
                <View>
                  <Text style={styles.clientAddress}>
                    ასპინძის 1 ქ.013 2059, ბოლო რეგულარული დარიცხვის თარიღი:
                    20220427
                  </Text>
                </View>
              </View>
              <View style={styles.clientInfoView}>
                <Text style={styles.clientInfo}>დავალიანება</Text>
                <Text style={styles.clientInfo}>0</Text>
              </View>
              <View style={styles.clientInfoView}>
                <Text style={styles.clientInfo}>პროვაიდერის საკომისიო</Text>
                <Text style={styles.clientInfo}>0</Text>
              </View>
              <View style={styles.clientInfoView}>
                <Text style={styles.clientInfo}>ქულა</Text>
                <Text style={styles.clientInfo}>0</Text>
              </View>
            </View>
          )}

          <View style={styles.border} />
        </>
      ) : (
        <>
          <View style={styles.userInfoView}>
            <Text style={styles.userTxt}>უფლებამოსილი პირი:</Text>
            <Text style={styles.infoTxt}>
              იმისთვის, რომ თქვენ მიერ შერჩეული საჩუქარი სხვამ მიიღოს, გთხოვთ,
              მიუთითეთ უფლებამოსილი პირის მონაცემები
            </Text>
          </View>

          <AppTextInput
            placeholder="სახელი"
            value={client?.name}
            onChange={e => {
              setClient({
                name: e,
                recipient_personal_id: client?.recipient_personal_id,
                surname: client?.surname,
              });
            }}
          />

          <AppTextInput
            placeholder="გვარი"
            value={client?.surname}
            onChange={e => {
              setClient({
                name: client?.name,
                recipient_personal_id: client?.recipient_personal_id,
                surname: e,
              });
            }}
          />

          <AppTextInput
            placeholder="პირადი ნომერი"
            onChange={e => {
              setClient({
                name: client?.name,
                recipient_personal_id: e,
                surname: client?.surname,
              });
            }}
          />
        </>
      )}
      <View style={styles.totalView}>
        <Text style={styles.totalTxt}>
          საბოლოო ფასი:{' '}
          <Text style={styles.point}>{params?.data?.price} ქულა</Text>
        </Text>
      </View>
      <View style={styles.btnView}>
        <AppButton
          onPress={buyProduct}
          title={'საჩუქრის მიღება'}
          backgroundColor={Colors.bgGreen}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 35,
  },
  imageView: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  img: {
    width: 130.81,
    height: 90,
    borderRadius: 10,
  },
  txtView: {
    width: 180,
  },
  txt: {
    fontSize: 16,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 17.8,
    color: Colors.darkGrey,
  },
  amountTxt: {
    fontSize: 20,
    color: Colors.amountTxt,
    fontFamily: 'BPG DejaVu Sans Mt',
    fontWeight: 'bold',
  },
  mark: {
    width: 13,
    height: 13,
    marginLeft: 4,
  },
  markView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  optionView: {
    marginTop: 48,
  },
  optionTxt: {
    fontSize: 14,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16,
    color: Colors.darkGrey,
  },
  optionWrap: {
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optText: {
    color: Colors.bgGreen,
    fontSize: 14,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
  },
  arrow: {
    width: 16,
    height: 8.67,
  },
  userInfoView: {
    marginTop: 28,
  },
  userTxt: {
    fontSize: 14,
    color: Colors.darkGrey,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
  },
  infoTxt: {
    fontSize: 14,
    color: Colors.darkGrey,
    fontFamily: 'BPG DejaVu Sans',
    lineHeight: 16.8,
    marginTop: 15,
  },
  totalView: {
    alignItems: 'flex-end',
    marginTop: 19,
  },
  point: {
    color: Colors.orange,
  },
  totalTxt: {
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 19.2,
    color: Colors.darkGrey,
    fontSize: 16,
  },
  btnView: {
    marginTop: 69,
    marginBottom: 99,
  },
  textView: {
    marginTop: 41,
  },
  text: {
    fontSize: 14,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
    color: Colors.darkGrey,
  },
  inputView: {
    width: 164,
    height: 47,
    borderColor: Colors.switchGrey,
    borderRadius: 30,
    borderWidth: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 19,
  },
  chekView: {
    width: 144,
    height: 47,
    backgroundColor: Colors.bgGreen,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 47,
  },
  chekTxt: {
    fontSize: 14,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
    color: Colors.white,
    fontWeight: '700',
  },
  input: {
    fontSize: 16,
    color: Colors.darkGrey,
    fontFamily: 'BPG DejaVu Sans Mt',
  },
  border: {
    borderBottomColor: Colors.lightGreyTxt,
    borderBottomWidth: 1,
    marginTop: 36,
  },
  clientMainView: {
    marginTop: 20,
    marginBottom: 91,
  },
  clientInfoView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGreyTxt,
    paddingBottom: 11,
    paddingHorizontal: 10,
    marginTop: 11,
  },
  clientInfo: {
    alignSelf: 'flex-start',
    fontSize: 12,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.4,
    color: Colors.darkGrey,
  },
  clientAddress: {
    fontSize: 12,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.4,
    color: Colors.darkGrey,
    width: 136,
  },
});

export default GetGift;
