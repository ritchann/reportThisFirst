import React, { useState, useEffect } from 'react';
import { ObjectSchema } from 'yup';

import { SelectBaseField } from './selectBaseField';

interface Props<TOption extends object | string | number> {
  options: Map<string, TOption>;
  getLabel: (option: TOption) => string;
  onChange: (option: string) => void;
  label?: string;
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto';
  className?: string;
  value?: string | null;
  schema?: ObjectSchema<any>;
  fieldPath?: string;
  disabledOptions?: (key: string) => boolean;
  disable?: boolean;
  name?: string;
  showSearch?: boolean;
  admitEmptyOption?: boolean;
}

export const SelectField = <TOption extends object | string | number>({
  options,
  getLabel,
  onChange,
  schema,
  fieldPath,
  value,
  showSearch,
  disable,
  disabledOptions,
  admitEmptyOption,
  ...other
}: Props<TOption>) => {
  const [message, setMessage] = useState(null);
  useEffect(() => {
    let canceled = false;
    if (schema != null && fieldPath != null)
      schema
        .validateAt(fieldPath, value)
        .then(() => {
          if (!canceled) setMessage(null);
          return null;
        })
        .catch(x => {
          if (!canceled) setMessage(x.message);
          return null;
        });
    return () => {
      canceled = true;
    };
  });

  return (
    <>
      <SelectBaseField
        options={options}
        getLabel={getLabel}
        onChange={(options: string | string[]) => onChange(options as string)}
        value={value}
        showSearch={showSearch}
        disable={disable}
        disabledOptions={disabledOptions}
        admitEmptyOption={admitEmptyOption}
        {...other}></SelectBaseField>
      <div className="invalid-feedback">{message}</div>
    </>
  );
};
