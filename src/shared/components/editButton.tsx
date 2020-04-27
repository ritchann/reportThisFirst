import React from 'react';
import classNames from 'classnames';
import { Button } from 'shared/base/button';
import { propsToSpace, SpaceProps } from 'shared/base/utils/spaceUtil';

interface Props extends SpaceProps {
  onClick?: () => void;
  small?: boolean;
  header?: string;
}

export const EditButton: React.FC<Props> = ({ onClick, small, header, ...other }) => {
  const classes = classNames('editButton btn-outline-success button',
    propsToSpace(other),
    { 'btn-sm': small });
  return (
    <Button onClick={onClick} className={classes}>
      {header ?? 'Изменить'}
    </Button>
  );
};