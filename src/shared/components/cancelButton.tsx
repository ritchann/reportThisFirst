import React from 'react';
import classNames from 'classnames';
import { Button } from 'shared/base/button';
import { propsToSpace, SpaceProps } from 'shared/base/utils/spaceUtil';

interface Props extends SpaceProps {
  onClick?: () => void;
  small?: boolean;
}

export const CancelButton: React.FC<Props> = ({ onClick, small, ...other }) => {
  const classes = classNames('cancelButton btn-outline-secondary',
    propsToSpace(other),
    { 'btn-sm': small });
  return (
    <Button onClick={onClick} className={classes}>
      Отменить
    </Button>
  );
};