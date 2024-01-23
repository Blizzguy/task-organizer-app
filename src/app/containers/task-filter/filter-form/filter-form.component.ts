import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskParams } from 'src/app/interfaces/task-params';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule]
})
export class FilterFormComponent {
  @Output() addNewTask: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateSearchForm: EventEmitter<TaskParams> =
    new EventEmitter<TaskParams>();

  searchForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.buildDefaultSearchForm();
  }

  buildDefaultSearchForm(): FormGroup {
    return this.formBuilder.group({
      taskName: new FormControl(null),
    });
  }

  search(): void {
    if (this.searchForm.valid) {
      this.updateSearchForm.emit(this.searchForm.value);
    }
  }
  setSearchFormDefaultValues(): void {
    this.searchForm = this.buildDefaultSearchForm();
  }

  addHero(): void {
    this.addNewTask.emit();
  }
}
