import { Component } from '@angular/core';
import { User } from '../model/user';
import { AuthService } from '../_service/auth.service';
import { DataService } from '../_service/data.service';
import { Router } from '@angular/router';

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
    music_style:[],
    profilePicture: '',
    isWaitingForBattle: true,
    isReady: false
  };

  opponent:User = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    music_style:[],
    profilePicture: '',
    isWaitingForBattle: true,
    isReady: false
  };

  constructor(private auth: AuthService, private data: DataService, private router:Router){}

  ngOnInit(): void {
    this.current_player=this.auth.getCurrentUser();
    this.opponent= this.findOpponent();
  }

  findOpponent(){
    return (<User[]>(<unknown>this.data.getAllUsers())).filter(user => user.isWaitingForBattle)[0];
  }

  startBattle(){
    // if(this.current_player.isReady && this.opponent.isReady){
    //   this.router.navigate(['/player-view']);
    // }

    this.router.navigate(['/player-view']);
  }
}
