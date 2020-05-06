import React, { useCallback } from 'react';
import { Line, Block, Checkbox } from 'shared/base';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from 'core/store';
import { SelectField } from 'shared/fields';
import { schedule, experience, employement } from 'app/common/translations';
import { FilterType } from 'data/employee/model';
import { setFilter } from 'data/employee/action';

import 'app/common/filterPanel.scss';
import './filter.scss';

export const Filter: React.FC = () => {
  const dispatch = useDispatch();

  const filter = useSelector((state: StoreType) => state.employee.filter);

  const onChangeFilter = useCallback(
    (field: keyof FilterType, value: boolean | Date | string) => {
      dispatch(setFilter({ ...filter, [field]: value }));
    }, [dispatch, filter]);

  return (
    <Line pr="4" vertical className="filter-panel workers-filter">
      <Block className="title" mt="2">
        Фильтры
      </Block>
      <Checkbox
        className="title"
        text="Электричество"
        value={filter?.isElectricity}
        onChange={v => onChangeFilter('isElectricity', v)}></Checkbox>
      <Checkbox
        className="title"
        text="Вода"
        value={filter?.isWater}
        onChange={v => onChangeFilter('isWater', v)}></Checkbox>
      <Checkbox
        className="title"
        text="Газ"
        value={filter?.isGas}
        onChange={v => onChangeFilter('isGas', v)}></Checkbox>
      <Checkbox
        className="title"
        text="Теплоснабжение"
        value={filter?.isHeat}
        onChange={v => onChangeFilter('isHeat', v)}></Checkbox>
      <Block className="title" mt="4">
        Стаж работы
      </Block>
      <Block mt="2">
        <SelectField
          value={filter?.experience}
          admitRemove
          getLabel={x => x}
          options={experience}
          name="Experience"
          onChange={v => onChangeFilter('experience', v)}></SelectField>
      </Block>
      <Block className="title" mt="3">
        Занятость
      </Block>
      <Block mt="2">
        <SelectField
          value={filter?.employement}
          admitRemove
          getLabel={x => x}
          options={employement}
          name="Employement"
          onChange={v => onChangeFilter('employement', v)}></SelectField>
      </Block>
      <Block className="title" mt="3">
        График
      </Block>
      <Block mt="2">
        <SelectField
          value={filter?.schedule}
          admitRemove
          getLabel={x => x}
          options={schedule}
          name="Schedule"
          onChange={v => onChangeFilter('schedule', v)}></SelectField>
      </Block>
    </Line>
  );
};
