import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from 'core/store';
import classnames from "classnames";
import { Line, Icon } from 'shared/base';
import { Card } from 'shared/components';
import { ServiceType } from 'data/enum';
import { setSelectedEmployees } from 'data/event/action';

import { WorkerFilter } from './workerFilter';
import './workersPanel.scss';


export const WorkersPanel: React.FC = () => {
  const dispatch = useDispatch();

  const filter = useSelector((state: StoreType) => state.event.workersFilter);
  const employees = useSelector((state: StoreType) => state.employee.employees);
  const selectedEmployees = useSelector((state: StoreType) => state.event.selectedEmployees);

  const [showFilter, setShowFilter] = useState(false);

  const onChangeCheck = useCallback((id: number) => {
    let newSelectedEmployees = [...selectedEmployees];
    newSelectedEmployees.includes(id) ?
      newSelectedEmployees = newSelectedEmployees.filter(x => x !== id)
      :
      newSelectedEmployees.push(id);
    dispatch(setSelectedEmployees(newSelectedEmployees));
  }, [selectedEmployees, dispatch]);

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
          <Line vertical mb="3">
            {employees.map(x => {
              return (
                <Card key={x.id} className="workerCard" onClick={() => onChangeCheck(x.id)}>
                  <Line className="fullSize" alignItems="center" justifyContent="between">
                    <Line alignItems="center">
                      <div className="label-container">
                        <div className={classnames('label', {
                          gas: x.type == ServiceType.Gas,
                          electricity: x.type == ServiceType.Electricity,
                          water: x.type == ServiceType.Water,
                          heat: x.type == ServiceType.Heat
                        })}></div>
                      </div>
                      <Line vertical className="info">
                        <Line className="name">{`${x.lastname} ${x.firstname} ${x.patronymic}`}</Line>
                        <Line className="profession">{x.profession}</Line>
                      </Line>
                    </Line>
                    <Line>
                      {selectedEmployees.includes(x.id) ?
                        (<div className="icon checked">
                          <Icon prefix="far" name="check-circle"></Icon>
                        </div>)
                        :
                        (<div className="icon unchecked">
                          <Icon prefix="far" name="circle"></Icon>
                        </div>)}
                    </Line>
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