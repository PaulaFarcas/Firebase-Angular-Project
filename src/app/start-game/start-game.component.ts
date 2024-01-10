import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_service/auth.service';
import { DataService } from '../_service/data.service';
import { EMPTY, Subscription, switchMap, tap } from 'rxjs';
import { User } from '../model/user';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent {

  private currentUserSubscription: Subscription | undefined;

  constructor(private router:Router, private auth:AuthService, private data:DataService){}

  private currentUser:User|undefined;

  ngOnInit():void{
    this.currentUserSubscription=
    this.auth.getCurrentUser().pipe(
      switchMap((user: { uid: string }) => {
        if (user) {
          return this.data.getUserProfile(user.uid).pipe(
            tap((profile: any) => {
            if (profile) {
              this.currentUser = profile;
              console.log('set current user in start battle')
            } else {
              console.error("Could not fetch current user");
            }
          }));
        }else{
          return EMPTY;
        }
    }),
    tap(()=>{
      if(this.currentUser?.isFound || this.currentUser?.isWaitingForBattle) {
        this.currentUser.isFound=false;
        this.currentUser.isWaitingForBattle=false;
        this.data.updateUser(Object.assign({}, this.currentUser));
      }
    })
    ).subscribe();
  }
 
  ngOnDestroy(){
    this.currentUserSubscription?.unsubscribe();
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
