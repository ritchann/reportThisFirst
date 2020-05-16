import React, { useState, useEffect, useCallback } from 'react';
import { Line } from 'shared/base/line';
import { Pagination } from 'shared/components';
import { ServiceType } from 'data/enum';
import { Filter } from 'app/employee/filter';
import { Employee } from 'data/employee/model';
import { DeleteDialog } from 'app/employee/deleteDialog';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from 'core/store';
import { usePagination } from 'app/common/usePagination';
import { Page } from 'shared/layout';

import { EmployeeDialog } from './employeeDialog';
import { EmployeeCard } from './employeeCard';

import './employees.scss';

const maxElements = 4;

export const Employees: React.FC = () => {
  const dispatch = useDispatch();
  const getPages = usePagination<Employee>(maxElements);

  const employees = useSelector((state: StoreType) => state.employee.employees);
  const filter = useSelector((state: StoreType) => state.employee.filter);

  const [workerDialog, setWorkerDialog] = useState<{ show: boolean; employee?: Employee }>({ show: false });
  const [deleteDialog, setDeleteDialog] = useState<{ show: boolean; id?: number }>({ show: false });
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState<{ [page: number]: Employee[] }>({ 1: [] });
  const [maxPages, setMaxPages] = useState(1);

  const onFilter = useCallback(
    (employees: Employee[]) => {
      const types: string[] = [];
      if (filter.isElectricity) types.push(ServiceType.Electricity);
      if (filter.isGas) types.push(ServiceType.Gas);
      if (filter.isHeat) types.push(ServiceType.Heat);
      if (filter.isWater) types.push(ServiceType.Water);

      let newEmployees = [...employees];
      if (filter.experience && filter.experience !== ' ')
        newEmployees = newEmployees.filter((x) => x.experience === filter.experience);
      if (filter.employement && filter.employement !== ' ')
        newEmployees = newEmployees.filter((x) => x.employement === filter.employement);
      if (filter.schedule && filter.schedule !== ' ')
        newEmployees = newEmployees.filter((x) => x.schedule === filter.schedule);
      if (types.length > 0) newEmployees = newEmployees.filter((x) => types.includes(x.type));
      return newEmployees;
    },
    [filter]
  );

  useEffect(() => {
    let result: Employee[] = [...employees];
    let handledResult = onFilter(result);
    setPages(getPages(handledResult));
    setMaxPages(Math.ceil(handledResult.length / maxElements));
    setActivePage(1);
  }, [dispatch, onFilter, getPages, employees]);

  const pageContent = (
    <Line w="100" vertical>
      <Line className="add" justifyContent="end">
        <div onClick={() => setWorkerDialog({ show: true })}>+ Добавить</div>
      </Line>
      <Line vertical>
        {pages[activePage].map((x) => {
          return (
            <EmployeeCard key={x.id} model={x} openEditDialog={setWorkerDialog} openDeleteDialog={setDeleteDialog} />
          );
        })}
      </Line>
      <Pagination maxPages={maxPages} active={activePage} setActive={setActivePage} />
    </Line>
  );

  return (
    <>
      <Page
        className="employee-page"
        pageTitle={<div>Рабочие</div>}
        pageContent={pageContent}
        filterPanel={<Filter />}></Page>
      {workerDialog.show && (
        <EmployeeDialog
          header={workerDialog.employee ? 'Редактирование' : 'Добавление рабочего'}
          employee={workerDialog.employee}
          onClose={() => setWorkerDialog({ show: false })}
        />
      )}
      {deleteDialog.show && <DeleteDialog id={deleteDialog.id} onClose={() => setDeleteDialog({ show: false })} />}
    </>
  );
};
