import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoventComponent } from './movent.component';

describe('MoventComponent', () => {
  let component: MoventComponent;
  let fixture: ComponentFixture<MoventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
