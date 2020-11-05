import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchcategorieComponent } from './searchcategorie.component';

describe('SearchcategorieComponent', () => {
  let component: SearchcategorieComponent;
  let fixture: ComponentFixture<SearchcategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchcategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchcategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
