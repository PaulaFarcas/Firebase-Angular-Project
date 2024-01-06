import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private timerValue: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private timerInterval: any;

  constructor() {}

  startTimer(duration: number): void {
    this.timerValue.next(duration);
    this.timerInterval = setInterval(() => {
      if (this.timerValue.value > 0) {
        this.timerValue.next(this.timerValue.value - 1);
      } else {
        this.stopTimer();
      }
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.timerInterval);
    this.timerValue.next(0);
  }

  getTimer(): Observable<number> {
    return this.timerValue.asObservable();
  }

}
