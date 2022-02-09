import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustomnerComponent } from './new-customner.component';

describe('NewCustomnerComponent', () => {
  let component: NewCustomnerComponent;
  let fixture: ComponentFixture<NewCustomnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCustomnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCustomnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
