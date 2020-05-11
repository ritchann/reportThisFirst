import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CancelButton, ApproveButton } from 'shared/components';
import { Modal, Line } from 'shared/base';
import { MultiselectField } from 'shared/fields';
import { setWorkersFilter } from 'data/event/action';
import { type, schedule, experience, employement } from 'app/common/translations';
import { WorkerFilterType } from 'data/event/model';

import './workerFilter.scss';

interface Props {
  onClose: () => void;
}

export const WorkerFilter: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch();

  const [model, setModel] = useState<WorkerFilterType>();

  const footer = (
    <>
      <CancelButton text="Сбросить" small onClick={() => dispatch(setWorkersFilter({ isApplied: false }))} />
      <ApproveButton text="Применить" small onClick={() => dispatch(setWorkersFilter({ isApplied: true }))} />
    </>
  );

  return (
    <Modal onCancel={onClose} footer={footer} className="workerFilter" noHeight>
      <Line vertical>
        <MultiselectField
          className="field"
          label="Специализация"
          value={model?.type}
          options={type}
          getLabel={(x: string) => x}
          getContent={(x) => type.get(x) ?? ''}
          onChange={(type: string[]) => setModel({ ...model, type })}></MultiselectField>
        <MultiselectField
          className="field"
          label="График"
          value={model?.schedule}
          options={schedule}
          getLabel={(x: string) => x}
          getContent={(x) => schedule.get(x) ?? ''}
          onChange={(schedule: string[]) => setModel({ ...model, schedule })}></MultiselectField>
        <MultiselectField
          className="field"
          label="Стаж"
          value={model?.experience}
          options={experience}
          getLabel={(x: string) => x}
          getContent={(x) => experience.get(x) ?? ''}
          onChange={(experience: string[]) => setModel({ ...model, experience })}></MultiselectField>
        <MultiselectField
          className="field"
          label="Занятость"
          value={model?.employement}
          options={employement}
          getLabel={(x: string) => x}
          getContent={(x) => employement.get(x) ?? ''}
          onChange={(employement: string[]) => setModel({ ...model, employement })}></MultiselectField>
      </Line>
    </Modal>
  );
};
