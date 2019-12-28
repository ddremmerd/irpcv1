import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dropdown2Component } from './dropdown2.component';

describe('Dropdown2Component', () => {
  let component: Dropdown2Component;
  let fixture: ComponentFixture<Dropdown2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dropdown2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dropdown2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
