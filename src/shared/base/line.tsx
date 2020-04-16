import React from 'react';
import classNames from 'classnames';

import { SpaceProps, propsToSpace } from './utils/spaceUtil';

interface Props extends SpaceProps {
  tag?: React.ElementType;
  className?: string;
  vertical?: boolean;
  wrap?: boolean;
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around';
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  onClick?: (value: any) => any;
}

export const Line: React.FC<Props> = ({
  tag: Tag = 'div',
  className,
  vertical,
  justifyContent,
  alignItems,
  wrap,
  children,
  ...other
}) => {
  const classes = classNames(
    'd-md-flex',
    vertical ? 'flex-md-column' : 'flex-md-row',
    {
      [`justify-content-md-${justifyContent}`]: justifyContent != null,
      [`align-items-md-${alignItems}`]: alignItems != null,
      'flex-md-wrap': wrap
    },
    propsToSpace(other),
    className
  );
  return (
    <Tag className={classes} {...other}>
      {children}
    </Tag>
  );
};
