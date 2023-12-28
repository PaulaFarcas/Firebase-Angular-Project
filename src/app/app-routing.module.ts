import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { JoinBattleComponent } from './join-battle/join-battle.component';
import { ContestantActionsComponent } from './contestant-actions/contestant-actions.component';
import { VoterActionsComponent } from './voter-actions/voter-actions.component';
import { StartGameComponent } from './start-game/start-game.component';

const routes: Routes = [
  {path:'',redirectTo:'login', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'verify-email', component:VerifyEmailComponent},
  {path: 'forgot-password', component:ForgotPasswordComponent},
  { path: 'profile/:id', component: UserProfileComponent },
  { path: 'join-battle', component: JoinBattleComponent },
  { path: 'contestant-actions', component: ContestantActionsComponent },
  { path: 'voter-actions', component: VoterActionsComponent },
  { path: 'start-game', component: StartGameComponent },
  {path:'user-profile', component:UserProfileComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
