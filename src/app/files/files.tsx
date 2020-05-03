import React from 'react';
import { Line } from 'shared/base/line';

import { DropZone } from './dropZone';
import { Archive } from './archive';
import { Filter } from './filter';

import './files.scss';

export const Files: React.FC = () => {
  return (
    <Line className="files">
      <Line className="content" vertical>
        <Line className="title" pb="4">Плановые отключения</Line>
        <DropZone />
        <Archive />
      </Line>
      <Filter></Filter>
    </Line>
  );
};