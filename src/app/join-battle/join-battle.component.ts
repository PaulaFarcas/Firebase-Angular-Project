import { Component } from '@angular/core';
import { User } from '../model/user';
import { AuthService } from '../_service/auth.service';
import { DataService } from '../_service/data.service';

@Component({
  selector: 'app-join-battle',
  templateUrl: './join-battle.component.html',
  styleUrls: ['./join-battle.component.css']
})
export class JoinBattleComponent {
  
  // current_player:User;

  constructor(private auth: AuthService, private data: DataService){
    // this.current_player
  }

}
