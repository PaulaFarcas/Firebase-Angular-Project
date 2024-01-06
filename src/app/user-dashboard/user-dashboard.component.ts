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
    music_style:[],
    profilePicture:'',
    isWaitingForBattle: false,
    isFound: false
  };
  id: string = '';
  first_name: string = '';
  last_name: string = '';
  email: string =''
  music_style:string[]=[];
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
          if (profile) {
            // User profile exists, use it
            this.user = profile;
          } else {
            // User profile doesn't exist, create a new one only if the user is not already on the user-dashboard page
            if (!this.router.url.includes('/user-dashboard')) {
              this.saveChanges();
            }
          }
        });
      }
    });
  }
  
  saveChanges(): void {
    // Save changes to Firestore
    this.authService.getCurrentUser().subscribe((user: { uid: any; }) => {
      if (user) {
       
        // Update only the email field using the current user's email
        this.authService.getCurrentUserEmail().subscribe(currentUserEmail => {
          if (currentUserEmail !== null) {
            this.profileForm.value.email = currentUserEmail;
            this.profileForm.value.id=user.uid;

            // Update the user profile in Firestore
            this.firestoreService.createOrUpdateUserProfile(user.uid, this.profileForm.value).then(() => {
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

  goBack(){
    this.router.navigate(['/home'])
  }

}