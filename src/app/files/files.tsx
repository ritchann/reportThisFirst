import React from 'react';
import { Line } from 'shared/base/line';

import { DropZone } from './dropZone';
import { Archive } from './archive';
import { Filter } from './filter';

import './files.scss';

export const Files: React.FC = () => {
  return (
    <div className="files">
      <Line className="title">Плановые отключения</Line>
      <Line mt="4">
        <Line className="main-container" vertical>
          <DropZone />
          <Archive />
        </Line>
        <Filter></Filter>
      </Line>
    </div>
  );
};