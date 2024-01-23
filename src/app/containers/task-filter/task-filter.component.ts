import { Component, OnInit, Self } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { TaskParams } from 'src/app/interfaces/task-params';
import { DeleteDialogComponent } from './filter-table/delete-dialog/delete-dialog.component';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/interfaces/task';
import { NewOrEditTaskDialogComponent } from './new-or-edit-task-dialog/new-or-edit-task-dialog.component';
import { FilterTableComponent } from './filter-table/filter-table.component';
import { MatModule } from 'src/app/modules/material.module';


@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  standalone: true,
  imports: [FilterFormComponent, FilterTableComponent, NewOrEditTaskDialogComponent, DeleteDialogComponent, MatModule],
  providers: [TaskService, MatDialog],
  styleUrls: ['./task-filter.component.scss']
})
export class TaskFilterComponent implements OnInit {

  constructor(
    private readonly taskService: TaskService,
    private readonly dialog: MatDialog
  ) {}

  taskList: Task[];
  baseTaskList: Task[];

  ngOnInit(): void {
    this.taskService
      .search()
      .subscribe((superheroList: Task[]) => {
        this.taskList = superheroList;
        this.baseTaskList = superheroList;
      });
  }

  addOrEdit(listId?: number): void {
    listId ? this.updateTask(listId) : this.addTask();
  }

  updateTask(taskId: number): void {
    const hero = this.taskList.find(
      (task: Task) => task.id === taskId
    );
    const dialogRef = this.dialog.open(NewOrEditTaskDialogComponent, {
      data: { ...hero, isNew: false },
    });

    dialogRef.afterClosed().subscribe((result: Task) => {
      if (result) {
        this.taskList = [
          ...this.taskService.update(result, this.taskList),
        ];
        this.baseTaskList = this.taskList;
      }
    });
  }

  addTask(): void {
    const dialogRef = this.dialog.open(NewOrEditTaskDialogComponent, {
      data: { isNew: true },
    });

    dialogRef.afterClosed().subscribe((result: Task) => {
      if (result) {
        this.taskList = [
          ...this.taskService.add(result, this.taskList),
        ];
        this.baseTaskList = this.taskList;
      }
    });
  }

  deleteTask(id: number) {
    const task = this.taskList.find(
      (task: Task) => task.id === id
    );
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: task ? task.taskName : null,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.taskList = [
          ...this.taskService.delete(id, this.taskList),
        ];
        this.baseTaskList = this.taskList;
      }
    });
  }

  filterSuperheroes(taskParams: TaskParams): void {
    this.taskList = [
      ...this.taskService.filter(taskParams, this.baseTaskList),
    ];
  }

}
