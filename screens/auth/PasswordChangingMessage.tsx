import React from 'react';
import {useSelector} from 'react-redux';
import MessagesWrapper from '../../components/CostumComponents/MessagesWrapper';

import {ScreenNavigationProp} from '../../interfaces/commons';
import {authRoutes} from '../../navigation/routes';
import {ITranslateReducer, ITranslateState} from '../../Store/types/translate';

import Colors from '../../theme/Colors';

const PasswordChangingMessage: React.FC<ScreenNavigationProp> = props => {
  const translate = useSelector<ITranslateReducer>(
    state => state.TranslateReducer,
  ) as ITranslateState;

  const image = require('../../assets/img/doneIcon.png');
  return (
    <>
      <MessagesWrapper
        onPress={() => {
          props.navigation.navigate(authRoutes.home);
        }}
        title={translate.t('settings.pwdChangeSucces')}
        backgroundColor={Colors.bgGreen}
        image={image}
      />
    </>
  );
};

export default PasswordChangingMessage;
