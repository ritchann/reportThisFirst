import React from 'react';
import classNames from 'classnames';
import { Button } from 'shared/base/button';
import { propsToSpace, SpaceProps } from 'shared/base/utils/spaceUtil';

interface Props extends SpaceProps {
  onClick?: () => void;
}

export const ApproveButton: React.FC<Props> = ({ onClick, ...other }) => {
  const classes = classNames('approveButton btn-outline-primary btn-sm button',
    propsToSpace(other));
  return (
    <Button onClick={onClick} className={classes}>
      Подтвердить
    </Button>
  );
};