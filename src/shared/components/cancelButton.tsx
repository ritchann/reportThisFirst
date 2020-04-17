import React from 'react';
import classNames from 'classnames';
import { Button } from 'shared/base/button';
import { propsToSpace, SpaceProps } from 'shared/base/utils/spaceUtil';

interface Props extends SpaceProps {
  onClick?: () => void;
}

export const CancelButton: React.FC<Props> = ({ onClick, ...other }) => {
  const classes = classNames('cancelButton btn-outline-secondary btn-sm',
    propsToSpace(other));
  return (
    <Button onClick={onClick} className={classes}>
      Отменить
    </Button>
  );
};