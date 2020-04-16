import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { ObjectSchema } from 'yup';

interface Props {
  name: string;
  value: string | null | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  schema?: ObjectSchema<any>;
  fieldPath?: string;
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto';
  type?: string;
  prepend?: JSX.Element;
}

export const TextBoxField: React.FC<Props> = ({
  name,
  value,
  type = 'text',
  onChange,
  placeholder,
  schema,
  fieldPath,
  size,
  children,
  prepend
}) => {
  value = value == null ? '' : value;
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

  const onchange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value), [onChange]);

  return (
    <div className={classNames('form-group', { [`col-md-${size}`]: size != null })}>
      {children && <label htmlFor={name}>{children}</label>}
      <div className="input-group">
        {prepend && (
          <div className="input-group-prepend">
            <div className="input-group-text">{prepend}</div>
          </div>
        )}
        <input
          type={type}
          className={classNames('form-control', { 'is-invalid': message })}
          id={name}
          name={name}
          placeholder={placeholder}
          onChange={onchange}
          value={value}
        />
      </div>
      <div className="invalid-feedback">{message}</div>
    </div>
  );
};
