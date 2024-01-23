import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrEditTaskDialogComponent } from './new-or-edit-task-dialog.component';

describe('NewOrEditTaskDialogComponent', () => {
  let component: NewOrEditTaskDialogComponent;
  let fixture: ComponentFixture<NewOrEditTaskDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewOrEditTaskDialogComponent]
    });
    fixture = TestBed.createComponent(NewOrEditTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
