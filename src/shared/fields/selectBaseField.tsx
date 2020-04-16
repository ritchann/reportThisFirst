import React, { useMemo, useState, useCallback, useRef } from 'react';
import classNames from 'classnames';
import { DropdownItem } from 'shared/base/dropdownItem';
import { Line } from 'shared/base/line';
import { Icon } from 'shared/base/icon';

import './selectBaseField.scss';

interface Props<TOption extends object | string | number> {
  label?: string;
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto';
  className?: string;
  value?: string | string[] | null;
  options: Map<string, TOption>;
  getLabel: (option: TOption) => string;
  multiselect?: boolean;
  onChange: (options: string | string[]) => void;
  showSearch?: boolean;
  disable?: boolean;
  disabledOptions?: (key: string) => boolean;
  admitEmptyOption?: boolean;
}

export const SelectBaseField = <TOption extends object | string | number>({
  label,
  size,
  className,
  value,
  options,
  getLabel,
  onChange,
  multiselect = false,
  showSearch = false,
  disable = false,
  disabledOptions,
  admitEmptyOption
}: Props<TOption>) => {
  if (multiselect && !Array.isArray(value)) {
    value = [];
  } else if (!value) {
    value = '';
  }

  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');

  const filter = useMemo(() => {
    const filter = new Map<string, TOption>();
    if (options) {
      options.forEach((option, key) => {
        if (
          getLabel(option)
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        )
          filter.set(key, option);
      });
    }
    return filter;
  }, [getLabel, inputValue, options]);

  const onSelectCallback = useCallback(
    (key: string) => {
      let newState = value;
      if (!multiselect) {
        const val = (value as string) ?? '';
        newState = val != key ? key : val;
      } else {
        const val = (value as string[]) ?? [];
        newState = val.includes(key) ? val.filter(x => x != key) : [...val, key];
      }
      onChange(newState);
      setInputValue('');
    },
    [multiselect, onChange, value]
  );

  const optionsDropdown = useMemo(() => {
    const list: JSX.Element[] = [];
    filter.forEach((option, key) => {
      list.push(
        <DropdownItem
          key={key}
          onClick={() => onSelectCallback(key)}
          className={classNames('item', {
            selected: !multiselect ? value == key : value?.includes(key)
          })}
          disabled={disabledOptions ? disabledOptions(key) : false}>
          {getLabel(option)}
        </DropdownItem>
      );
    });
    return list;
  }, [disabledOptions, filter, getLabel, multiselect, onSelectCallback, value]);

  const optionsBoxes = useMemo(() => {
    if (!multiselect) {
      const val = value as string;
      const option = options.get(val);
      return <div key={val}>{option ? getLabel(option) : ''}</div>;
    } else {
      const val = (value as string[]) ?? [];
      return val.map(x => {
        const option = options.get(x);
        return (
          <div key={x} className={classNames('box')}>
            {option ? getLabel(option) : ''}
            <Icon name="angle-right" className="icon" onClick={() => onSelectCallback(x)}></Icon>
          </div>
        );
      });
    }
  }, [getLabel, multiselect, onSelectCallback, options, value]);

  const focusHolder = useRef<any>(null);
  const activate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShow(true);
    if (!showSearch && !disable) focusHolder.current.focus();
  };
  const deactivate = () => setShow(false);

  return (
    <div className={classNames('multiselect', { [`col-md-${size}`]: size != null }, className)}>
      {label && <label className="label">{label}</label>}
      <div
        className={classNames('container form-control', {
          disable,
          active: !disable && show
        })}
        onMouseDown={disable ? undefined : activate}
        onBlur={deactivate}
        tabIndex={0}
        role="button"
        ref={focusHolder}>
        <Line justifyContent="between" alignItems="center" className="content">
          <Line wrap>{optionsBoxes}</Line>
          <div className="icons">
            {admitEmptyOption && (
              <div className="cross" onClick={() => onSelectCallback(' ')}>
                <Icon name="times" className="icon"></Icon>
              </div>
            )}
            {multiselect && options?.size > 0 && (
              <div
                className="cross"
                onClick={() => (value?.length != 0 ? onChange([]) : onChange(Array.from(options).map(([key]) => key)))}>
                {<Icon name={value?.length != 0 ? 'times' : 'arrow-right'} className="icon"></Icon>}
              </div>
            )}
            <Icon name="angle-down" className="icon"></Icon>
          </div>
        </Line>
        {show && (
          <div className="dropdown-container">
            <div className="dropdown" onClick={!multiselect ? deactivate : undefined}>
              {showSearch && (
                <Line
                  className="input-container"
                  justifyContent="between"
                  alignItems="center"
                  onClick={e => e.stopPropagation()}>
                  <input
                    className="input"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    autoFocus></input>
                  <Icon name="check-square" className="icon"></Icon>
                </Line>
              )}
              <div className="items">{optionsDropdown}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
