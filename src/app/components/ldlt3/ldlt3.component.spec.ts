import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ldlt3Component } from './ldlt3.component';

describe('Ldlt3Component', () => {
  let component: Ldlt3Component;
  let fixture: ComponentFixture<Ldlt3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ldlt3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ldlt3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
