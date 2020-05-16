import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from 'core/store';
import classnames from 'classnames';
import { Line, Icon } from 'shared/base';
import { Card } from 'shared/components';
import { ServiceType } from 'data/enum';
import { setSelectedEmployees } from 'data/event/action';
import { isEmptyObject } from 'shared/base/utils/emptyChecks';
import { Employee } from 'data/employee/model';

import { EmployeeFilter } from './employeeFilter';
import './employeePanel.scss';

export const EmployeePanel: React.FC = () => {
  const dispatch = useDispatch();

  const filter = useSelector((state: StoreType) => state.event.workersFilter);
  const employees = useSelector((state: StoreType) => state.employee.employees);
  const selectedEmployees = useSelector((state: StoreType) => state.event.selectedEmployees);

  const [showFilter, setShowFilter] = useState(false);
  const [model, setModel] = useState<Employee[]>([]);

  const onChangeCheck = useCallback(
    (id: number) => {
      let newSelectedEmployees = [...selectedEmployees];
      newSelectedEmployees.includes(id)
        ? (newSelectedEmployees = newSelectedEmployees.filter((x) => x !== id))
        : newSelectedEmployees.push(id);
      dispatch(setSelectedEmployees(newSelectedEmployees));
    },
    [selectedEmployees, dispatch]
  );

  const onHandleEmployees = useCallback(
    (employees: Employee[]) => {
      let newEmployees = [...employees];
      if (filter.type) newEmployees = newEmployees.filter((x) => filter.type.includes(x.type));
      if (filter.schedule) newEmployees = newEmployees.filter((x) => filter.schedule.includes(x.schedule));
      if (filter.experience)
        newEmployees = newEmployees.filter((x) => filter.experience.includes(x.experience));
      if (filter.employement)
        newEmployees = newEmployees.filter((x) => filter.employement.includes(x.employement));
      return newEmployees;
    },
    [filter]
  );

  useEffect(() => {
    let result: Employee[] = [...employees];
    setModel(onHandleEmployees(result));
  }, [employees, onHandleEmployees]);

  return (
    <>
      <Line className="employee-panel" vertical>
        <Line className="title" justifyContent="between">
          <div className="label">Рабочие</div>
          <div
            className={classnames('filter-icon', { active: !isEmptyObject(filter) })}
            onClick={() => setShowFilter(true)}>
            <Icon name="filter"></Icon>
          </div>
        </Line>
        <div className="cards-container">
          <Line vertical mb="3">
            {model.map((x) => {
              return (
                <Card key={x.id} className="workerCard" onClick={() => onChangeCheck(x.id)}>
                  <Line className="fullSize" alignItems="center" justifyContent="between">
                    <Line alignItems="center">
                      <div className="label-container">
                        <div
                          className={classnames('label', {
                            gas: x.type == ServiceType.Gas,
                            electricity: x.type == ServiceType.Electricity,
                            water: x.type == ServiceType.Water,
                            heat: x.type == ServiceType.Heat,
                          })}></div>
                      </div>
                      <Line vertical className="info">
                        <Line className="name">{`${x.lastname} ${x.firstname} ${x.patronymic}`}</Line>
                        <Line className="profession">{x.profession}</Line>
                      </Line>
                    </Line>
                    <Line>
                      {selectedEmployees.includes(x.id) ? (
                        <div className="icon checked">
                          <Icon prefix="far" name="check-circle"></Icon>
                        </div>
                      ) : (
                        <div className="icon unchecked">
                          <Icon prefix="far" name="circle"></Icon>
                        </div>
                      )}
                    </Line>
                  </Line>
                </Card>
              );
            })}
          </Line>
        </div>
      </Line>
      {showFilter && <EmployeeFilter onClose={() => setShowFilter(false)} />}
    </>
  );
};
