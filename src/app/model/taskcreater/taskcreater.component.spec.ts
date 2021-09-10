import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskcreaterComponent } from './taskcreater.component';

describe('TaskcreaterComponent', () => {
  let component: TaskcreaterComponent;
  let fixture: ComponentFixture<TaskcreaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskcreaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskcreaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
