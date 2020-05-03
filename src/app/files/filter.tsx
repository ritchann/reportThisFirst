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
    }, [dispatch, filter]);

  return (
    <Line pl="2" vertical className="filter-panel files-filters">
      <Block className="title" mt="2">
        Фильтры
      </Block>
      <Checkbox
        className="title"
        text="Электричество"
        value={filter.isElectricity}
        onChange={(v: boolean) => onChangeFilter('isElectricity', v)}></Checkbox>
      <Checkbox
        className="title"
        text="Вода"
        value={filter.isWater}
        onChange={(v: boolean) => onChangeFilter('isWater', v)}></Checkbox>
      <Checkbox
        className="title"
        text="Газ"
        value={filter.isGas}
        onChange={(v: boolean) => onChangeFilter('isGas', v)}></Checkbox>
      <Checkbox
        className="title"
        text="Теплоснабжение"
        value={filter.isHeat}
        onChange={(v: boolean) => onChangeFilter('isHeat', v)}></Checkbox>
      <Block mt="4">
        <DateInputField value={filter.dateFrom}
          onChange={(v: Date) => onChangeFilter('dateFrom', v)}></DateInputField>
        <DateInputField value={filter.dateTo}
          onChange={(v: Date) => onChangeFilter('dateTo', v)}></DateInputField>
      </Block>
    </Line>
  );
};