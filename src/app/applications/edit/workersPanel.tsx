import React from 'react';
import { Line, Icon } from 'shared/base';
import { Card } from 'shared/components';

import './workersPanel.scss';

const workers = [
  { name: 'Иванов Иван Иванович', type: 'Электрик' },
  { name: 'Иванов Иван Иванович', type: 'Электрик' },
  { name: 'Иванов Иван Иванович', type: 'Электрик' },
  { name: 'Иванов Иван Иванович', type: 'Электрик' },
  { name: 'Иванов Иван Иванович', type: 'Электрик' },
  { name: 'Иванов Иван Иванович', type: 'Электрик' }
];

export const WorkersPanel: React.FC = () => {
  return (
    <Line className="workersPanel" vertical>
      <Line className="title" justifyContent="between">
        <div className="label">Рабочие</div>
        <Icon name="filter"></Icon>
      </Line>
      <Line vertical>
        {workers.map((x, i) => {
          return (
            <Card key={i} className="workerCard">
              <Line className="fullSize" alignItems="center">
                <div className="label"></div>
                <Line vertical className="info">
                  <Line className="name">{x.name}</Line>
                  <Line className="type">{x.type}</Line>
                </Line>
                <Icon prefix="far" name="check-circle"></Icon>
              </Line>
            </Card>);
        })}
      </Line>
    </Line>
  );
};