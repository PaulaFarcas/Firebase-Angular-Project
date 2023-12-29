import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_service/auth.service';
import { User } from '../model/user';
import { DataService } from '../_service/data.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {

  user: User = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    music_style:''
  };
  id: string = '';
  first_name: string = '';
  last_name: string = '';
  email: string =''
  music_style:string='';
  

  constructor(
    private authService: AuthService,
    private firestoreService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get the current user's profile from Firestore
    this.authService.getCurrentUser().subscribe((user: { uid: string; }) => {
      if (user) {
       this.firestoreService.getUserProfile(user.uid).subscribe((profile: any) => {
          this.user = profile;
        });
      }
    });
  }

  updateProfile(): void {
    // Navigate to the update-profile page
    this.router.navigate(['/update-component']);
  }

}

