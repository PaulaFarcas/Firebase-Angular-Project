import { Component } from '@angular/core';
import { DataService } from '../_service/data.service';
import { AuthService } from '../_service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-component',
  templateUrl: './update-component.component.html',
  styleUrls: ['./update-component.component.css']
})
export class UpdateComponentComponent {
  

  user: User = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    music_style:'',
    isWaitingForBattle: false,
    isReady: false
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
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      //id:['',Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      //email: ['', Validators.required],
      music_style: ['']
    });
  }

  ngOnInit(): void {
    // Check if there is state data passed from the profile page
   // const updatedUser = (this.route.snapshot as any).state?.user;

    //if (updatedUser) {
      //this.user = { ...updatedUser };
    //} else {
      // If no data passed, navigate back to the profile page
     // this.router.navigate(['/user-dashboard']);
  //  }
  }

  saveChanges(): void {
    // Save changes to Firestore
    console.log('User before update:', this.profileForm.value);
  
    this.authService.getCurrentUser().subscribe((user: { uid: any; }) => {
      if (user) {
            // Update the user profile in Firestore
            this.firestoreService.updateUserProfile(user.uid, this.profileForm.value).then(() => {
              // Navigate back to the profile page with updated data
              this.router.navigate(['/user-dashboard'], { state: { user: { ...this.user } } });
        });
      }
    });
  }
  
  cancel(): void {
    // Navigate back to the profile page without saving changes
    this.router.navigate(['/user-dashboard']);
  }
}