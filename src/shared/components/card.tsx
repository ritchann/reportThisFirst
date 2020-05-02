import React from 'react';
import classnames from 'classnames';
import { Line } from 'shared/base/line';

import "./card.scss";

interface Props {
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<Props> = ({ className, children, onClick }) => {
  return (
    <Line className={classnames('card', className)} onClick={onClick}>
      {children}
    </Line>
  );
};