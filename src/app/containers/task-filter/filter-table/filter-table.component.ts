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

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss'],
})
export class FilterTableComponent implements AfterViewInit, OnChanges {
  @Input() taskList: Task[];
  @Output() deleteTask: EventEmitter<number> = new EventEmitter<number>();
  @Output() editTask: EventEmitter<number> = new EventEmitter<number>();

  dataSource: MatTableDataSource<Task>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  pageSize: number;
  length: number;
  displayedColumns: string[] = ['taskName', 'description', 'actions'];
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

  completeTask(task: Task): void {
    let tasked = { ...task, completed: true };
    this.taskList = this.taskList.map((t) => (t.id === tasked.id ? tasked : t));
    this.dataSource.data = [...this.taskList];
  }
}
