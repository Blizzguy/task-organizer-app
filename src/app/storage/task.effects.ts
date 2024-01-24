import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadTasks } from './task.actions';
import { map, mergeMap } from 'rxjs/operators';
import { TaskService } from 'src/app/services/task.service';

@Injectable()
export class TaskEffects {
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      mergeMap(() => this.taskService.search()
        .pipe(
          map(tasks => ({ type: '[Task] Tasks Loaded Success', tasks }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private taskService: TaskService
  ) {}
}