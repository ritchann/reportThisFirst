import { createReducer } from 'core/redux';
import { ActionType } from 'data/actionTypes';
import { FilterType } from 'data/employee/model';

interface EmployeeInitialState {
  filter: FilterType;
}

const initialState: () => EmployeeInitialState = () => ({
  filter: { isElectricity: false, isGas: false, isHeat: false, isWater: false }
});

export const employeeReducer = createReducer(initialState, {
  [ActionType.EMPLOYEE_SETFILTER]: 'filter'
});
