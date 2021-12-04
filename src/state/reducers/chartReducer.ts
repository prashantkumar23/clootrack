import produce from 'immer';
import { Chart } from '../../types';
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface ChartState {
    loading: boolean;
    error: string | null;
    data: Chart[];
}


const initialState: ChartState = {
    loading: false,
    error: null,
    data: [],
};


const reducer = produce((state: ChartState = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.FETCH_CHART:
            state.loading = true;
            state.error = null;

            return state;
        case ActionType.FETCH_CHART_COMPLETE:
            state.data = action.payload
            state.loading = false;

            return state;
        case ActionType.FETCH_CHART_ERROR:
            state.loading = false;
            state.error = action.payload;

            return state;
        case ActionType.CHART_UPDATE_BUTTON_CLICKED:
            const { index, value, positionOfValueInElements } = action.payload
            state.data[index].elements[positionOfValueInElements] = value

            return state;
        default:
            return state;
    }
})

export default reducer;