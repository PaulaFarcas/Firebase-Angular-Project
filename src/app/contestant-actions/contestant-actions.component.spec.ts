import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestantActionsComponent } from './contestant-actions.component';

describe('ContestantActionsComponent', () => {
  let component: ContestantActionsComponent;
  let fixture: ComponentFixture<ContestantActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContestantActionsComponent]
    });
    fixture = TestBed.createComponent(ContestantActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
