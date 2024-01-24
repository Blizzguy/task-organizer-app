import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TaskParams } from '../interfaces/task-params';
import { Store } from '@ngrx/store';
import { AppState } from '../interfaces/app.state';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(
    private readonly http: HttpClient,
    private readonly store: Store<AppState>
  ) {}

  readonly apiUrl = 'http://localhost:3000';

  search(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/response`);
  }

  prefilter(params: TaskParams): Task[] {
    let filteredTasks: Task[] = [];
    this.store
      .select((state) => state.tasks)
      .subscribe((tasks) => {
        filteredTasks = this.filter(params, tasks);
      });
    return filteredTasks;
  }

  filter(params: TaskParams, taskList: Task[]): Task[] {
    let filteredList: Task[] = [];

    if (params.taskName && params.taskName !== '') {
      filteredList = taskList.filter((task: Task) => {
        return task.taskName
          .toLowerCase()
          .includes((params.taskName ?? '').toLowerCase());
      });
    }

    if (filteredList.length === 0) {
      return taskList;
    }

    return filteredList;
  }

  delete(id: number, taskList: Task[]): Task[] {
    return taskList.filter((task: Task) => task.id !== id);
  }

  update(taskToUpdate: Task, taskList: Task[]): Task[] {
    const index = taskList.findIndex(
      (task: Task) => task.id === taskToUpdate.id
    );
    let taskListCopy = [...taskList];
    taskListCopy[index] = taskToUpdate;
    return taskListCopy;
  }

  add(taskToAdd: Task, taskList: Task[]): Task[] {
    let currentId =
      taskList.length > 0
        ? Math.max(...taskList.map((task) => task.id), 0) + 1
        : 1;
    let taskToAddCopy = { ...taskToAdd, id: currentId };
    let taskListCopy = [...taskList];
    taskListCopy.push(taskToAddCopy);
    return taskListCopy;
  }
}
