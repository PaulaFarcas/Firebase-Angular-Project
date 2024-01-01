import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { JoinBattleComponent } from './join-battle/join-battle.component';
import { StartGameComponent } from './start-game/start-game.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UpdateComponentComponent } from './update-component/update-component.component';
import { FileComponent } from './file/file.component';
import { VoterViewComponent } from './voter-view/voter-view.component';
import { PlayerViewComponent } from './player-view/player-view.component';


const routes: Routes = [
  {path:'',redirectTo:'login', pathMatch:'full'},
  {path: 'home', component:HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'verify-email', component:VerifyEmailComponent},
  {path: 'forgot-password', component:ForgotPasswordComponent},
  {path: 'profile/:id', component: UserProfileComponent },
  {path: 'join-battle', component: JoinBattleComponent },
  {path: 'start-game', component: StartGameComponent },
  {path: 'user-profile', component:UserProfileComponent},
  {path: 'user-dashboard',component:UserDashboardComponent},
  {path: 'update-component',component:UpdateComponentComponent},
  {path: 'file',component:FileComponent},
  {path: 'voter-view', component:VoterViewComponent},
  {path: 'player-view', component:PlayerViewComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
