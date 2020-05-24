import React, { useMemo, useState, useCallback } from 'react';
import { Modal, Line } from 'shared/base';
import { TextBoxField, SelectField } from 'shared/fields';
import { schedule, employement, experience, type } from 'app/common/translations';
import { ApproveButton, CancelButton } from 'shared/components';
import { Employee } from 'data/employee/model';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from 'core/store';
import { setEmployees } from 'data/employee/action';
import { conformToMask } from 'react-text-mask';
import { empty } from 'shared/base/utils/emptyChecks';

import './employeeDialog.scss';

export interface Props {
  onClose: () => void;
  header: string;
  employee?: Employee;
}

const phoneMask = ['+', '7', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

export const EmployeeDialog: React.FC<Props> = ({ onClose, header, employee }) => {
  const dispatch = useDispatch();

  const [model, setModel] = useState<Employee>(employee);
  const [checkRequired, setCheckRequired] = useState(false);

  const employees = useSelector((state: StoreType) => state.employee.employees);

  const onChangePhone = useCallback(
    (phone: string) => {
      setModel({ ...model, phone: conformToMask(phone, phoneMask, { guide: false }).conformedValue });
    },
    [model]
  );

  const onApply = useCallback(() => {
    if (employee == null) {
      const newEmployee: Employee = { ...model, id: employees.length };
      dispatch(setEmployees([...employees, newEmployee]));
    } else {
      const index = employees.findIndex((x) => x.id == model.id);
      const newEmployees = [...employees.slice(0, index), { ...model }, ...employees.slice(index + 1)];
      dispatch(setEmployees(newEmployees));
    }
    onClose();
  }, [dispatch, employees, employee, model, onClose]);

  const notValid = useMemo(
    () => !model || empty(model.lastname) || empty(model.firstname) || empty(model.phone) || empty(model.profession),
    [model]
  );

  const footer = useMemo(() => {
    return (
      <>
        <CancelButton small onClick={onClose} />
        <ApproveButton small onClick={() => (notValid ? setCheckRequired(true) : onApply())} />
      </>
    );
  }, [onClose, onApply, notValid]);

  return (
    <Modal header={header} size="lg" onCancel={onClose} className="employee-dialog" footer={footer}>
      <Line justifyContent="between">
        <Line vertical className="left">
          <TextBoxField
            isInvalid={checkRequired && empty(model?.lastname)}
            name="Lastname"
            value={model?.lastname}
            onChange={(lastname) => setModel({ ...model, lastname })}
            placeholder="Фамилия"></TextBoxField>
          <TextBoxField
            name="Patronymic"
            value={model?.patronymic}
            onChange={(patronymic) => setModel({ ...model, patronymic })}
            placeholder="Отчество"></TextBoxField>
          <TextBoxField
            isInvalid={checkRequired && empty(model?.profession)}
            name="Profession"
            value={model?.profession}
            onChange={(profession) => setModel({ ...model, profession })}
            placeholder="Профессия"></TextBoxField>
          <SelectField
            label="Специализация"
            admitRemove
            value={model?.type}
            getLabel={(x) => x}
            options={type}
            name="Type"
            onChange={(type) => setModel({ ...model, type })}></SelectField>
          <SelectField
            className="experience"
            label="Стаж"
            admitRemove
            value={model?.experience}
            getLabel={(x) => x}
            options={experience}
            name="Experience"
            onChange={(experience) => setModel({ ...model, experience })}></SelectField>
        </Line>
        <Line vertical className="right">
          <TextBoxField
            isInvalid={checkRequired && empty(model?.firstname)}
            name="Firstname"
            value={model?.firstname}
            onChange={(firstname) => setModel({ ...model, firstname })}
            placeholder="Имя"></TextBoxField>
          <TextBoxField
            isInvalid={checkRequired && empty(model?.phone)}
            className="phone"
            name="Phone"
            value={model?.phone}
            onChange={onChangePhone}
            placeholder="+7"></TextBoxField>
          <SelectField
            label="График"
            admitRemove
            value={model?.schedule}
            getLabel={(x) => x}
            options={schedule}
            name="Schedule"
            onChange={(schedule) => setModel({ ...model, schedule })}></SelectField>
          <SelectField
            className="employement"
            label="Занятость"
            admitRemove
            value={model?.employement}
            getLabel={(x) => x}
            options={employement}
            name="Employement"
            onChange={(employement) => setModel({ ...model, employement })}></SelectField>
        </Line>
      </Line>
    </Modal>
  );
};
