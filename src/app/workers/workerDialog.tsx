import React, { useMemo, useState } from 'react';
import { Modal, Line } from 'shared/base';
import { TextBoxField, SelectField } from 'shared/fields';
import { schedule, employement, experience, type } from 'app/common/translations';
import { ApproveButton, CancelButton } from 'shared/components';
import { Employee } from 'data/employee/model';

import './workerDialog.scss';

export interface Props {
  onClose: () => void;
  header: string;
  employee?: Employee;
}

export const WorkerDialog: React.FC<Props> = ({ onClose, header, employee }) => {
  const [model, setModel] = useState<Employee>(employee);

  const footer = useMemo(() => {
    return (
      <>
        <CancelButton small onClick={onClose} />
        <ApproveButton small />
      </>
    );
  }, [onClose]);

  return (
    <Modal
      header={header}
      size="lg"
      onCancel={onClose}
      className="workerDialog"
      footer={footer}>
      <Line justifyContent="between">
        <Line vertical className="left">
          <TextBoxField
            name="Lastname"
            value={model?.lastname}
            onChange={lastname => setModel({ ...model, lastname })}
            placeholder="Фамилия"></TextBoxField>
          <TextBoxField
            name="Patronymic"
            value={model?.patronymic}
            onChange={patronymic => setModel({ ...model, patronymic })}
            placeholder="Отчество"></TextBoxField>
          <SelectField
            label="Специализация"
            admitRemove
            value={model?.type}
            getLabel={x => x}
            options={type}
            name="Type"
            onChange={type => setModel({ ...model, type })}></SelectField>
          <SelectField
            className="experience"
            label="Стаж"
            admitRemove
            value={model?.experience}
            getLabel={x => x}
            options={experience}
            name="Experience"
            onChange={experience => setModel({ ...model, experience })}></SelectField>
        </Line>
        <Line vertical className="right">
          <TextBoxField
            name="Firstname"
            value={model?.firstname}
            onChange={firstname => setModel({ ...model, firstname })}
            placeholder="Имя"></TextBoxField>
          <TextBoxField
            name="Phone"
            value={model?.phone}
            onChange={phone => setModel({ ...model, phone })}
            placeholder="Телефон"></TextBoxField>
          <SelectField
            label="График"
            admitRemove
            value={model?.schedule}
            getLabel={x => x}
            options={schedule}
            name="Schedule"
            onChange={schedule => setModel({ ...model, schedule })}></SelectField>
          <SelectField
            className="employement"
            label="Занятость"
            admitRemove
            value={model?.employement}
            getLabel={x => x}
            options={employement}
            name="Employement"
            onChange={employement => setModel({ ...model, employement })}></SelectField>
        </Line>
      </Line>
    </Modal>
  );
};