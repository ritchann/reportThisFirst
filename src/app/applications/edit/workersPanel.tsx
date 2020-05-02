import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from 'core/store';
import classnames from "classnames";
import { Line, Icon } from 'shared/base';
import { Card } from 'shared/components';
import { ServiceType } from 'data/enum';

import { WorkerFilter } from './workerFilter';
import './workersPanel.scss';

type Worker = { name: string, profession: string, type: string, checked: boolean };

const workers = {
  0: { name: 'Иванов Иван Иванович', profession: 'Электрик', type: ServiceType.Electricity, checked: true },
  1: { name: 'Сергеев Сергей Сергеевич', profession: 'Сварщик', type: ServiceType.Gas, checked: false },
  2: { name: 'Петров Петр Петрович', profession: 'Сантехник', type: ServiceType.Water, checked: false },
  3: { name: 'Александров Александр Александрович', profession: 'Электрик', type: ServiceType.Electricity, checked: false },
  4: { name: 'Николаев Николай Николаевич', profession: 'Сантехник', type: ServiceType.Water, checked: false },
  5: { name: 'Артемов Артем Артемович', profession: 'Сварщик', type: ServiceType.Gas, checked: false },
  6: { name: 'Алексеев Алексей Алексеевич', profession: 'Электрик', type: ServiceType.Electricity, checked: false },
  7: { name: 'Глебов Глеб Глебович', profession: 'Сантехник', type: ServiceType.Water, checked: false },
  8: { name: 'Степанов Степан Степанович', profession: 'Сварщик', type: ServiceType.Gas, checked: false }
};

export const WorkersPanel: React.FC = () => {
  const filter = useSelector((state: StoreType) => state.event.workersFilter);

  const [people, setPeople] = useState<{ [key: number]: Worker }>(workers);
  const [showFilter, setShowFilter] = useState(false);

  const onChangeCheck = useCallback((id: string) => {
    const newPeople = { ...people };
    newPeople[id] = { ...people[id] };
    newPeople[id].checked = !newPeople[id].checked;
    setPeople(newPeople);
  }, [people]);

  return (
    <>
      <Line className="workersPanel" vertical>
        <Line className="title" justifyContent="between">
          <div className="label">Рабочие</div>
          <div className={classnames('filter-icon', { active: filter.isApplied })} onClick={() => setShowFilter(true)}>
            <Icon name="filter"></Icon>
          </div>
        </Line>
        <div className="cards-container">
          <Line vertical>
            {Object.keys(people).map(key => {
              const x = people[key];
              return (
                <Card key={key} className="workerCard" onClick={() => onChangeCheck(key)}>
                  <Line className="fullSize" alignItems="center">
                    <div className={classnames('label', {
                      gas: x.type == ServiceType.Gas,
                      electricity: x.type == ServiceType.Electricity,
                      water: x.type == ServiceType.Water,
                      heat: x.type == ServiceType.Heat
                    })}></div>
                    <Line vertical className="info">
                      <Line className="name">{x.name}</Line>
                      <Line className="profession">{x.profession}</Line>
                    </Line>
                    {x.checked ?
                      (<div className="icon checked">
                        <Icon prefix="far" name="check-circle"></Icon>
                      </div>)
                      :
                      (<div className="icon unchecked">
                        <Icon prefix="far" name="circle"></Icon>
                      </div>)}
                  </Line>
                </Card>);
            })}
          </Line>
        </div>
      </Line>
      {showFilter && <WorkerFilter onClose={() => setShowFilter(false)} />}
    </>
  );
};