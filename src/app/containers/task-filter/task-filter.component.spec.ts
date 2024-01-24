import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskFilterComponent } from './task-filter.component';
import { StoreModule } from '@ngrx/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TaskParams } from 'src/app/interfaces/task-params';
import { NewOrEditTaskDialogComponent } from './new-or-edit-task-dialog/new-or-edit-task-dialog.component';
import { of } from 'rxjs';

describe('TaskFilterComponent', () => {
  let component: TaskFilterComponent;
  let fixture: ComponentFixture<TaskFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],
      declarations: [TaskFilterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(TaskFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the dialog when addOrEdit is called', () => {
    const spy = spyOn(component, 'addOrEdit').and.callThrough();
    component.addOrEdit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call addOrEdit with correct taskId when updateTask is called', () => {
    const taskId = 1;
    component.taskList = [
      { id: 1, taskName: 'Task 1', completed: false },
      { id: 2, taskName: 'Task 2', completed: false },
    ];
    const expectedTask = component.taskList.find((task) => task.id === taskId);

    const dialogRefSpyObj = jasmine.createSpyObj({
      afterClosed: of({}),
      close: null,
    });
    spyOn(component.dialog, 'open').and.returnValue(dialogRefSpyObj);

    component.updateTask(taskId);
    expect(component.dialog.open).toHaveBeenCalledWith(
      NewOrEditTaskDialogComponent,
      {
        data: { ...expectedTask, isNew: false },
      }
    );
  });

  it('should update taskList when filterTasks is called', () => {
    const taskParams: TaskParams = {
      taskName: 'Task 1',
    };
    component.taskList = [
      { id: 1, taskName: 'Task 1', completed: false },
      { id: 2, taskName: 'Task 2', completed: false },
    ];
    const initialTaskList = [...component.taskList];
    component.filterTasks(taskParams);
    expect(component.taskList).not.toEqual(initialTaskList);
  });
});
