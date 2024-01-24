import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/interfaces/task';

@Component({
  selector: 'app-new-or-edit-task-dialog',
  templateUrl: './new-or-edit-task-dialog.component.html',
  styleUrls: ['./new-or-edit-task-dialog.component.scss'],
})
export class NewOrEditTaskDialogComponent {
  addOrEdit: string;

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public task: Task,
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<NewOrEditTaskDialogComponent>
  ) {}

  ngOnInit(): void {
    this.addOrEdit = this.task.isNew ? 'Crear' : 'Editar';
    this.form = this.formBuilder.group({
      id: new FormControl(null),
      taskName: new FormControl(null, Validators.required),
      description: new FormControl(null),
      completed: new FormControl(false),
    });
    this.isEdit();
  }

  isEdit(): void {
    if (!this.task.isNew) {
      this.form.patchValue(this.task);
    }
  }

  confirm(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      this.dialogRef.close(formValue);
    }
  }
}
