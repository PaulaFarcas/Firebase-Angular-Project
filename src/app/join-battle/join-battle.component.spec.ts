import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinBattleComponent } from './join-battle.component';

describe('JoinBattleComponent', () => {
  let component: JoinBattleComponent;
  let fixture: ComponentFixture<JoinBattleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoinBattleComponent]
    });
    fixture = TestBed.createComponent(JoinBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
