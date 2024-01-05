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
    isReady: false
  };

  opponent:User = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    music_styles: [],
    profilePicture: '',
    isWaitingForBattle: true,
    isReady: false
  };

  waitingStatus:string='If ready, click ready!'

  constructor(private auth: AuthService, private data: DataService, private router:Router, private battleService:BattleService){}

  ngOnInit(): void {
    this.current_player=this.auth.getCurrentUser();
    this.opponent= this.findOpponent();
    
  }

  findOpponent(){
    return (<User[]>(<unknown>this.data.getAllUsers())).filter(user => user.isWaitingForBattle)[0];
  }

  startBattle(){
    this.current_player.isReady=true;  //set is Ready to current User
    this.data.updateUser(this.current_player);

    if(this.data.getUserProfile(this.opponent.id).isReady){
      this.battleService.createBattle(this.current_player, this.opponent);
      this.router.navigate(['/player-view']);
    }
    else {
      this.waitingStatus='Waiting for the other opponent'
    }
  }
}
 