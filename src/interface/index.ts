/*
 * @Author: lgb
 * @Date: 2022-07-18 22:26:45
 * @LastEditors: lgb
 * @LastEditTime: 2022-07-18 22:59:56
 * @Description: 
 */
import { Dispatch } from "react";

export type Employee = {
    key: number;
    name: string;
}

export type StateType = {
    employees: Employee[],
    determineList: Employee[]
}

export interface IStateContext<T = any> {
    state?: T;
    dispatch: Dispatch<T>
}

export const INIT_STATE_CONTEXT: IStateContext<StateType> = { state: { employees: [], determineList: [] }, dispatch: undefined };
