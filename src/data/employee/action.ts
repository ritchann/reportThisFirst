import { FilterType, Employee } from "data/employee/model";
import { ActionType } from "data/actionTypes";
import { createAction } from "core/redux";

export const setEmployees = createAction<Employee[]>(ActionType.EMPLOYEE_SETEMPLOYEES);

export const setFilter = createAction<FilterType>(ActionType.EMPLOYEE_SETFILTER);