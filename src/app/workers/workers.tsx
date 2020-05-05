import React from 'react';
import classnames from 'classnames';
import { Line } from 'shared/base/line';
import { workers } from 'app/common/workersBase';
import { Card, EditButton, DeleteButton } from 'shared/components';
import { ServiceType } from 'data/enum';
import { Filter } from 'app/workers/filter';

import './workers.scss';

export const Workers: React.FC = () => {
  return (
    <Line className="workersPage">
      <Line className="workers-list" vertical>
        <Line className="header" justifyContent="between" alignItems="center">
          <Line className="title" pb="3">Рабочие</Line>
          <Line className="add">
            + Добавить
          </Line>
        </Line>
        <div className="cards-container">
          <Line vertical>
            {Object.keys(workers).map(key => {
              const worker = workers[key];
              return (
                <Card key={key} alignItems="center">
                  <Line className="info-container">
                    <Line alignItems="center">
                      <div className={classnames('label', {
                        gas: worker.type == ServiceType.Gas,
                        electricity: worker.type == ServiceType.Electricity,
                        water: worker.type == ServiceType.Water,
                        heat: worker.type == ServiceType.Heat
                      })}></div>
                      <div className="name">{worker.name}</div>
                    </Line>
                    <Line className="info"></Line>
                  </Line>
                  <Line vertical>
                    <EditButton small mb="2" />
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
  );
};
