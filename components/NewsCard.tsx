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
      onPress={navigation.navigate.bind(this, authRoutes.singleNewsScreen, {
        id: props.id,
      })}>
      <Image style={styles.img} resizeMode={'cover'} source={{uri: imgUrl}} />
      
      <Text style={styles.wrap} numberOfLines={5}>
        <Text style={styles.time}>{props.createDate}{'\n'}</Text>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.desc}>{props.description} </Text>
      </Text>
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
    //paddingVertical: 10,
    paddingRight: 10
},
  img: {
    width: 187,
    marginRight: 10
  },
  wrap: {
    width: 155,
    paddingVertical: 10,
    lineHeight: 12,
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
