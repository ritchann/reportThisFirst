import React from 'react';
import { Line } from 'shared/base/line';

import "./card.scss";

export const Card: React.FC = ({ children }) => {
  return (
    <Line className="card">
      {children}
    </Line>
  );
};