import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ldls3Component } from './ldls3.component';

describe('Ldls3Component', () => {
  let component: Ldls3Component;
  let fixture: ComponentFixture<Ldls3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ldls3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ldls3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
