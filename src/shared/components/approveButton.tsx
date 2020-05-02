import React from 'react';
import classNames from 'classnames';
import { Button } from 'shared/base/button';
import { propsToSpace, SpaceProps } from 'shared/base/utils/spaceUtil';

interface Props extends SpaceProps {
  onClick?: () => void;
  small?: boolean;
  text?: string;
}

export const ApproveButton: React.FC<Props> = ({ onClick, small, text, ...other }) => {
  const classes = classNames('approveButton btn-outline-primary button',
    propsToSpace(other),
    { 'btn-sm': small });
  return (
    <Button onClick={onClick} className={classes}>
      {text ?? 'Подтвердить'}
    </Button>
  );
};