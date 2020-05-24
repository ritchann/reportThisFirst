import React, { useMemo, useState, useCallback, useRef, ReactChild } from 'react';
import classNames from 'classnames';
import { DropdownItem } from 'shared/base/dropdownItem';
import { Line } from 'shared/base/line';
import { Icon } from 'shared/base/icon';
import { usePopper } from 'core/usePopper';

import './selectBaseField.scss';

interface Props<TOption extends object | string | number> {
  getContent?: (option: TOption) => ReactChild;
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
  admitRemove?: boolean;
  onRemove?: () => void;
  noWrap?: boolean;
  alwaysShow?: boolean;
  onDeactivated?: () => void;
  isCell?: boolean;
  inline?: boolean;
  dragAndDrop?: boolean;
  withInput?: boolean;
  onlyKeys?: boolean;
}

const maxBoxes = 2;

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
  admitRemove,
  onRemove,
  noWrap = false,
  alwaysShow = false,
  onDeactivated,
  isCell,
  getContent,
  inline,
  dragAndDrop = false,
  withInput = false,
  onlyKeys = true
}: Props<TOption>) => {
  if (multiselect && !Array.isArray(value)) {
    value = [];
  } else if (!value) {
    value = '';
  }

  const [show, setShow] = useState(alwaysShow);
  const [inputValue, setInputValue] = useState<string>('');
  const { reference, popper } = usePopper({
    onUpdate: (data) => {
      if (data.hide === true) {
        deactivate();
      }
    },
    positionFixed: true,
    placement: 'bottom-start',
    modifiers: {
      preventOverflow: { enabled: true, priority: ['left', 'right'], boundariesElement: 'scrollParent' },
      hide: {
        enabled: true,
      },
    },
  });

  const filter = useMemo(() => {
    const filter = new Map<string, TOption>();
    if (options) {
      options.forEach((option, key) => {
        if (getLabel(option).toLowerCase().includes(inputValue.toLowerCase())) filter.set(key, option);
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
        newState = val.includes(key) ? val.filter((x) => x != key) : [...val, key];
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
            selected: !multiselect ? value == key : value?.includes(key),
          })}
          disabled={disabledOptions ? disabledOptions(key) : false}>
          {getContent ? (
            <Line alignItems="center">
              {getContent(option)}
              {getLabel(option)}
            </Line>
          ) : (
            getLabel(option)
          )}
        </DropdownItem>
      );
    });
    return list;
  }, [disabledOptions, filter, getContent, getLabel, multiselect, onSelectCallback, value]);

  const [dnd, setDnd] = useState<{ from: string; to?: string }>();

  const onDropCallback = useCallback(
    (from: string, to?: string | undefined) => {
      if (to) {
        const val = (value as string[]) ?? [];
        const newState = new Array(...val);
        newState.splice(val.indexOf(from), 1);
        newState.splice(val.indexOf(to), 0, from);
        onChange(newState);
        setInputValue('');
      }
    },
    [onChange, value]
  );

  const optionsBoxes = useMemo(() => {
    if (!multiselect) {
      const val = value as string;
      const option = options.get(val);
      return (
        <div key={val}>
          {option ? (
            getContent ? (
              <Line alignItems="center">
                {getContent(option)}
                {getLabel(option)}
              </Line>
            ) : (
              getLabel(option)
            )
          ) : (
            ''
          )}
        </div>
      );
    } else {
      const val = (value as string[]) ?? [];
      let result = [...val];
      result = isCell && val.length > maxBoxes ? result.splice(0, maxBoxes) : result;
      return result.map((x) => {
        const option = options.get(x);
        return (
          <div
            draggable={dragAndDrop && multiselect && !disable}
            onDragStart={(e) => {
              e.stopPropagation();
              setDnd({ from: x });
            }}
            onDragEnd={() => setDnd(undefined)}
            onDragEnter={() => {
              if (dnd !== undefined && dnd.from !== x) setDnd({ ...dnd, to: x });
            }}
            onDragOver={(e) => {
              if (dnd !== undefined && dnd.from !== x) e.preventDefault();
            }}
            onDrop={() => {
              if (dnd !== undefined && dnd.from !== x) onDropCallback(dnd.from, dnd.to);
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            key={x}
            className={classNames('box', dnd?.to === x ? 'box-drag-over' : 'box-regular')}>
            {option ? (
              getContent ? (
                <Line alignItems="center">
                  {getContent(option)}
                  {getLabel(option)}
                </Line>
              ) : (
                <Line className="box-label">{onlyKeys ? x : getLabel(option)}</Line>
              )
            ) : (
              ''
            )}
            <div className={classNames('icon-display', { 'icon-hover': !disable })}>
              <Icon
                name="times"
                className="icon"
                onClick={() => {
                  if (!disable) onSelectCallback(x);
                }}></Icon>
            </div>
          </div>
        );
      });
    }
  }, [
    disable,
    dnd,
    dragAndDrop,
    getContent,
    getLabel,
    isCell,
    multiselect,
    onDropCallback,
    onSelectCallback,
    onlyKeys,
    options,
    value,
  ]);

  const focusHolder = useRef<any>(null);
  const timeoutRef = useRef<any>(null);
  const activate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTimeout(() => {
      setShow(true);
      clearTimeout(timeoutRef.current);
      if (!withInput && !showSearch && !disable) focusHolder.current.focus();
    });
  };
  const deactivate = () => {
    timeoutRef.current = setTimeout(() => {
      setShow(false);
      if (onDeactivated) onDeactivated();
    });
  };

  const countString =
    multiselect && isCell && value.length > maxBoxes ? `and ${value.length - maxBoxes} more` : undefined;

  return (
    <div className={classNames('multiselect', { [`col-md-${size}`]: size != null, ' inline': inline }, className)}>
      {label && <label className="label">{label}</label>}
      <div
        className={classNames('container form-control', {
          disable,
          active: !disable && show,
          cell: isCell,
        })}
        onMouseDown={disable ? undefined : activate}
        onBlurCapture={deactivate}
        tabIndex={0}
        role="button"
        ref={(e) => {
          if (!withInput) {
            focusHolder.current = e;
            reference.current = e;
          }
        }}>
        <Line justifyContent="between" alignItems="center" className={isCell ? 'content cell' : 'content'}>
          <Line w="100" wrap className={classNames({ 'word-hidden': noWrap, 'input-search': withInput })}>
            {!withInput ? (
              optionsBoxes
            ) : (
              <input
                className="input-search"
                type="text"
                value={value as string}
                onChange={(e) => onChange(e.target.value)}></input>
            )}
          </Line>
          <div className="icons">
            {admitRemove && !multiselect && (
              <div
                className={classNames('cross', {
                  cell: isCell,
                  'cross-enabled': !disable,
                })}
                style={isCell ? { borderRight: 'none' } : { borderRight: 'solid $light-grey 2px' }}
                onClick={disable ? () => {} : onRemove ? onRemove : () => onSelectCallback(' ')}>
                <Icon name="times" className="icon"></Icon>
              </div>
            )}
            {multiselect && options?.size > 0 && (
              <div
                className={classNames('cross', { 'cross-enabled': !disable, cell: isCell })}
                style={isCell ? { borderRight: 'none' } : { borderRight: 'solid $light-grey 2px' }}
                onClick={() => {
                  if (!disable) value?.length != 0 ? onChange([]) : onChange(Array.from(options).map(([key]) => key));
                }}>
                {<Icon name={value?.length != 0 ? 'times' : 'check'} className="icon"></Icon>}
              </div>
            )}
            {!isCell && <Icon name="angle-down" className="icon"></Icon>}
          </div>
        </Line>
        {show && (
          <div className="dropdown-container">
            <div ref={popper} className="dropdown" onClick={!multiselect ? deactivate : undefined}>
              {showSearch && (
                <Line
                  className="input-container"
                  justifyContent="between"
                  alignItems="center"
                  onClick={(e) => e.stopPropagation()}>
                  <input
                    className="input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    autoFocus></input>
                  <Icon name="search" className="icon"></Icon>
                </Line>
              )}
              <div onScroll={(e) => e.stopPropagation()} className="items">
                {optionsDropdown}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
