import { Component } from '@angular/core';
import { DataService } from '../_service/data.service';
import { BattleService } from '../_service/battle.service';
import { TimerService } from '../_service/timer.service';
import { Router } from '@angular/router';
import { AuthService } from '../_service/auth.service';
import { switchMap, EMPTY, tap, Subscription } from 'rxjs';
import { User } from '../model/user';
import { Battle } from '../model/battle';
import { SongService } from '../_service/song.service';

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

  ratingPlayer1:number=0;
  ratingPlayer2:number=0;

  constructor(private auth: AuthService, private data:DataService,private battleService:BattleService, private timerService: TimerService,private router:Router){}

  stateVoting:boolean=false;
  timerValue: number = 0;
  
  public songUrl:string|undefined;
  public songTitle:string|undefined;
  public songAuthor:string|undefined;
  public player1MusicUrl:string|undefined;
  public player2MusicUrl:string|undefined;

  current_player:User = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    music_style: [],
    profilePicture: '',
    isWaitingForBattle: false,
    isFound: false
  };

  battle:Battle|undefined;
  private battleSubscription:Subscription|undefined;

  playPlayer1Music(){
    console.log('Playing MUSIC 1');
  }
  playPlayer2Music(){
    console.log('Playing MUSIC 2');
  }
  
  ngOnInit(): void {

    this.auth.getCurrentUser().pipe(
      switchMap((user: { uid: string }) => {
        if (user) {
          return this.data.getUserProfile(user.uid).pipe(
            tap((profile: any) => {
              if (profile) {
                this.current_player = profile;
                console.log('set current player in join battle');
                console.log(this.current_player);
              } else {
                console.error("Could not fetch current user");
              }
            })
          );
        } else {
          // Return an observable with no value if there is no user
          return EMPTY;
        }
      }),
    );

    this.battleSubscription=this.battleService.getBattleHostingPlayer(this.current_player).pipe(
      tap((foundBattle:any)=>{
        this.battle=foundBattle;
        console.log(this.battle);
      })
    ).subscribe();

    this.songUrl=this.battle?.song.url;
    this.songAuthor=this.battle?.song.author;
    this.songTitle=this.battle?.song.title;


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
  
  ngOnDestroy(){
    this.battleSubscription?.unsubscribe();
    this.battleService.deleteBattleHostingPlayer(this.current_player);
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

  uploadMusic(){
    // this.playPlayer1MusicU
  } 
}
