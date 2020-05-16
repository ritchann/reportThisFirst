import React from 'react';
import classnames from 'classnames';
import { Line } from 'shared/base/line';

import "./card.scss";

interface Props {
  className?: string;
  onClick?: () => void;
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around';
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'; 
}

export const Card: React.FC<Props> = ({ className, children, onClick, ...other }) => {
  return (
    <Line mb="3" className={classnames('card', className)} onClick={onClick} {...other}>
      {children}
    </Line>
  );
};