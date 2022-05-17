import React, {useState} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
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

const GetGift: React.FC<ScreenNavigationProp> = props => {
  const [client, setClient] = useState<IBuyProductServiceResponse>();
  const params = props.route.params;
  let date = new Date().toString();
  const buyProduct = () => {
    const data: IBuyProductServiceResponse = {
      recipient_full_name: client?.recipient_full_name,
      recipient_personal_id: client?.recipient_personal_id,
      product_id: params.data.id,
      amount: parseInt(params.data.price, 10),
      delivery_method_id: '4',
      delivery_date: moment(date).format('DD/MM/YYYY'),
      recipient_phone: '', // დალოგინებული იუზერის ტელ ნომერი.
      tran_date: moment(date).format('DD/MM/YYYY'),
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
    <ScrollView style={styles.main}>
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
      <View style={styles.optionView}>
        <Text style={styles.optionTxt}>შეარჩიეთ მომსახურების ცენტრი</Text>
      </View>
      <TouchableOpacity style={styles.optionWrap}>
        <Text style={styles.optText}>აირჩიეთ</Text>
        <Image
          style={styles.arrow}
          source={require('../../assets/img/downArrow.png')}
        />
      </TouchableOpacity>
      <View style={styles.userInfoView}>
        <Text style={styles.userTxt}>უფლებამოსილი პირი:</Text>
        <Text style={styles.infoTxt}>
          იმისთვის, რომ თქვენ მიერ შერჩეული საჩუქარი სხვამ მიიღოს, გთხოვთ,
          მიუთითეთ უფლებამოსილი პირის მონაცემები
        </Text>
      </View>
      <View>
        <AppTextInput
          placeholder="სახელი"
          value={client?.recipient_full_name}
          onChange={e => {
            setClient({
              recipient_full_name: e,
              recipient_personal_id: client?.recipient_personal_id,
            });
          }}
        />
        <AppTextInput
          placeholder="გვარი"
          value={client?.recipient_personal_id}
          onChange={e => {
            setClient({
              recipient_full_name: client?.recipient_full_name,
              recipient_personal_id: e,
            });
          }}
        />
        <AppTextInput onChange={() => {}} placeholder="პირადი ნომერი" />
      </View>
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
    </ScrollView>
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
});

export default GetGift;
