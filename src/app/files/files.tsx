import React from 'react';
import { Line } from 'shared/base/line';

import { Archive } from './archive';
import { Filter } from './filter';

import './files.scss';

export const Files: React.FC = () => {
  return (
    <div className="files">
      <Line className="title">Плановые отключения</Line>
      <Line mt="4">
        <Archive></Archive>
        <Filter></Filter>
      </Line>
    </div>
  );
};