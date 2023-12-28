import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterActionsComponent } from './voter-actions.component';

describe('VoterActionsComponent', () => {
  let component: VoterActionsComponent;
  let fixture: ComponentFixture<VoterActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoterActionsComponent]
    });
    fixture = TestBed.createComponent(VoterActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
