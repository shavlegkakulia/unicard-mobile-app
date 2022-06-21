import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Loader from '../../components/loader';
import {ScreenNavigationProp} from '../../interfaces/commons';
import CardService, {
  IBarcodeRequestData,
  IBarcodeResponseData,
  IgetBarcodeDetailsRequest,
  IgetBarcodeResponse,
} from '../../services/CardService';
import Colors from '../../theme/Colors';

const Barcode: React.FC<ScreenNavigationProp> = () => {
  const [cardInfo, setCardInfo] = useState<IgetBarcodeResponse>();
  const [file, setFile] = useState<IBarcodeResponseData>();
  const [loading, setLoading] = useState<boolean>();
  let barcode = file?.barcode;
  const getBarcode = () => {
    const req: IgetBarcodeDetailsRequest = {
      user_id: '',
      lang: '',
    };
    CardService.GenerateBarcode(req).subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          setCardInfo(Response.data);
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
  useEffect(() => {
    getBarcode();
  }, []);

  const getBarcodeFile = () => {
    const data: IBarcodeRequestData = {
      input: cardInfo?.vcard,
    };
    CardService.GenerateBarcodeFile(data).subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          console.log('card', Response.data);
          setFile(Response.data);
        }
      },
      complete: () => {
        setLoading(false);
      },
      error: err => {
        console.log('>>>', err.response.data);
      },
    });
  };
  useEffect(() => {
    console.log('cardInfo', cardInfo);
    if (!loading && cardInfo?.vcard) {
      getBarcodeFile();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardInfo, loading]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={Colors.bgGreen} size={'small'} />
      </View>
    );
  }

  return (
    <View style={styles.main}>
      {!loading && cardInfo && (
        <>
          <View style={styles.barcodeImageView}>
            <Image
              resizeMode="cover"
              style={{
                width: 330,
                height: 50,
              }}
              source={{uri: `data:image/gif;base64,${barcode}`}}
            />
          </View>
          <View style={styles.barcodeNum}>
            <Text style={styles.num}>
              {!loading &&
                cardInfo?.vcard?.replace(
                  /\b(\d{4})(\d{4})(\d{4})(\d{4})\b/,
                  '$1  $2  $3  $4',
                )}
            </Text>
          </View>
          <Image
            style={styles.img}
            resizeMode={'contain'}
            source={require('../../assets/img/barcodeImg.png')}
          />
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  img: {
    width: 315,
    height: Dimensions.get('window').height - 150,
    maxHeight: 640,
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barcodeNum: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    transform: [{rotate: '90deg'}],
  },
  num: {
    fontSize: 24,
  },
  barcodeImageView: {
    position: 'absolute',
    top: 335,
    left: -90,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    transform: [{rotate: '90deg'}],
    backgroundColor: Colors.white,
    width: 400,
    height: 70,
    borderRadius: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgColor,
  },
});

export default Barcode;
