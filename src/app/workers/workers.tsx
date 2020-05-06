import React, { useState } from 'react';
import classnames from 'classnames';
import { Line } from 'shared/base/line';
import { workers } from 'app/common/workersBase';
import { Card, EditButton, DeleteButton } from 'shared/components';
import { ServiceType } from 'data/enum';
import { Filter } from 'app/workers/filter';
import { Employee } from 'data/employee/model';

import { WorkerDialog } from './workerDialog';
import './workers.scss';

export const Workers: React.FC = () => {
  const [workerDialog, setWorkerDialog] = useState<{ show: boolean, employee?: Employee }>({ show: false });

  return (
    <>
      <Line className="workersPage">
        <Line className="workers-list" vertical>
          <Line className="header" justifyContent="between" alignItems="center">
            <Line className="title" pb="3">Рабочие</Line>
            <Line className="add" onClick={() => setWorkerDialog({ show: true })}>
              + Добавить
          </Line>
          </Line>
          <div className="cards-container">
            <Line vertical>
              {Object.keys(workers).map(key => {
                const worker = workers[key];
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
                      <DeleteButton small />
                    </Line>
                  </Card>
                );
              })}
            </Line>
          </div>
        </Line>
        <Filter />
      </Line>
      {workerDialog.show &&
        <WorkerDialog
          header="Добавление рабочего"
          employee={workerDialog.employee}
          onClose={() => setWorkerDialog({ show: false })} />}
    </>
  );
};
