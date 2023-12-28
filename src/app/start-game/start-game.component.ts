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

  voterAction(){
    this.router.navigate(['/voter-actions']);
  }
  joinBattle(){
    this.router.navigate(['/join-battle']);
  }
}
