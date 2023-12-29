import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_service/auth.service';
import { User } from '../model/user';
import { DataService } from '../_service/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  profileForm: FormGroup;
 
  constructor(
    private authService: AuthService,
    private firestoreService: DataService,
    private router: Router,
    private fb: FormBuilder
  ) { this.profileForm = this.fb.group({
    id:['',Validators.required],
    email: ['', Validators.required],
  });}

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
  saveChanges(): void {
    // Save changes to Firestore
    this.authService.getCurrentUser().subscribe((user: { uid: any; }) => {
      if (user) {
        // Use the user ID obtained from authentication
        const userId = user.uid;
  
        // Update only the email field using the current user's email
        this.authService.getCurrentUserEmail().subscribe(currentUserEmail => {
          if (currentUserEmail !== null) {
            this.profileForm.value.email = currentUserEmail;
            this.profileForm.value.id=userId;
  
            // Update the user profile in Firestore
            this.firestoreService.updateUserProfile(userId, this.profileForm.value).then(() => {
              // Navigate back to the profile page with updated data
            });
          }
        });
      }
    });
  }

  updateProfile(): void {
    // Navigate to the update-profile page
    this.router.navigate(['/update-component']);
  }

}