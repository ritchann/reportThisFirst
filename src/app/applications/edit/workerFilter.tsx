import React from 'react';
import { useDispatch } from 'react-redux';
import { CancelButton, ApproveButton } from 'shared/components';
import { Modal, Line } from 'shared/base';
import { SelectField } from 'shared/fields';
import { ServiceType } from 'data/enum';
import { setWorkersFilter } from 'data/event/action';

import './workerFilter.scss';

interface Props {
  onClose: () => void;
}

const typeOptions = new Map([
  [ServiceType.Electricity, 'Электричество'],
  [ServiceType.Gas, 'Газ'],
  [ServiceType.Water, 'Вода'],
  [ServiceType.Heat, 'Теплоснабжение']
]);

export const WorkerFilter: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch();

  const footer = (
    <>
      <CancelButton
        text="Сбросить"
        small
        onClick={() => dispatch(setWorkersFilter({ isApplied: false }))}
      />
      <ApproveButton
        text="Применить"
        small
        onClick={() => dispatch(setWorkersFilter({ isApplied: true }))}
      />
    </>
  );

  return (
    <Modal onCancel={onClose} footer={footer} size="lg" className="workerFilter" noHeight>
      <Line vertical>
        <SelectField
          className="field"
          label="Специализация"
          options={typeOptions}
          getLabel={x => x}
          onChange={() => { }}></SelectField>
        <SelectField
          className="field"
          label="График"
          options={typeOptions}
          getLabel={x => x}
          onChange={() => { }}></SelectField>
        <SelectField
          className="field"
          label="Стаж"
          options={typeOptions}
          getLabel={x => x}
          onChange={() => { }}></SelectField>
        <SelectField
          className="field"
          label="Занятость"
          options={typeOptions}
          getLabel={x => x}
          onChange={() => { }}></SelectField>
      </Line>
    </Modal>
  );
};