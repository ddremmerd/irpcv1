import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ldlt2Component } from './ldlt2.component';

describe('Ldlt2Component', () => {
  let component: Ldlt2Component;
  let fixture: ComponentFixture<Ldlt2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ldlt2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ldlt2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
