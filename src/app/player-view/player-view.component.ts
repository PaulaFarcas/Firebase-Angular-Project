import { Component } from '@angular/core';
import { DataService } from '../_service/data.service';
import { BattleService } from '../_service/battle.service';
import { TimerService } from '../_service/timer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  template: `
      <div>
      <!-- Display the user profile information... -->

      <!-- Display the timer value -->
      <div>Timer: {{ formatTime(timerValue) }}</div>
    </div>
  `,
  styleUrls: ['./player-view.component.css']
})
export class PlayerViewComponent {
  songUrl:string='';

  ratingPlayer1:number=0;
  ratingPlayer2:number=0;

  constructor(dataService:DataService, battleService:BattleService, private timerService: TimerService,private router:Router){}

  stateVoting:boolean=false;

  timerValue: number = 0;
 
  uploadMusic(){}

  playPlayer1Music(){
    console.log('Playing MUSIC 1');
  }
  playPlayer2Music(){
    console.log('Playing MUSIC 2');
  }
  
  ngOnInit(): void {
    // Start the timer when the component is initialized
    this.startTimer();

    // Subscribe to the timer value changes
    this.timerService.getTimer().subscribe((value) => {
      this.timerValue = value;

      // Check if the timer has reached zero
      if (this.timerValue === 0) {
        // Perform actions when the timer reaches zero
        this.handleTimerExpiration();
      }
    });
  }
  

  handleTimerExpiration(): void {
    // Add actions to perform when the timer reaches zero
    console.log('Timer has reached zero!');
    // For example, redirect the user to another page
    this.router.navigate(['/winner']);
  }


  startTimer(): void {
    // Start the timer with an initial value of 5 minutes
    this.timerService.startTimer(2 * 60); // 5 minutes in seconds
  }
  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }


}
