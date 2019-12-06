import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarldlsComponent } from './sidebarldls.component';

describe('SidebarldlsComponent', () => {
  let component: SidebarldlsComponent;
  let fixture: ComponentFixture<SidebarldlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarldlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarldlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
