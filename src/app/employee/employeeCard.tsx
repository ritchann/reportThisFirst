import React from 'react';
import classnames from 'classnames';
import { Employee } from 'data/employee/model';
import { Card, EditButton, DeleteButton } from 'shared/components';
import { Line } from 'shared/base';
import { ServiceType } from 'data/enum';
import { employement, schedule } from 'app/common/translations';

import './employeeCard.scss';

interface Props {
  model: Employee;
  openEditDialog: ({ show: boolean, employee: Employee }) => void;
  openDeleteDialog: ({ show: boolean, id: number }) => void;
}

export const EmployeeCard: React.FC<Props> = ({ model, openEditDialog, openDeleteDialog }) => {
  const header = (
    <Line alignItems="center">
      <div
        className={classnames('label', {
          gas: model.type == ServiceType.Gas,
          electricity: model.type == ServiceType.Electricity,
          water: model.type == ServiceType.Water,
          heat: model.type == ServiceType.Heat,
        })}></div>
      <div className="title bolder-text">{`${model.lastname ?? ''} ${model.firstname ?? ''} ${model.patronymic?? ''}`}</div>
    </Line>
  );

  return (
    <Card alignItems="center" className="employee-card">
      <Line className="card-body">
        <Line w="100" vertical>
          {header}
          <Line mt="3">
            <Line vertical mr="5">
              <div>
                Профессия:&nbsp;<span className="lighter-text">{model.profession}</span>
              </div>
              <Line mt="1">
                Телефон:&nbsp;<span className="lighter-text">{model.phone}</span>
              </Line>
            </Line>
            <Line vertical>
              <div className="lighter-text">{employement.get(model.employement)}</div>
              <Line mt="1" className="lighter-text">
                {schedule.get(model.schedule)}
              </Line>
            </Line>
          </Line>
        </Line>
        <Line vertical justifyContent="center">
          <EditButton small mb="2" onClick={() => openEditDialog({ show: true, employee: model })} />
          <DeleteButton small onClick={() => openDeleteDialog({ show: true, id: model.id })} />
        </Line>
      </Line>
    </Card>
  );
};
