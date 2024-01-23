import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatModule } from 'src/app/modules/material.module';

@Component({
  selector: 'app-filter-table',
  standalone: true,
  imports: [MatModule],
  providers: [MatTableDataSource],
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss']
})
export class FilterTableComponent implements AfterViewInit, OnChanges {

  @Input() taskList: Task[];
  @Output() deleteTask: EventEmitter<number> = new EventEmitter<number>();
  @Output() editTask: EventEmitter<number> = new EventEmitter<number>();

  dataSource: MatTableDataSource<Task>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  pageSize: number;
  length: number;
  displayedColumns: string[] = ['taskName', 'description'];

  constructor() {}

  delete(id: number): void {
    this.deleteTask.emit(id);
  }

  edit(id: number): void {
    this.editTask.emit(id);
  }

  ngAfterViewInit(): void {
    this.setTable();
  }

  ngOnChanges(): void {
    this.setTable();
  }

  setTable(): void {
    if (this.taskList) {
      this.dataSource = new MatTableDataSource(this.taskList);
      this.length = this.taskList.length;
      this.dataSource.paginator = this.paginator;
    }
    
  }

}
