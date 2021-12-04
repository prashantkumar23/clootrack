import { Dispatch } from 'redux';
import axios from 'axios';
import { ActionType } from '../action-types';

import {
    Action,
} from '../actions';

import { Chart } from '../../App'

export const fetchChart = () => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({ type: ActionType.FETCH_CHART });

        const url = "https://s3-ap-southeast-1.amazonaws.com/he-public-data/chart2986176.json"

        try {
            const { data }: { data: Chart[] } = await axios.get(url);

            dispatch({
                type: ActionType.FETCH_CHART_COMPLETE,
                payload: data,
            });

        } catch (err: any) {
            dispatch({
                type: ActionType.FETCH_CHART_ERROR,
                payload: err.message,
            });

        }
    };
};