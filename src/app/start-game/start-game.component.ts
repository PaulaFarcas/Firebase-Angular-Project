import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_service/auth.service';
import { DataService } from '../_service/data.service';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent {


  constructor(private router:Router, private auth:AuthService, private data:DataService){}

  ngOnInit():void{
    this.auth.getCurrentUser().subscribe((user: {uid:string}) => {
      if (user) {
        this.data.getUserProfile(user.uid).subscribe((profile:any)=>{
          if (profile) {
            profile.isFound=false;
            profile.isWaitingForBattle=false;
            this.data.updateUser(Object.assign({}, profile));
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
