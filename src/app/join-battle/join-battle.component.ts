  import { Component } from '@angular/core';
  import { User } from '../model/user';
  import { AuthService } from '../_service/auth.service';
  import { DataService } from '../_service/data.service';
  import { Router } from '@angular/router';
  import { BattleService } from '../_service/battle.service';
  import { Subscription, switchMap, tap, EMPTY } from 'rxjs';

  @Component({
    selector: 'app-join-battle',
    templateUrl: './join-battle.component.html',
    styleUrls: ['./join-battle.component.css']
  })
  export class JoinBattleComponent {
    
    private currentUserSubscription: Subscription | undefined;
    private allUsersSubscription: Subscription | undefined;

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

    opponent:User = {
      id: '',
      first_name: '',
      last_name: '',
      email: '',
      music_style: [],
      profilePicture: '',
      isWaitingForBattle: false,
      isFound: false
    };

    waitingStatus:string='If ready, click ready!';

    constructor(private auth: AuthService, private data: DataService, private router:Router, private battleService:BattleService){}

    ngOnInit(){
      this.currentUserSubscription=
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
        tap(() => {
          if(!this.current_player.isWaitingForBattle){
            this.current_player.isWaitingForBattle = true;
            this.data.updateUser(Object.assign({}, this.current_player));
            console.log('updated isWaiting flag');
          }
        })
      ).subscribe();
    }

    ngOnDestroy(){
      this.currentUserSubscription?.unsubscribe();
      this.allUsersSubscription?.unsubscribe();
    }

    findOpponent() {
      this.allUsersSubscription=
      this.data.getAllUsers().subscribe((users) => {
        const waitingOpponent:User = <User>users.map(user => user.payload.doc.data())
                                              .find((user:any) => user.isWaitingForBattle && !user.isFound && user.id!=this.current_player.id);
        if (waitingOpponent) {
          this.opponent = waitingOpponent;
        } else {
          this.waitingStatus = 'No opponent waiting for battle';
        }
      });
      
      this.opponent.isFound=true;
      this.data.updateUser(Object.assign({}, this.opponent));
    }

    startBattle() {
      console.log('start Battle clicked');

      if(!this.current_player.isFound){
        this.findOpponent();
        this.battleService.createBattle(this.current_player, this.opponent);
      }
      if(this.opponent.id!=''){
        this.router.navigate(['/player-view']);
        this.current_player.isFound=false;
        this.current_player.isWaitingForBattle=false;
        this.data.updateUser(Object.assign({}, this.current_player));
      } 
      else console.log('Could not find player');
    }    
  }
  