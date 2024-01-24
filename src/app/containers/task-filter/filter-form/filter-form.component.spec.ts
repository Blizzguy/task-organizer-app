import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FilterFormComponent } from './filter-form.component';

describe('FilterFormComponent', () => {
  let component: FilterFormComponent;
  let fixture: ComponentFixture<FilterFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterFormComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ]
    });
    fixture = TestBed.createComponent(FilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the search form on init', () => {
    component.ngOnInit();
    expect(component.searchForm).toBeTruthy();
  });

  it('should emit updateSearchForm event on search', () => {
    spyOn(component.updateSearchForm, 'emit');
    component.search();
    expect(component.updateSearchForm.emit).toHaveBeenCalled();
  });

  it('should reset the search form to default values', () => {
    const defaultForm = component.buildDefaultSearchForm();
    component.setSearchFormDefaultValues();
    expect(component.searchForm.value).toEqual(defaultForm.value);
  });

  it('should emit addNewTask event on addTask', () => {
    spyOn(component.addNewTask, 'emit');
    component.addTask();
    expect(component.addNewTask.emit).toHaveBeenCalled();
  });
});