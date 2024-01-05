import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent {


  constructor(private router:Router){
    
  }

  goToVoterView(){
    this.router.navigate(['/voter-view']);
  }

  joinBattle(){
    this.router.navigate(['/join-battle']);
  }

  goHome(){
    this.router.navigate(['/home']);
  }
}
