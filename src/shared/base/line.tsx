import React from 'react';
import classNames from 'classnames';

import { SpaceProps, propsToSpace } from './utils/spaceUtil';
import { SizeProps, propsToSize } from './utils/sizeUtil';

interface Props extends SpaceProps, SizeProps {
  tag?: React.ElementType;
  className?: string;
  vertical?: boolean;
  wrap?: boolean;
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around';
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  onClick?: (value: any) => any;
  draggable?: boolean;
  onDragOver?: (e: any) => void;
  onDragLeave?: (e: any) => void;
  onDrop?: (e: any) => void;
  onDragStart?: (e: any) => void;
  onDragEnd?: (e: any) => void;
  onDragEnter?: (e: any) => void;
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
      'flex-md-wrap': wrap,
    },
    propsToSpace(other),
    propsToSize(other),
    className
  );
  return (
    <Tag className={classes} {...other}>
      {children}
    </Tag>
  );
};
