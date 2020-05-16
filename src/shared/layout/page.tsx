import React from 'react';
import classnames from 'classnames';
import { Line } from 'shared/base';

import './page.scss';

type ComponentType = React.FunctionComponentElement<any>;

interface Props {
  pageTitle: ComponentType;
  pageContent: ComponentType;
  filterPanel: ComponentType;
  className?: string;
}

export const Page: React.FC<Props> = ({ pageTitle, pageContent, filterPanel, className }) => {
  return (
    <Line className={classnames('page-template', className)}>
      <Line vertical w="100">
        <Line className="title">{pageTitle}</Line>
        <Line>
          <Line className="page">{pageContent}</Line>
          <Line className="filter">{filterPanel}</Line>
        </Line>
      </Line>
    </Line>
  );
};
