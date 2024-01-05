import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeSongViewComponent } from './youtube-song-view.component';

describe('YoutubeSongViewComponent', () => {
  let component: YoutubeSongViewComponent;
  let fixture: ComponentFixture<YoutubeSongViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YoutubeSongViewComponent]
    });
    fixture = TestBed.createComponent(YoutubeSongViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
