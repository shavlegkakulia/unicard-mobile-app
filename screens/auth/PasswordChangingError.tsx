import React from 'react';
import { useSelector } from 'react-redux';
import MessagesWrapper from '../../components/CostumComponents/MessagesWrapper';

import {ScreenNavigationProp} from '../../interfaces/commons';
import { ITranslateReducer, ITranslateState } from '../../Store/types/translate';

import Colors from '../../theme/Colors';

const PasswordChangingError: React.FC<ScreenNavigationProp> = () => {
  const translate = useSelector<ITranslateReducer>(state => state.TranslateReducer) as ITranslateState;

  const image = require('../../assets/img/error.png');
  return (
    <>
      <MessagesWrapper
        onPress={() => {}}
        title={translate.t('common.wentWrong')}
        backgroundColor={Colors.red}
        image={image}
      />
    </>
  );
};

export default PasswordChangingError;
