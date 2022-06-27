import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from 'react-native';
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
import OnlinePaymentService, {
  IgetPaymentDetailsRequest,
  IgetPaymentResponse,
} from '../../services/OnlinePaymentService';
import {useSelector} from 'react-redux';
import {ITranslateReducer, ITranslateState} from '../../Store/types/translate';
import {IAuthReducer, IAuthState} from '../../Store/types/auth';

const GetGift: React.FC<ScreenNavigationProp> = props => {
  const authdata = useSelector<IAuthReducer>(
    state => state.AuthReducer,
  ) as IAuthState;

  const translate = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;
  const [client, setClient] = useState<IBuyProductServiceResponse>({
    name: authdata.userInfo?.name,
    surname: authdata.userInfo?.surname,
    recipient_personal_id: authdata.userInfo?.person_code,
    
  });
  const [paymentInfo, setPaymentInfo] = useState<IgetPaymentResponse[]>();
  const [error, setError] = useState<boolean>();
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [num, setNum] = useState('');
  const params = props.route.params;

  let typeId = params.type;
  let utilityId = '8';
  let payTypeId = '5';

  let date = new Date().toString();

  const getPayment = (goNext?: boolean) => {
    const req: IgetPaymentDetailsRequest = {
      user_id: '',
      subscriber_number: num,
      product_id: params.data.id,
      lang: '',
    };
    OnlinePaymentService.GeneratePaymentInfo(req).subscribe({
      next: Response => {
        setLoading(true);
        if (Response.data.resultCode === '200') {
          setPaymentInfo(Response.data.payment_info_list);
          setError(false);
          if (goNext === true) {
            buyProduct();
          }
        } else {
          setPaymentInfo(undefined);
          setError(true);
        }
      },
      complete: () => {
        setLoading(false);
      },
      error: err => {
        console.log(err.response);
      },
    });
  };
  const chackHandler = () => {
    getPayment();
  };

  const buyProduct = () => {
    let data: IBuyProductServiceResponse = {
      recipient_personal_id: client?.recipient_personal_id,
      product_id: params.data.id,
      amount: parseInt(params.data.price, 10),
      delivery_method_id: '4',
      delivery_date: moment(date).format('DD/MM/YYYY'),
      recipient_phone: '', // logined user tel number
      tran_date: moment(date).format('DD/MM/YYYY'),
      discount_id: '0',
      guid: '',
      bonus_amount: '0',
      quantity: '1', //gasarkvevia, unda daixatos tu ara appshi,
      service_center_id: '0',
      // online_payment_identifier: num,
      recipient_address: '',
      comment: '0',
      product_type: '0',
    };
    if (typeId === utilityId || typeId === payTypeId) {
      data = {
        ...data,
        online_payment_identifier: num,
      };
    } else {
      data = {
        ...data,
        recipient_full_name: `${client?.name}${' '}${client?.surname}`,
      };
      //
    }

    BuyProductService.GenerateProduct(data).subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          setIsMobile(false);
          props.navigation.navigate(authRoutes.orderDone);
        }
      },

      error: err => {
        console.log('>>>', err);
      },
    });
  };

  const errorHandler = () => {
    if (num.length === 0) {
      setError(false);
      setPaymentInfo(undefined);
    }
  };

  useEffect(() => {
    errorHandler();
  }, [num]);

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
      {typeId === utilityId || typeId === payTypeId ? (
        <>
          <View style={styles.textView}>
            <Text style={styles.text}>
              {translate.t('gift.setAbonentCode')}
            </Text>
          </View>
          <KeyboardAvoidingView style={styles.row}>
            <View
              style={
                typeId === payTypeId ? styles.inputViewPay : styles.inputView
              }>
              <TextInput
                style={styles.input}
                value={num}
                onChangeText={e => setNum(e)}
              />
            </View>
            {typeId === utilityId && (
              <TouchableOpacity style={styles.chekView} onPress={chackHandler}>
                {loading ? (
                  <ActivityIndicator color={Colors.white} size={'small'} />
                ) : (
                  <Text style={styles.chekTxt}>
                    {translate.t('common.check')}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </KeyboardAvoidingView>

          <View>
            {typeId === utilityId
              ? paymentInfo &&
                paymentInfo.map((e, i) => (
                  <View style={styles.clientInfoView} key={i}>
                    <Text style={styles.clientInfo}>{e.description}</Text>
                    <Text style={[styles.clientInfo, {textAlign: 'right'}]}>
                      {e.value?.length === 0 ? '---' : e.value}
                    </Text>
                  </View>
                ))
              : null}
          </View>
          {typeId === utilityId
            ? error && (
                <View style={styles.errWrapper}>
                  <Text style={styles.err}>
                    {translate.t('gift.abonentNotFound')}
                  </Text>
                </View>
              )
            : error && (
                <View style={styles.errWrapper}>
                  <Text style={styles.err}>
                    {translate.t('gift.incorrectNumber')}
                  </Text>
                </View>
              )}
          <View style={styles.border} />
        </>
      ) : (
        <>
          <View style={styles.userInfoView}>
            <Text style={styles.userTxt}>
              {translate.t('gift.allowedPerson')}
            </Text>
            <Text style={styles.infoTxt}>{translate.t('gift.desc')}</Text>
          </View>

          <AppTextInput
            placeholder={translate.t('common.name')}
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
            placeholder={translate.t('common.lname')}
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
            placeholder={translate.t('common.personalNumber')}
            value={client?.recipient_personal_id}
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
          {translate.t('gift.currentPrice')}{' '}
          <Text style={styles.point}>
            {params?.data?.price} {translate.t('common.score')}
          </Text>
        </Text>
      </View>
      {typeId === utilityId && error ? (
        <View style={styles.btnView}>
          <AppButton
            disabled={true}
            loading={loading}
            onPress={() => {}}
            title={translate.t('news.getGift')}
            backgroundColor={Colors.lightGreyTxt}
          />
        </View>
      ) : (
        <View style={styles.btnView}>
          <AppButton
            loading={loading}
            onPress={() => {
              

              if (isMobile === false) {
                console.log(isMobile);
                buyProduct();
              } else {
                getPayment(true);
              }
            }}
            title={translate.t('news.getGift')}
            backgroundColor={Colors.bgGreen}
          />
        </View>
      )}
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
  inputViewPay: {
    width: 200,
    height: 47,
    borderColor: Colors.switchGrey,
    borderRadius: 30,
    borderWidth: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
  // clientMainView: {
  //   marginTop: 20,
  //   marginBottom: 91,
  // },
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
    fontSize: 12,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.4,
    color: Colors.darkGrey,
    width: 136,
  },
  clientAddress: {
    fontSize: 12,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.4,
    color: Colors.darkGrey,
    width: 136,
  },
  err: {
    color: Colors.red,
  },
  errWrapper: {
    marginTop: 15,
    alignItems: 'center',
  },
});

export default GetGift;
