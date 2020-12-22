import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartOptionsComponent } from './start-options.component';

describe('StartOptionsComponent', () => {
  let component: StartOptionsComponent;
  let fixture: ComponentFixture<StartOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
