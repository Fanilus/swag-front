import React from 'react';
import { StyledInfoMessage } from './styled';

const InfoMessage = ({ message, color }) => {
  return <StyledInfoMessage color={color}>{message}</StyledInfoMessage>;
};

export default InfoMessage;
