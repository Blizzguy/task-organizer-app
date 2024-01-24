import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TaskFilterComponent } from './task-filter/task-filter.component';

export const routes: Routes = [
  { path: '', redirectTo: 'searcher', pathMatch: 'full' },
  {
    path: 'searcher',
    data: { breadcrumb: 'Listado de Tareas' },
    component: TaskFilterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}