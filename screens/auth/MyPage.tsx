import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, ScrollView, Image} from 'react-native';
import { useSelector } from 'react-redux';
import Loader from '../../components/loader';
import {ScreenNavigationProp} from '../../interfaces/commons';
import CardBalance, {
  IgetBalanceDetailsRequest,
  IgetBalanceResponse,
} from '../../services/CardBalanceService';
import TransactionService, {
  IgetProducteDetailsRequest,
  IgetTransactionsResponse,
} from '../../services/TransactionsListService';
import { ITranslateReducer, ITranslateState } from '../../Store/types/translate';
import Colors from '../../theme/Colors';

const MyPage: React.FC<ScreenNavigationProp> = () => {
  const translate = useSelector<ITranslateReducer>(state => state.TranslateReducer) as ITranslateState;

  const [balance, setBalance] = useState<IgetBalanceResponse>();
  const [transactions, setTransactions] =
    useState<IgetTransactionsResponse[]>();
  const getTransaction = () => {
    const req: IgetProducteDetailsRequest = {
      user_id: '',
      lang: '',
    };
    TransactionService.getTransactions(req).subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          setTransactions(Response.data.transactions);
        }
      },
      error: err => {
        console.log(err.response);
      },
    });
  };
  useEffect(() => {
    getTransaction();
  }, []);

  useEffect(() => {
    const balanceReq: IgetBalanceDetailsRequest = {
      user_id: '',
      lang: '',
    };
    CardBalance.GenerateBalance(balanceReq).subscribe({
      next: Response => {
        if (Response.data.resultCode === '200') {
          setBalance(Response.data);
        }
      },
      error: err => {
        console.log(err.response);
      },
    });
  }, []);

  return (
    <ScrollView>
      {balance && transactions ? (
        <>
          <View style={styles.border}>
            <View style={styles.titleView}>
              <Text style={styles.title}>{translate.t('myPage.currentBalance')}</Text>
              <View style={styles.amountView}>
                <Text style={styles.amount}>{balance?.scores_left}</Text>
                <Image
                  style={styles.icon}
                  source={require('../../assets/img/UniMark.png')}
                />
              </View>
              <View style={styles.detailView}>
                <View style={styles.borderView}>
                  <Text style={styles.detailTitle}>{translate.t('common.blocked')}</Text>
                  <View style={styles.row}>
                    <Text style={styles.detailAmount}>
                      {balance?.scores_blocked}
                    </Text>
                    <Image
                      style={styles.detailIcon}
                      source={require('../../assets/img/UniMark.png')}
                    />
                  </View>
                </View>
                <View style={styles.borderView}>
                  <Text style={styles.detailTitle}>{translate.t('common.spent')}</Text>
                  <View style={styles.row}>
                    <Text style={styles.detailAmount}>
                      {balance?.scores_spent}
                    </Text>
                    <Image
                      style={styles.detailIcon}
                      source={require('../../assets/img/UniMark.png')}
                    />
                  </View>
                </View>
                <View style={styles.last}>
                  <Text style={styles.detailTitle}>{translate.t('common.accumulated')}</Text>
                  <View style={styles.row}>
                    <Text style={styles.detailAmount}>
                      {balance?.scores_saved}
                    </Text>
                    <Image
                      style={styles.detailIcon}
                      source={require('../../assets/img/UniMark.png')}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.listMainView}>
            {transactions &&
              [...transactions]?.map(tr => (
                <View style={styles.listView} key={tr.organisation_id}>
                  <View>
                    <Text style={styles.name}>{tr.organisation_name}</Text>
                    <View style={styles.listIconView}>
                      <Image
                        style={styles.timeIcon}
                        source={require('../../assets/img/timeIcon.png')}
                      />
                      <Text style={styles.timeText}>{tr.date}</Text>
                    </View>
                    <View style={styles.listIconView}>
                      <Image
                        style={styles.pinIcon}
                        source={require('../../assets/img/pinGrey.png')}
                      />
                      <Text style={styles.addrsText}>
                        {translate.t('myPage.address1')}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.payAmount,
                        {
                          color:
                            tr.score && tr.score < 0
                              ? Colors.red
                              : Colors.bgGreen,
                        },
                      ]}>
                      {tr.score && tr.score > 0 ? `+${tr.score}` : tr.score}
                    </Text>
                  </View>
                </View>
              ))}
          </View>
        </>
      ) : (
        <Loader visible={true} />
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  border: {
    backgroundColor: Colors.white,
    shadowOffset: {width: 0, height: 11},
    shadowColor: Colors.bgGreen,
    shadowOpacity: 5,
    shadowRadius: 8,
  },
  titleView: {
    alignItems: 'center',
    marginTop: 40,
    marginHorizontal: 25,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.bgGreen,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 18,
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
    marginVertical: 43,
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
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 14.4,
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
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 24,
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
    marginTop: 29,
  },
  listView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 26,
  },
  name: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.darkGrey,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
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
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 14.4,
  },
  addrsText: {
    color: Colors.lightGreyTxt,
    fontSize: 10,
    fontFamily: 'BPG DejaVu Sans Mt',
    marginTop: 10,
    lineHeight: 12,
  },
  payAmount: {
    fontSize: 18,
    color: Colors.bgGreen,
  },
});

export default MyPage;
