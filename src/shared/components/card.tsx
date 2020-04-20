import React from 'react';
import classnames from 'classnames';
import { Line } from 'shared/base/line';

import "./card.scss";

interface Props {
  className?: string;
}

export const Card: React.FC<Props> = ({ className, children }) => {
  return (
    <Line className={classnames('card', className)}>
      {children}
    </Line>
  );
};