import { combineReducers } from 'redux';
import chartReducer from './chartReducer';

const reducers = combineReducers({
    charts: chartReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;