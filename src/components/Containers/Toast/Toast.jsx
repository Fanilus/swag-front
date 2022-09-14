import React from 'react';
import useTimeout from '../../../hooks/useTimeout';
import { SwagToast, SwagToastText } from './styled';

export const Toast = (props) => {
  useTimeout(props.close, 3000);

  return (
    <SwagToast onClick={props.close}>
      <SwagToastText>{props.children}</SwagToastText>
    </SwagToast>
  );
};
