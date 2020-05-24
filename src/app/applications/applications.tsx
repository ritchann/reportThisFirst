import React from 'react';
import { ApplicationsList } from 'app/applications/applicationsList';
import { FilterPanel } from 'app/applications/filterPanel';
import { Page } from 'shared/layout/page';

import { Toggle } from './toggle';

export const Applications: React.FC = () => {
  return <Page pageTitle={<Toggle />} pageContent={<ApplicationsList />} filterPanel={<FilterPanel />}></Page>;
};
