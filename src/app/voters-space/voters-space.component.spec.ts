import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotersSpaceComponent } from './voters-space.component';

describe('VotersSpaceComponent', () => {
  let component: VotersSpaceComponent;
  let fixture: ComponentFixture<VotersSpaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VotersSpaceComponent]
    });
    fixture = TestBed.createComponent(VotersSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
