import { FilterType } from "data/employee/model";
import { ActionType } from "data/actionTypes";
import { createAction } from "core/redux";

export const setFilter = createAction<FilterType>(ActionType.EMPLOYEE_SETFILTER);