import React from 'react';
import { ActionType } from 'data/actionTypes';
import { Button, ButtonProps } from 'shared/base/button';
import { useLoader } from 'core/useLoader';

import { Spinner } from './spinner';

interface Props extends ButtonProps {
  actionType: ActionType;
  mod?: string;
  disabled?: boolean;
}

export const LoadingButton: React.FC<Props> = ({ actionType, mod = undefined, children, ...other }) => {
  const item = useLoader(actionType, mod);
  const content = item && item.isWait ? <Spinner small /> : children;
  return <Button {...other}>{content}</Button>;
};
