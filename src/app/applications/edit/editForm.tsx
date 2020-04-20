import React from 'react';
import { Card } from 'shared/components';
import { Line } from 'shared/base';
import { TextBoxField, SelectField, DateInputField } from 'shared/fields';

import './editForm.scss';

export const EditForm: React.FC = () => {
  return (
    <Card className="editForm">
      <Line vertical className="fullStroke">
        <Line className="fullStroke">
          <TextBoxField
            className="description"
            name="description"
            value=""
            onChange={() => { }}>Описание</TextBoxField>
        </Line>
        <Line className="fullStroke" justifyContent="between">
          <SelectField
            className="field"
            label="Тип"
            options={new Map()}
            getLabel={x => x}
            onChange={() => { }}></SelectField>
          <SelectField
            className="field"
            label="Уровень"
            options={new Map()}
            getLabel={x => x}
            onChange={() => { }}></SelectField>
        </Line>
        <Line className="fullStroke" justifyContent="between" mt="2">
          <SelectField
            className="field"
            label="Статус"
            options={new Map()}
            getLabel={x => x}
            onChange={() => { }}></SelectField>
          <Line className="field" vertical>
            <div className="label">Заявка создана</div>
            <DateInputField
              value={new Date()}
              onChange={() => { }}
              disabled />
          </Line>
        </Line>
        <Line className="fullStroke" justifyContent="between">
          <Line className="field" vertical>
            <div className="label">Начало работы</div>
            <DateInputField
              value={new Date()}
              onChange={() => { }} />
          </Line>
          <Line className="field" vertical>
            <div className="label">Завершение работы</div>
            <DateInputField
              value={new Date()}
              onChange={() => { }} />
          </Line>
        </Line>
        <Line className="fullStroke" justifyContent="between">
          <Line className="field" vertical>
            <div className="label">Адрес</div>
            <TextBoxField name="region" value="" onChange={() => { }} placeholder="Район" />
          </Line>
          <Line className="field address" vertical>
            <TextBoxField name="house" value="" onChange={() => { }} placeholder="Дом" />
          </Line>
        </Line>
        <Line className="fullStroke" justifyContent="between" mt="1">
          <Line className="field" vertical>
            <TextBoxField name="street" value="" onChange={() => { }} placeholder="Улица" />
          </Line>
          <Line className="field" vertical>
            <TextBoxField name="apartment" value="" onChange={() => { }} placeholder="Квартира" />
          </Line>
        </Line>
        <Line className="fullStroke">
          <TextBoxField
            className="workers"
            name="workers"
            value=""
            placeholder="Выберите рабочих на панели справа"
            onChange={() => { }}>Рабочие</TextBoxField>
        </Line>
      </Line>
    </Card>
  );
};