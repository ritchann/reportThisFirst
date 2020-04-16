import React from 'react';
import { Line } from 'shared/base/line';
import { ApplicationsList } from 'app/applications/applicationsList';
import { FilterPanel } from 'app/applications/filterPanel/filterPanel';

export const Applications: React.FC = () => {
  return (
    <Line mt="4">
      <ApplicationsList />
      <FilterPanel />
    </Line>
  );
};