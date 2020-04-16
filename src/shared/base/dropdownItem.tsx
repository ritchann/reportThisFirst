import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import { LocationDescriptor } from 'history';

import './dropdownItem.scss';

interface Props extends React.HTMLAttributes<any> {
  tag?: React.ElementType;
  to?: LocationDescriptor;
  className?: string;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
}

export const DropdownItem: React.FC<Props> = ({ tag: Tag = 'a', className, onClick, children, disabled, ...other }) => {
  const classes = classNames('dropdown-item', className, { disabled });
  return (
    <Tag className={classes} onClick={onClick} {...other}>
      {children}
    </Tag>
  );
};
