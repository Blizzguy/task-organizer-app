import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterTableComponent } from './task-filter/filter-table/filter-table.component';
import { FilterFormComponent } from './task-filter/filter-form/filter-form.component';
import { TaskFilterComponent } from './task-filter/task-filter.component';
import { DeleteDialogComponent } from './task-filter/filter-table/delete-dialog/delete-dialog.component';
import { NewOrEditTaskDialogComponent } from './task-filter/new-or-edit-task-dialog/new-or-edit-task-dialog.component';
import { MatModule } from '../modules/material.module';
import { TaskRoutingModule } from './task-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { taskReducer } from '../storage/task.reducer';
import { TaskEffects } from '../storage/task.effects';



@NgModule({
  declarations: [
    FilterTableComponent,
    FilterFormComponent,
    TaskFilterComponent,
    DeleteDialogComponent,
    NewOrEditTaskDialogComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MatModule,
    ReactiveFormsModule,
    CommonModule,
    StoreModule.forFeature('tasks', taskReducer),
    EffectsModule.forFeature([TaskEffects])
  ]
})
export class TaskModule { }
