import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from 'core/store';
import { FilterType } from 'data/event/model';
import { setFilter } from 'data/event/action';
import { Line, Block, Checkbox } from 'shared/base';
import { DateInputField, SelectField } from 'shared/fields';
import { priority, status } from 'app/common/translations';

import 'app/common/filterPanel.scss';

export const FilterPanel: React.FC = () => {
  const dispatch = useDispatch();

  const filter = useSelector((state: StoreType) => state.event.filter);

  const onChangeFilter = useCallback(
    (field: keyof FilterType, value: boolean | Date | string) => {
      const v = value === ' ' ? undefined : value;
      dispatch(setFilter({ ...filter, [field]: v }));
    },
    [dispatch, filter]
  );

  return (
    <Line pr="4" vertical className="filter-panel">
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
      <Block className="title" mt="4">
        Дата
      </Block>
      <Block mt="2">
        <DateInputField value={filter.date} onChange={(v: Date) => onChangeFilter('date', v)}></DateInputField>
      </Block>
      <Block className="title" mt="1">
        Статус
      </Block>
      <Block mt="2">
        <SelectField
          admitRemove
          getLabel={(x) => x.toString()}
          options={status}
          value={filter.status}
          name="Status"
          onChange={(v: string) => onChangeFilter('status', v)}></SelectField>
      </Block>
      <Block className="title" mt="3">
        Уровень
      </Block>
      <Block mt="2">
        <SelectField
          admitRemove
          getLabel={(x) => x.toString()}
          options={priority}
          value={filter.level}
          name="Priority"
          onChange={(v: string) => onChangeFilter('level', v)}></SelectField>
      </Block>
    </Line>
  );
};
