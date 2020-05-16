import React from 'react';
import { Page } from 'shared/layout';
import { Line } from 'shared/base';

import { DropZone } from './dropZone';
import { Archive } from './archive';
import { Filter } from './filter';

export const Files: React.FC = () => {
  return (
    <Page
      pageTitle={<div>Плановые отключения</div>}
      pageContent={
        <Line vertical w="100">
          <DropZone />
          <Archive />
        </Line>
      }
      filterPanel={<Filter />}></Page>
  );
};
