import React from 'react';
import MessagesWrapper from '../../components/CostumComponents/MessagesWrapper';

import {ScreenNavigationProp} from '../../interfaces/commons';

import Colors from '../../theme/Colors';

const PasswordChangingMessage: React.FC<ScreenNavigationProp> = () => {
  const image = require('../../assets/img/doneIcon.png');
  return (
    <>
      <MessagesWrapper
        onPress={() => {}}
        title={'პაროლი წარმატებით შეიცვალა'}
        backgroundColor={Colors.bgGreen}
        image={image}
      />
    </>
  );
};

export default PasswordChangingMessage;
