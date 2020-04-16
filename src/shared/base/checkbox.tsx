import React, { useCallback } from 'react';
import classNames from 'classnames';
import './checkbox.scss';

import { Line } from './line';
import { Icon } from './icon';

export interface CheckboxProps {
  text?: string;
  className?: string;
  value?: boolean;
  onChange: (value: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ text, className, value, onChange }) => {

  const onChangeCallback = useCallback((v: boolean) => onChange(v), [onChange]);

  return (
    <Line alignItems="center" className={classNames('checkbox', { active: value })}>
      <Icon name={value ? 'check-square' : 'square'} prefix="far" onClick={() => onChange(!value)}></Icon>
      <div className={classNames('text', className)} onClick={() => onChange(!value)}>
        {text}
      </div>
    </Line>
  );
};
