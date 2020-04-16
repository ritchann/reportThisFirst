import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from 'shared/base/line';
import { Icon } from 'shared/base/icon';
import { setCurrentMode } from 'data/event/action';
import { StoreType } from 'core/store';
import { Visibility } from 'data/enum';

import './toggle.scss';

export const Toggle: React.FC = () => {
  const dispatch = useDispatch();
  
  const currentMode = useSelector((state: StoreType) => state.event.currentMode);

  const onToggleClick = useCallback((mode: Visibility) => {
    dispatch(setCurrentMode(mode));
  }, [dispatch]);

  return (
    <Line className="toggle">
      <div
        className={`new ${currentMode == Visibility.Pending ? 'active' : ''}`}
        onClick={() => onToggleClick(Visibility.Pending)}>
        <Icon prefix="far" name="arrow-alt-circle-up"></Icon> Новые
      </div>
      <div
        className={`approved ${currentMode == Visibility.Actual ? 'active' : ''}`}
        onClick={() => onToggleClick(Visibility.Actual)}>
        <Icon prefix="far" name="check-circle"></Icon> Подтвержденные
      </div>
    </Line>
  );
};
