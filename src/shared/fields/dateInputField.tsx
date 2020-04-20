import React, { createRef } from 'react';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
import TextMask, { conformToMask } from 'react-text-mask';
import { DateTime } from 'shared/base/utils/dateTime';

import './dateInputField.scss';

interface Props {
  value: Date | undefined;
  onChange: (value: Date) => any;
  placeholder?: string;
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto';
  prefix?: 'fas' | 'far';
  name?: string;
  shouldClosedOnSelect?: boolean;
  children?: React.ReactChild;
  disabled?: boolean;
  className?: string;
}

const convertFromDate = (value: Date, mask: (string | RegExp)[]) => {
  if (!value) return '__/__/____';
  const mm = (value.getMonth() + 1).toString();
  const dd = value.getDate().toString();

  const str = [mm.length === 2 ? '' : '0', mm, dd.length === 2 ? '' : '0', dd, value.getFullYear()].join('');

  return conformToMask(str, mask, { guide: false }).conformedValue;
};

const mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

export const DateInputField: React.FC<Props> = ({
  name,
  value,
  onChange,
  size,
  placeholder,
  shouldClosedOnSelect,
  children,
  disabled = false,
  className
}: Props) => {
  const inputRef = createRef<TextMask>();
  const datePickerRef = createRef<DatePicker>();

  return (
    <div className={classNames('form-group w-md-100 date-input-field', { [`col-md-${size}`]: size != null }, className)}>
      <DatePicker
        disabled={disabled}
        shouldCloseOnSelect={shouldClosedOnSelect}
        popperProps={{ positionFixed: true }}
        selected={value}
        onChange={onChange}
        ref={datePickerRef}
        dayClassName={date => {
          const d = DateTime.format(date, 'date');
          return classNames(
            { ['selectedCurrentDate']: value && d == DateTime.format(value, 'date') },
            { ['currentDate']: d == DateTime.format(new Date(), 'date') }
          );
        }}
        customInput={
          <div className="input-group">
            {children && (
              <div className="input-group-prepend">
                <label htmlFor={name} className="input-group-text">
                  {children}
                </label>
              </div>
            )}
            <TextMask
              disabled={disabled}
              placeholder={placeholder}
              className="form-control"
              type="text"
              value={value ? convertFromDate(value, mask) : ''}
              mask={mask}
              keepCharPositions={true}
              ref={inputRef}
            />
          </div>
        }
      />
    </div>
  );
};
