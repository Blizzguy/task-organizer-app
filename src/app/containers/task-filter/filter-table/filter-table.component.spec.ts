import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FilterTableComponent } from './filter-table.component';
import { Task } from 'src/app/interfaces/task';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FilterTableComponent', () => {
  let component: FilterTableComponent;
  let fixture: ComponentFixture<FilterTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterTableComponent],
      imports: [
        MatPaginatorModule,
        MatTableModule,
        NoopAnimationsModule
      ]
    });
    fixture = TestBed.createComponent(FilterTableComponent);
    component = fixture.componentInstance;
    component.dataSource = new MatTableDataSource<Task>([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit deleteTask event when delete is called', () => {
    spyOn(component.deleteTask, 'emit');
    component.delete(1);
    expect(component.deleteTask.emit).toHaveBeenCalledWith(1);
  });

  it('should emit editTask event when edit is called', () => {
    spyOn(component.editTask, 'emit');
    component.edit(1);
    expect(component.editTask.emit).toHaveBeenCalledWith(1);
  });

  it('should set dataSource when setTable is called', () => {
    component.taskList = [{ id: 1, taskName: 'Test', description: 'Test description', completed: false }];
    component.setTable();
    expect(component.dataSource.data).toEqual(component.taskList);
  });

  it('should update taskList when ngOnChanges is called', () => {
    const newTaskList: Task[] = [{ id: 1, taskName: 'Test', description: 'Test description', completed: false }];
    component.taskList = newTaskList;
    component.ngOnChanges();
    expect(component.dataSource.data).toEqual(newTaskList);
  });
});
