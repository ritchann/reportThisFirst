import React, { CSSProperties } from 'react';
import classNames from 'classnames';

import { SpaceProps, propsToSpace } from './utils/spaceUtil';

interface Props extends SpaceProps, React.HTMLAttributes<any> {
  tag?: React.ElementType;
  className?: string;
  inline?: boolean;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export const Block: React.FC<Props> = ({ tag: Tag = 'div', className, inline, onClick, children, ...other }) => {
  const classes = classNames(inline ? 'd-inline' : 'd-block', propsToSpace(other), className);
  return (
    <Tag className={classes} onClick={onClick} {...other}>
      {children}
    </Tag>
  );
};
