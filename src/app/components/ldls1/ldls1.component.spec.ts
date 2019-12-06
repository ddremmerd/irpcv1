import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ldls1Component } from './ldls1.component';

describe('Ldls1Component', () => {
  let component: Ldls1Component;
  let fixture: ComponentFixture<Ldls1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ldls1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ldls1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
