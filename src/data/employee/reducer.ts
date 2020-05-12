import { createReducer } from 'core/redux';
import { ActionType } from 'data/actionTypes';
import { FilterType, Employee } from 'data/employee/model';

interface EmployeeInitialState {
  employees: Employee[],
  filter: FilterType;
}

const initialState: () => EmployeeInitialState = () => ({
  employees: [],
  filter: { isElectricity: false, isGas: false, isHeat: false, isWater: false }
});

export const employeeReducer = createReducer(initialState, {
  [ActionType.EMPLOYEE_SETEMPLOYEES]: 'employees',
  [ActionType.EMPLOYEE_SETFILTER]: 'filter'
});
