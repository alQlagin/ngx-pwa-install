import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPwaInstallComponent } from './ngx-pwa-install.component';

describe('NgxPwaInstallComponent', () => {
  let component: NgxPwaInstallComponent;
  let fixture: ComponentFixture<NgxPwaInstallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxPwaInstallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxPwaInstallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
