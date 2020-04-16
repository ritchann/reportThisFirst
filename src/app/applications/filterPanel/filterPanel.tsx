import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from 'core/store';
import { Line } from 'shared/base/line';
import { Block } from 'shared/base/block';
import { Checkbox } from 'shared/base/checkbox';
import { DateInputField } from 'shared/base/dateInputField';
import { SimpleSelectField } from 'shared/fields/SimpleSelectField';
import { status, priority } from 'app/common/translations';
import { Status, Priority } from 'data/enum';
import { FilterType } from 'data/event/model';
import { setFilter } from 'data/event/action';

import './filterPanel.scss';

export const FilterPanel: React.FC = () => {
  const dispatch = useDispatch();

  const filter = useSelector((state: StoreType) => state.event.filter);

  const onChangeFilter = useCallback(
    (field: keyof FilterType, value: boolean | Date | string) => {
      dispatch(setFilter({ ...filter, [field]: value }));
    }, [dispatch, filter]);

  return (
    <Line pr="4" mt="5" vertical className="filter-panel">
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
        <DateInputField value={filter.date}
          onChange={(v: Date) => onChangeFilter('date', v)}></DateInputField>
      </Block>
      <Block className="title" mt="2">
        Статус
      </Block>
      <Block mt="2">
        <SimpleSelectField
          addEmptyOption
          getLabel={x => x}
          name="Status"
          options={status}
          value={filter.status}
          onChange={(v: string) => onChangeFilter('status', v)}></SimpleSelectField>
      </Block>
      <Block className="title">Уровень</Block>
      <Block mt="2">
        <SimpleSelectField
          addEmptyOption
          getLabel={x => x}
          name="Priority"
          options={priority}
          value={filter.level}
          onChange={(v: string) => onChangeFilter('level', v)}></SimpleSelectField>
      </Block>
    </Line>
  );
};