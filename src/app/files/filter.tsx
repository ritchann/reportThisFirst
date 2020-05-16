import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from 'core/store';
import { Line, Block, Checkbox } from 'shared/base';
import { DateInputField } from 'shared/fields';
import { setFilter } from 'data/files/action';
import { FilterType } from 'data/files/model';

import 'app/common/filterPanel.scss';

export const Filter: React.FC = () => {
  const dispatch = useDispatch();

  const filter = useSelector((state: StoreType) => state.files.filter);

  const onChangeFilter = useCallback(
    (field: keyof FilterType, value: boolean | Date | string) => {
      dispatch(setFilter({ ...filter, [field]: value }));
    },
    [dispatch, filter]
  );

  return (
    <Line vertical className="filter-panel">
      <Block className="label">Фильтры</Block>
      <Checkbox
        className="label"
        text="Электричество"
        value={filter.isElectricity}
        onChange={(v: boolean) => onChangeFilter('isElectricity', v)}></Checkbox>
      <Checkbox
        className="label"
        text="Вода"
        value={filter.isWater}
        onChange={(v: boolean) => onChangeFilter('isWater', v)}></Checkbox>
      <Checkbox
        className="label"
        text="Газ"
        value={filter.isGas}
        onChange={(v: boolean) => onChangeFilter('isGas', v)}></Checkbox>
      <Checkbox
        className="label"
        text="Теплоснабжение"
        value={filter.isHeat}
        onChange={(v: boolean) => onChangeFilter('isHeat', v)}></Checkbox>
      <Block className="label" mt="4">
        Период
      </Block>
      <Block mt="2">
        <Line mb="2">
          <DateInputField
            value={filter.dateFrom}
            onChange={(v: Date) => onChangeFilter('dateFrom', v)}></DateInputField>
        </Line>
        <DateInputField value={filter.dateTo} onChange={(v: Date) => onChangeFilter('dateTo', v)}></DateInputField>
      </Block>
    </Line>
  );
};
