  import { Component } from '@angular/core';
  import { User } from '../model/user';
  import { AuthService } from '../_service/auth.service';
  import { DataService } from '../_service/data.service';
  import { Router } from '@angular/router';
  import { BattleService } from '../_service/battle.service';
  import { Subscription, switchMap, tap, EMPTY, filter, map } from 'rxjs';

  @Component({
    selector: 'app-join-battle',
    templateUrl: './join-battle.component.html',
    styleUrls: ['./join-battle.component.css']
  })
  export class JoinBattleComponent {

    private opponentSetCount:number=0;
    private isOpponentSetCorrectly:boolean=false;
    
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
      this.data.getAllUsers().valueChanges().pipe(
        tap((users)=>{
          this.opponentSetCount++;
          console.log('before filter', this.opponentSetCount);
          console.log(users);
        }),
        map((users:any[])=> users.filter(user => user.isWaitingForBattle && !user.isFound)),
        tap((filteredUsers)=>{
          console.log('after filter');
          console.log(filteredUsers);
        }),
        switchMap((filteredUsers) => {
            if(filteredUsers && filteredUsers.length>0){
              const waitingOpponent:User= filteredUsers[0];
              console.log(waitingOpponent, 'waiting opponent id: ', waitingOpponent.id);
              return this.data.getUserProfile(waitingOpponent.id).pipe(
                tap((profile:any) =>{
                    if(profile){
                      this.opponent=profile;
                      console.log('set opponent in join battle');
                      if(this.opponent.id!=this.current_player.id){
                        this.isOpponentSetCorrectly=true;
                      }
                    }
                    else{
                      console.log('Could not fetch opponent profile');
                    }
                })
              );
            }
            else{
              console.error('Could not fetch users list');
              return EMPTY;
            }
        }),
        tap(()=>{
          if(!this.opponent.isFound){
            this.opponent.isFound=true;
            this.data.updateUser(Object.assign({}, this.opponent));
            console.log('Updated opponent isFound=true');
          }
        })
      ).subscribe();
      
    }

    startBattle() {
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
  