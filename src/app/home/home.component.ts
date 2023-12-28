import { Component } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { User } from '../model/user';
import { DataService } from '../_service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {



  constructor(private router:Router,private auth:AuthService){

  }

  register(){
    this.auth.logout();
  }

  startGame() {
    this.router.navigate(['/start-game']);
  }
  profile(){
    this.router.navigate(['/user-profile']);
  }

  

  }


