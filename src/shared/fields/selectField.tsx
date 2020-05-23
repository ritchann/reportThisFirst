import React, { useState, useEffect, ReactChild } from 'react';
import { ObjectSchema } from 'yup';

import { SelectBaseField } from './selectBaseField';

interface Props<TOption extends object | string | number> {
  getContent?: (option: TOption) => ReactChild;
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
  admitRemove?: boolean;
  inline?: boolean;
  withInput?: boolean;
  noWrap?: boolean;
}

export const SelectField = <TOption extends object | string | number>({
  getContent,
  options,
  getLabel,
  onChange,
  schema,
  fieldPath,
  value,
  showSearch,
  disable,
  disabledOptions,
  admitRemove,
  inline,
  withInput,
  noWrap,
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
        .catch((x) => {
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
        inline={inline}
        getContent={getContent}
        options={options}
        getLabel={getLabel}
        onChange={(options: string | string[]) => onChange(options as string)}
        value={value}
        showSearch={showSearch}
        disable={disable}
        disabledOptions={disabledOptions}
        admitRemove={admitRemove}
        withInput={withInput}
        noWrap={noWrap}
        {...other}></SelectBaseField>
      <div className="invalid-feedback">{message}</div>
    </>
  );
};
