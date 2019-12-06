import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ldls2Component } from './ldls2.component';

describe('Ldls2Component', () => {
  let component: Ldls2Component;
  let fixture: ComponentFixture<Ldls2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ldls2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ldls2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
