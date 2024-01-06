import { Component } from '@angular/core';
import { DataService } from '../_service/data.service';
import { BattleService } from '../_service/battle.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.css']
})
export class PlayerViewComponent {
  timer:number=2.0;
  songUrl:string='';

  ratingPlayer1=5.4;
  ratingPlayer2=7.8;

  statePlaying=false;
  stateVoting=false;
  stateEnded=false;

  // player1:User;
  // player2:User;

  constructor(dataService:DataService, battleService:BattleService){
    
  }


  uploadMusic(){}

  playPlayer1Music(){
    console.log('Playing MUSIC 1');
  }
  playPlayer2Music(){
    console.log('Playing MUSIC 2');
  }
}
