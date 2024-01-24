import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { StoreModule } from '@ngrx/store'; // Importa StoreModule
import { Task } from '../interfaces/task';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}), // Añade esto
      ],
    });
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of tasks', () => {
    service.search().subscribe((tasks) => {
      expect(tasks.length).toBeGreaterThan(0);
    });
  });

  it('should delete a task', () => {
    const taskList: Task[] = [
      { id: 1, taskName: 'Task 1', completed: false},
      { id: 2, taskName: 'Task 2', completed: false },
      { id: 3, taskName: 'Task 3', completed: false },
    ];
    const taskId = 2;

    const updatedTaskList = service.delete(taskId, taskList);

    expect(updatedTaskList.length).toBe(taskList.length - 1);
    expect(updatedTaskList.find(task => task.id === taskId)).toBeUndefined();
  });

  it('should add a task', () => {
    const taskList: Task[] = [
      { id: 1, taskName: 'Task 1', completed: false},
      { id: 2, taskName: 'Task 2', completed: false },
    ];
    const newTask: Task = { id: 3, taskName: 'Task 3', completed: false };

    const updatedTaskList = service.add(newTask, taskList);

    expect(updatedTaskList.length).toBe(taskList.length);
    expect(updatedTaskList.find(task => task.id === newTask.id)).toBeDefined();
  });

  
});
