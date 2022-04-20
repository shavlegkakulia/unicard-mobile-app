import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Loader from '../../components/loader';
import {ScreenNavigationProp} from '../../interfaces/commons';
import CardService, {
  IgetBarcodeDetailsRequest,
  IgetBarcodeResponse,
} from '../../services/CardService';

const Barcode: React.FC<ScreenNavigationProp> = () => {
  const [cardInfo, setCardInfo] = useState<IgetBarcodeResponse>();
  const [loading, setLoading] = useState();
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
      error: err => {
        console.log(err.response);
      },
    });
  };
  useEffect(() => {
    getBarcode();
  }, []);
  return (
    <View style={styles.main}>
      {!loading && cardInfo ? (
        <>
          <View style={styles.barcodeNum}>
            <Text style={styles.num}>{cardInfo?.vcard}</Text>
          </View>
          <Image
            style={styles.img}
            source={require('../../assets/img/barcodeImg.png')}
          />
        </>
      ) : (
        <Loader visible={true} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  img: {
    width: 343,
    height: 704,
  },
  main: {
    alignItems: 'center',
    marginTop: 51,
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
});

export default Barcode;
