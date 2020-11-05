import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaSidebarComponent } from './tienda-sidebar.component';

describe('TiendaSidebarComponent', () => {
  let component: TiendaSidebarComponent;
  let fixture: ComponentFixture<TiendaSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiendaSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiendaSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
