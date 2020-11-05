import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarroItemComponent } from './carro-item.component';

describe('CarroItemComponent', () => {
  let component: CarroItemComponent;
  let fixture: ComponentFixture<CarroItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarroItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarroItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
