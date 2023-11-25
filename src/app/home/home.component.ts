import { Component } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  constructor(private auth:AuthService){

  }

  register(){
    this.auth.logout();
  }
}
