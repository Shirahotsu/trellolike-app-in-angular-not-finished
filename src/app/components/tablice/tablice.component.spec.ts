import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabliceComponent } from './tablice.component';

describe('TabliceComponent', () => {
  let component: TabliceComponent;
  let fixture: ComponentFixture<TabliceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabliceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabliceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
