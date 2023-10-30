import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowflakesComponent } from './snowflakes.component';

describe('SnowflakesComponent', () => {
  let component: SnowflakesComponent;
  let fixture: ComponentFixture<SnowflakesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SnowflakesComponent]
    });
    fixture = TestBed.createComponent(SnowflakesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
