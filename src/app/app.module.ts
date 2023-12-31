import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire/compat'
import { environment } from './environments/environment';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { JoinBattleComponent } from './join-battle/join-battle.component';
import { ContestantActionsComponent } from './contestant-actions/contestant-actions.component';
import { VoterActionsComponent } from './voter-actions/voter-actions.component';
import { StartGameComponent } from './start-game/start-game.component';
import { PlayerViewComponent } from './player-view/player-view.component';
import { VoterViewComponent } from './voter-view/voter-view.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import {MatDialogModule} from '@angular/material/dialog';
import { UpdateComponentComponent } from './update-component/update-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { StorageModule } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';
import { FileComponent } from './file/file.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    UserProfileComponent,
    JoinBattleComponent,
    ContestantActionsComponent,
    VoterActionsComponent,
    StartGameComponent,
    PlayerViewComponent,
    VoterViewComponent,
    UserDashboardComponent,
    UpdateComponentComponent,
    FileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    StorageModule,
    MatDialogModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp({"projectId":"fir-project-e0c1c","appId":"1:464348841183:web:37adc0e83390886258556a","storageBucket":"fir-project-e0c1c.appspot.com","apiKey":"AIzaSyDSyoh6yzqLx2qJmzicz1bkf7iC7FF2NF4","authDomain":"fir-project-e0c1c.firebaseapp.com","messagingSenderId":"464348841183","measurementId":"G-14D5H5JD42"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
