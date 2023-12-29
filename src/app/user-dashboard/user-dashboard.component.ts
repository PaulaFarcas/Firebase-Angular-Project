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

  
  user: any // Initialize an empty object

  isEditMode = false;

  constructor(private authService: AuthService,private firestoreService: DataService,private router: Router) { }

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  private fetchUserProfile(): void {
    this.authService.getCurrentUser().subscribe((user: { uid: string; }) => {
      if (user) {
        this.firestoreService.getUserProfile(user.uid).subscribe((profile: User) => {
          this.user = profile as User;
        });
      }
    });
  }
  updateProfile(): void {
    // Navigate to the update-profile page without passing any data initially
    this.router.navigate(['/update-component']);
  }
  updateUserProfileData(updatedUserData: User): void {
    this.user = updatedUserData;
  }

}

