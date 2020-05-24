import React, { useCallback } from 'react';
import { Line, Block, Checkbox } from 'shared/base';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from 'core/store';
import { SelectField } from 'shared/fields';
import { schedule, experience, employement } from 'app/common/translations';
import { FilterType } from 'data/employee/model';
import { setFilter } from 'data/employee/action';

import 'app/common/filterPanel.scss';

export const Filter: React.FC = () => {
  const dispatch = useDispatch();

  const filter = useSelector((state: StoreType) => state.employee.filter);

  const onChangeFilter = useCallback(
    (field: keyof FilterType, value: boolean | Date | string) => {
      dispatch(setFilter({ ...filter, [field]: value }));
    }, [dispatch, filter]);

  return (
    <Line vertical className="filter-panel">
      <Block className="label">
        Фильтры
      </Block>
      <Checkbox
        className="label"
        text="Электричество"
        value={filter?.isElectricity}
        onChange={v => onChangeFilter('isElectricity', v)}></Checkbox>
      <Checkbox
        className="label"
        text="Вода"
        value={filter?.isWater}
        onChange={v => onChangeFilter('isWater', v)}></Checkbox>
      <Checkbox
        className="label"
        text="Газ"
        value={filter?.isGas}
        onChange={v => onChangeFilter('isGas', v)}></Checkbox>
      <Checkbox
        className="label"
        text="Теплоснабжение"
        value={filter?.isHeat}
        onChange={v => onChangeFilter('isHeat', v)}></Checkbox>
      <Block className="label" mt="4">
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
      <Block className="label" mt="3">
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
      <Block className="label" mt="3">
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
