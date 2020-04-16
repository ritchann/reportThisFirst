import React, { useCallback } from 'react';
import classNames from 'classnames';

interface Props<TOption extends object | string | number> {
    name: string;
    value: string | null | undefined;
    onChange: (value: string) => void;
    fieldPath?: string;
    options: Map<string, TOption>;
    getLabel: (option: TOption) => string;
    size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto';
    addEmptyOption?: boolean;
    children?: React.ReactChild;
    disabledOptions?: (key: string) => boolean;
}

export const SimpleSelectField = <TOption extends object | string | number>({
    name,
    value,
    onChange,
    options,
    getLabel,
    size,
    addEmptyOption = false,
    children,
    disabledOptions
}: Props<TOption>) => {
    value = value == null ? '' : value;

    const onchange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value), [onChange]);
    return (
        <div className={classNames('form-group', { [`col-md-${size}`]: size != null })}>
            {children && <label htmlFor={name}>{children}</label>}
            <select className="form-control" id={name} name={name} value={value} onChange={onchange}>
                {renderFirstOption(addEmptyOption, value)}
                {options != null &&
                    Array.from(options).map(([key, item]) => (
                        <option key={key} value={key} disabled={disabledOptions ? disabledOptions(key) : false}>
                            {getLabel(item)}
                        </option>
                    ))}
            </select>
        </div>
    );
};

const renderFirstOption = (addEmptyOption: boolean, value: string) => {
    if (addEmptyOption) return <option value="" />;
    if (value === '') return <option value="" disabled></option>;
    return undefined;
};
