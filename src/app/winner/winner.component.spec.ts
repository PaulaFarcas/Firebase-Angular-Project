import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerComponent } from './winner.component';

describe('WinnerComponent', () => {
  let component: WinnerComponent;
  let fixture: ComponentFixture<WinnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WinnerComponent]
    });
    fixture = TestBed.createComponent(WinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
