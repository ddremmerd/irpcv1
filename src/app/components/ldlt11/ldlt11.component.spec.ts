import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ldlt11Component } from './ldlt11.component';

describe('Ldlt11Component', () => {
  let component: Ldlt11Component;
  let fixture: ComponentFixture<Ldlt11Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ldlt11Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ldlt11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
