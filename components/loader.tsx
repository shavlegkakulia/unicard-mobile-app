import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import Colors from '../theme/Colors';

const Loader = ({visible}: {visible: boolean}) => {
  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.container}>
        <ActivityIndicator size={'small'} color={Colors.bgGreen} />
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
});
