import { Component } from '@angular/core';
import { DataService } from '../_service/data.service';
import { AuthService } from '../_service/auth.service';
import { User } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-component',
  templateUrl: './update-component.component.html',
  styleUrls: ['./update-component.component.css']
})
export class UpdateComponentComponent {
  user: any = {};

  constructor(
    private authService: AuthService,
    private firestoreService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Check if there is state data passed from the profile page
    const updatedUser = (this.route.snapshot as any).state?.user;

    if (updatedUser) {
      this.user = { ...updatedUser };
    } else {
      // If no data passed, navigate back to the profile page
      this.router.navigate(['/profile']);
    }
  }

  saveChanges(): void {
    // Save changes to Firestore
    this.authService.getCurrentUser().subscribe((user: { uid: any; }) => {
      if (user) {
        this.firestoreService.updateUserProfile(user.uid, this.user).then(() => {
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
