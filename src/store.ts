import { createStore, applyMiddleware, Store } from 'redux';
import rootReducer from './reducers/taskReducer';
import { Task } from './types/taskTypes';

export interface AppState {
    tasks: Task;
    // Add other state slices here
}

const store: Store & {
    dispatch: any
} = createStore(rootReducer, applyMiddleware())

export default store;