import { Chart } from '../../App';
import { ActionType } from '../action-types';

export interface FetchChartAction {
    type: ActionType.FETCH_CHART;
}


export interface FetchChartCompleteAction {
    type: ActionType.FETCH_CHART_COMPLETE;
    payload: Chart[];
}

export interface FetchChartErrorAction {
    type: ActionType.FETCH_CHART_ERROR;
    payload: string;
}

export type Action =
    | FetchChartAction
    | FetchChartCompleteAction
    | FetchChartErrorAction