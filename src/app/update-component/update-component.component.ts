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
  user: any;

  constructor(
    private authService: AuthService,
    private firestoreService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const updatedUser = (this.route.snapshot as any).state?.user;
    if (updatedUser) {
      this.user = { ...updatedUser };
    } else {
      this.router.navigate(['/profile']);
    }
  }

  saveChanges(): void {
    this.authService.getCurrentUser().subscribe((user: { uid: string; }) => {
      if (user) {
        this.firestoreService.updateUserProfile(user.uid, this.user).then(() => {
          this.router.navigate(['/profile'], { state: { user: { ...this.user } } });
        });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/profile']);
  }
}
