  import { Component } from '@angular/core';
  import { User } from '../model/user';
  import { AuthService } from '../_service/auth.service';
  import { DataService } from '../_service/data.service';
  import { Router } from '@angular/router';
  import { BattleService } from '../_service/battle.service';

  @Component({
    selector: 'app-join-battle',
    templateUrl: './join-battle.component.html',
    styleUrls: ['./join-battle.component.css']
  })
  export class JoinBattleComponent {
    
    current_player:User = {
      id: '',
      first_name: '',
      last_name: '',
      email: '',
      music_styles: [],
      profilePicture: '',
      isWaitingForBattle: true,
      isFound: false
    };

    opponent:User = {
      id: '',
      first_name: '',
      last_name: '',
      email: '',
      music_styles: [],
      profilePicture: '',
      isWaitingForBattle: true,
      isFound: true
    };

    waitingStatus:string='If ready, click ready!';

    constructor(private auth: AuthService, private data: DataService, private router:Router, private battleService:BattleService){}

    ngOnInit(): void {
      this.auth.getCurrentUser().subscribe((user: {uid:string}) => {
        if (user) {
          this.data.getUserProfile(user.uid).subscribe((profile:any)=>{
            if (profile) {
              this.current_player = profile;
              this.current_player.isWaitingForBattle=true;
              this.data.updateUser(Object.assign({}, this.current_player));
            }
            else{
              console.error('Error: something happened, could not find profile');
            }
          })
        } else {
          console.error('Error: User or user.id is undefined');
        }
      });
    }

    findOpponent() {
      this.data.getAllUsers().subscribe((users) => {
        const waitingOpponent:User = <User>users.map(user => user.payload.doc.data())
                                              .find((user:any) => user.isWaitingForBattle && !user.isFound);
        if (waitingOpponent) {
          this.opponent = waitingOpponent;
          this.opponent.isFound=true;
          this.data.updateUser(Object.assign({}, this.opponent));
        } else {
          this.waitingStatus = 'No opponent waiting for battle';
        }
      });
    }

    startBattle() {
      console.log('start Battle clicked');

      if(!this.current_player.isFound){
        this.findOpponent();
        this.battleService.createBattle(this.current_player, this.opponent);
      }
      this.router.navigate(['/player-view']);
    }    
  }
  