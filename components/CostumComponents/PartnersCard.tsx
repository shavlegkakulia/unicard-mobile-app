import React from 'react';
import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import Colors from '../../theme/Colors';

export interface IPartnersProps {
  name?: string;
  logo?: string;
}

const PartnersCard: React.FC<IPartnersProps> = props => {
  const {name, logo} = props;
  console.log(logo);
  return (
    <ScrollView style={styles.padding}>
<View style={styles.main}>
      <View style={styles.imgView}>
        <Image
          style={styles.logo}
          source={{
            uri: 'https://www.unicard.ge/static/wysiwygs/partnioroba.png',
          }}
        />
      </View>

      <Text style={styles.text}>{name}</Text>
    </View>
    </ScrollView>
    
  );
};
export default PartnersCard;

const styles = StyleSheet.create({
  padding: {
    paddingHorizontal: 42,
  },
  main: {
    flexDirection: 'row',
    marginTop: 45,
    alignItems: 'center',
    
  },
  imgView: {
   
    // shadowOffset: {width: 0, height: 11},
    // shadowColor: Colors.bgGreen,
    // shadowOpacity: 5,
    // shadowRadius: 8,
    // backgroundColor: Colors.white,
  },
  logo: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  text: {
    fontSize: 14,
    fontFamily: 'BPG DejaVu Sans Mt',
    lineHeight: 16.8,
    color: Colors.black,
    marginLeft: 16,
  }
});
