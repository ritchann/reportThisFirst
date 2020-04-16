import React from 'react';
import { Line } from 'shared/base/line';
import { Icon, ImportedIcon } from 'shared/base/icon';

import './sidepanelItem.scss';

export interface Props {
  icon: ImportedIcon;
  isActive?: boolean;
}

export const SidepanelItem: React.FC<Props> = ({ icon, isActive }) => {
  return (
    <Line className={`sidepanel-item ${isActive ? 'active' : ''}`} alignItems="center">
      <Icon name={icon}></Icon>
    </Line>
  );
};
