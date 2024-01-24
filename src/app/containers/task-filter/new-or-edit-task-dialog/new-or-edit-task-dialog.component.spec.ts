import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NewOrEditTaskDialogComponent } from './new-or-edit-task-dialog.component';

describe('NewOrEditTaskDialogComponent', () => {
  let component: NewOrEditTaskDialogComponent;
  let fixture: ComponentFixture<NewOrEditTaskDialogComponent>;
  let mockDialogRef: MatDialogRef<NewOrEditTaskDialogComponent>;

  beforeEach(() => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [NewOrEditTaskDialogComponent],
      imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: mockDialogRef },
      ],
    });
    fixture = TestBed.createComponent(NewOrEditTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.form instanceof FormGroup).toBe(true);
  });

  it('should close dialog on confirm', () => {
    component.form.patchValue({ taskName: 'Test task' });
    component.confirm();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
