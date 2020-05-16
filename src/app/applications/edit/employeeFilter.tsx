import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CancelButton, ApproveButton } from 'shared/components';
import { Modal, Line } from 'shared/base';
import { MultiselectField } from 'shared/fields';
import { setEmployeeFilter } from 'data/event/action';
import { type, schedule, experience, employement } from 'app/common/translations';
import { EmployeeFilterType } from 'data/event/model';
import { StoreType } from 'core/store';

import './employeeFilter.scss';

interface Props {
  onClose: () => void;
}

export const EmployeeFilter: React.FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch();

  const filter = useSelector((state: StoreType) => state.event.workersFilter);

  const [model, setModel] = useState<EmployeeFilterType>();

  const footer = (
    <>
      <CancelButton text="Сбросить" small onClick={() => dispatch(setEmployeeFilter({}))} />
      <ApproveButton
        text="Применить"
        small
        onClick={() => {
          dispatch(setEmployeeFilter(model));
          onClose();
        }}
      />
    </>
  );

  useEffect(() => setModel(filter), [filter]);

  return (
    <Modal onCancel={onClose} footer={footer} className="employee-filter" noHeight>
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
          onChange={(x) => setModel({ ...model, schedule: x?.length > 0 ? x : undefined })}></MultiselectField>
        <MultiselectField
          className="field"
          label="Стаж"
          value={model?.experience}
          options={experience}
          getLabel={(x: string) => x}
          getContent={(x) => experience.get(x) ?? ''}
          onChange={(x) => setModel({ ...model, experience: x?.length > 0 ? x : undefined })}></MultiselectField>
        <MultiselectField
          className="field"
          label="Занятость"
          value={model?.employement}
          options={employement}
          getLabel={(x: string) => x}
          getContent={(x) => employement.get(x) ?? ''}
          onChange={(x) => setModel({ ...model, employement: x?.length > 0 ? x : undefined })}></MultiselectField>
      </Line>
    </Modal>
  );
};
