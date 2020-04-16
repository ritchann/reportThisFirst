import React from 'react';
import { ActionType } from 'data/actionTypes';
import { useLoader } from 'core/useLoader';
import { Line } from 'shared/base/line';
import { Block } from 'shared/base/block';
import { Button } from 'shared/base/button';

import { Spinner } from './spinner';

interface Props {
  actionType: ActionType;
  action: () => any;
  mod?: string;
}

export const RepeatPanel: React.FC<Props> = ({ actionType, action, mod = undefined, children }) => {
  const item = useLoader(actionType, mod);
  if (item && item.isWait)
    return (
      <Line justifyContent="center" alignItems="center">
        <Spinner />
        <Block inline ml="2">
          Загрузка...
        </Block>
      </Line>
    );
  if (item && item.isError) {
    return (
      <Line vertical justifyContent="center" alignItems="center">
        <div>Невозможно получить данные с сервера</div>
        <Button className="btn btn-primary btn-sm" onClick={action}>
          Повторить
        </Button>
      </Line>
    );
  }
  return <>{children}</>;
};
