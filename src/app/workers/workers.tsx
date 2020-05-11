import React, { useState, useEffect, useCallback } from 'react';
import classnames from 'classnames';
import { Line } from 'shared/base/line';
import { workers } from 'app/common/workersBase';
import { Card, EditButton, DeleteButton, Pagination } from 'shared/components';
import { ServiceType } from 'data/enum';
import { Filter } from 'app/workers/filter';
import { Employee } from 'data/employee/model';
import { DeleteDialog } from 'app/workers/deleteDialog';
import { useSelector } from 'react-redux';
import { StoreType } from 'core/store';

import { WorkerDialog } from './workerDialog';
import './workers.scss';

export const Workers: React.FC = () => {
  const [employees, setEmployees] = useState<{ [key: number]: Employee }>({});
  const [workerDialog, setWorkerDialog] = useState<{ show: boolean, employee?: Employee }>({ show: false });
  const [deleteDialog, setDeleteDialog] = useState(false);

  const filter = useSelector((state: StoreType) => state.employee.filter);

  const onFilter = useCallback((employees: { [key: number]: Employee }) => {
    const types: string[] = [];
    if (filter.isElectricity) types.push(ServiceType.Electricity);
    if (filter.isGas) types.push(ServiceType.Gas);
    if (filter.isHeat) types.push(ServiceType.Heat);
    if (filter.isWater) types.push(ServiceType.Water);

    let newEmployees = { ...employees };
    if (filter.experience && filter.experience !== ' ') {
      for (let key in newEmployees) {
        if (newEmployees[key].experience !== filter.experience) delete newEmployees[key];
      }
    }
    if (filter.employement && filter.employement !== ' ') {
      for (let key in newEmployees) {
        if (newEmployees[key].employement !== filter.employement) delete newEmployees[key];
      }
    }
    if (filter.schedule && filter.schedule !== ' ') {
      for (let key in newEmployees) {
        if (newEmployees[key].schedule !== filter.schedule) delete newEmployees[key];
      }
    }
    if (types.length > 0) {
      for (let key in newEmployees) {
        if (!types.includes(newEmployees[key].type)) delete newEmployees[key];
      }
    }
    return newEmployees;
  }, [filter]);

  useEffect(() => {
    let result: { [key: number]: Employee } = { ...workers };
    let handledResult = onFilter(result);
    setEmployees(handledResult);
  }, [onFilter]);

  return (
    <>
      <Line className="workersPage">
        <Line className="workers-list" vertical>
          <Line className="header" justifyContent="between" alignItems="center">
            <Line className="title" pb="2">Рабочие</Line>
            <Line className="add" onClick={() => setWorkerDialog({ show: true })}>
              + Добавить
          </Line>
          </Line>
          <div className="cards-container">
            <Line vertical>
              {Object.keys(employees).map(key => {
                const worker = employees[key];
                return (
                  <Card key={key} alignItems="center">
                    <Line className="info-container" vertical>
                      <Line alignItems="center">
                        <div className={classnames('label', {
                          gas: worker.type == ServiceType.Gas,
                          electricity: worker.type == ServiceType.Electricity,
                          water: worker.type == ServiceType.Water,
                          heat: worker.type == ServiceType.Heat
                        })}></div>
                        <div className="name">{`${worker.lastname} ${worker.firstname} ${worker.patronymic}`}</div>
                      </Line>
                      <Line mt="3">
                        <Line vertical className="type">
                          <div>Профессия:&nbsp;<span className="lighter-text">{worker.profession}</span></div>
                          <Line mt="1">Телефон:&nbsp;<span className="lighter-text">+7 (999) 999-99-99</span></Line>
                        </Line>
                        <Line vertical className="schedule">
                          <div className="lighter-text">Полная занятость</div>
                          <Line mt="1" className="lighter-text">Сменный график</Line>
                        </Line>
                      </Line>
                    </Line>
                    <Line vertical>
                      <EditButton small mb="2" onClick={() => setWorkerDialog({ show: true, employee: worker })} />
                      <DeleteButton small onClick={() => setDeleteDialog(true)} />
                    </Line>
                  </Card>
                );
              })}
            </Line>
            <Pagination maxPages={1} />
          </div>
        </Line>
        <Filter />
      </Line>
      {workerDialog.show &&
        <WorkerDialog
          header={workerDialog.employee ? "Редактирование" : "Добавление рабочего"}
          employee={workerDialog.employee}
          onClose={() => setWorkerDialog({ show: false })} />}
      {deleteDialog && <DeleteDialog onClose={() => setDeleteDialog(false)} />}
    </>
  );
};
