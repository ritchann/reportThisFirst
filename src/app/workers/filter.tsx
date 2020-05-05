import React, { useCallback } from 'react';
import { Line, Block, Checkbox } from 'shared/base';
import {  SelectField } from 'shared/fields';
import { priority, status } from 'app/common/translations';

import 'app/common/filterPanel.scss';
import './filter.scss';

export const Filter: React.FC = () => {
  return (
    <Line pr="4" vertical className="filter-panel workers-filter">
      <Block className="title" mt="2">
        Фильтры
      </Block>
      <Checkbox
        className="title"
        text="Электричество"
        value={false}
        onChange={(v: boolean) => { }}></Checkbox>
      <Checkbox
        className="title"
        text="Вода"
        value={false}
        onChange={(v: boolean) => { }}></Checkbox>
      <Checkbox
        className="title"
        text="Газ"
        value={false}
        onChange={(v: boolean) => { }}></Checkbox>
      <Checkbox
        className="title"
        text="Теплоснабжение"
        value={false}
        onChange={(v: boolean) => { }}></Checkbox>
      <Block className="title" mt="1">
        Статус
      </Block>
      <Block mt="2">
        <SelectField
          admitRemove
          getLabel={(x) => x.toString()}
          options={status}
          name="Status"
          onChange={(v: string) => { }}></SelectField>
      </Block>
      <Block className="title" mt="3">
        Уровень
      </Block>
      <Block mt="2">
        <SelectField
          admitRemove
          getLabel={(x) => x.toString()}
          options={priority}
          name="Priority"
          onChange={(v: string) => { }}></SelectField>
      </Block>
    </Line>
  );
};
