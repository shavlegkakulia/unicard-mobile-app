import React from 'react';
import MessagesWrapper from '../../components/CostumComponents/MessagesWrapper';

import {ScreenNavigationProp} from '../../interfaces/commons';

import Colors from '../../theme/Colors';

const PasswordChangingError: React.FC<ScreenNavigationProp> = () => {
  const image = require('../../assets/img/error.png');
  return (
    <>
      <MessagesWrapper
        onPress={() => {}}
        title={'დაფიქსირდა შეცდომა'}
        backgroundColor={Colors.red}
        image={image}
      />
    </>
  );
};

export default PasswordChangingError;
