import { createAction, props } from '@ngrx/store';
import { Task } from '../interfaces/task';

export const loadTasks = createAction(
  '[Task] Load Tasks',
  props<{ tasks: Task[] }>()
);