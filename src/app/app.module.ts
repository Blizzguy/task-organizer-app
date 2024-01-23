import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterTableComponent } from './containers/task-filter/filter-table/filter-table.component';
import { DeleteDialogComponent } from './containers/task-filter/filter-table/delete-dialog/delete-dialog.component';
import { NewOrEditTaskDialogComponent } from './containers/task-filter/new-or-edit-task-dialog/new-or-edit-task-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterTableComponent,
    DeleteDialogComponent,
    NewOrEditTaskDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
