import { Chart } from '../../types';
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

export interface ChartUpdateButtonClickAction {
    type: ActionType.CHART_UPDATE_BUTTON_CLICKED;
    payload: {
        index: number;
        value: number;
        positionOfValueInElements: number;
    };
}



export type Action =
    | FetchChartAction
    | FetchChartCompleteAction
    | FetchChartErrorAction
    | ChartUpdateButtonClickAction