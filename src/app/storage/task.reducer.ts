import { createReducer, on } from '@ngrx/store';
import { loadTasks } from './task.actions';
import { Task } from '../interfaces/task';

export const initialState: Task[] = [];

export const taskReducer = createReducer(
  initialState,
  on(loadTasks, (state, { tasks }) => [...tasks])
);