import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Colors from '../theme/Colors';
import {authRoutes} from '../navigation/routes';
import navigation from '../navigation/navigation';
import {IgetNewsResponse} from '../services/NewsService';

const NewsCard: React.FC<IgetNewsResponse> = props => {
  const navigation = useNavigation();
    let imgUrl = '';
    if (props.image?.length) {
      imgUrl = props.image;
    }
  return (
    <TouchableOpacity
      style={styles.cardWrapper}
      onPress={navigation.navigate.bind(this, authRoutes.singleOffer, {
        id: props.id,
      })}>
      <Image style={styles.img} source={{uri: imgUrl}} />
      
      <View style={styles.wrap}>
        <Text style={styles.time}>{props.createDate}</Text>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.desc}>{props.description} </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    overflow: 'hidden',
    backgroundColor: Colors.white,
    width: 353,
    height: 97,
    borderRadius: 15,
    marginBottom: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  img: {
    width: 187,
  },
  wrap: {
    width: 155,
  },
  time: {
    color: Colors.bgGreen,
    fontSize: 10,
    marginBottom: 5,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 12,
  },
  title: {
    color: Colors.black,
    fontSize: 10,
    marginBottom: 5,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 15,
  },
  desc: {
    color: Colors.darkGrey,
    fontSize: 8,
    fontFamily: 'BPG DejaVu Sans',
    lineHeight: 15,
  },
});

export default NewsCard;
