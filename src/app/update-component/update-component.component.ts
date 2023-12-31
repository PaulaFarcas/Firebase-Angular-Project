import { Component } from '@angular/core';
import { DataService } from '../_service/data.service';
import { AuthService } from '../_service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, switchMap } from 'rxjs/operators';
import { FileService } from '../_service/file.service';
import { FileMetaData } from '../model/FileMetaData';
import { Observable, from } from 'rxjs';

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
    music_style: '',
    profilePictureUrl: '',
    isWaitingForBattle: false,
    isReady: false
  };
  id: string = '';
  first_name: string = '';
  last_name: string = '';
  email: string =''
  music_style:string='';
  profileForm: FormGroup;
  selectedImage: File | null = null;

  constructor(
    private authService: AuthService,
    private firestoreService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private fireStorage: AngularFireStorage,
    private fileService: FileService,
  ) {
    this.profileForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      music_style: [''],
      profilePicture: [null]
    });
  }

  getSelectedImagePreview(): string | ArrayBuffer {
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedImage);
      return reader.result as string;
    }
    return '';
  }

  ngOnInit(): void {
    // Load user data and set it in the form
    // ...
  }

  saveChanges(): void {
    // Save changes to Firestore
    console.log('User before update:', this.profileForm.value);
    if (this.selectedImage) {
      this.uploadProfilePicture().subscribe(downloadURL => {
        // Update the user profile in Firestore with the downloadURL
        this.user.profilePictureUrl = downloadURL;
        this.updateUserProfile();
      });
    } else {
      this.updateUserProfile();
    }
  }

  updateUserProfile(): void {
    this.authService.getCurrentUser().subscribe((user: { uid: any; }) => {
      if (user) {
        this.firestoreService.updateUserProfile(user.uid, this.profileForm.value).then(() => {
          // Navigate back to the profile page with updated data
          this.router.navigate(['/user-dashboard'], { state: { user: { ...this.user } } });
        });
      }
    });
  }

  uploadProfilePicture(): Observable<string> {
    const userId = this.user.id;
    const filePath = `profile-pictures/${userId}`;
    const fileRef = this.fireStorage.ref(filePath);
    const task = this.fireStorage.upload(filePath, this.selectedImage);
  
    return from(task).pipe(
      switchMap(() => fileRef.getDownloadURL())
    );
  }

  handleImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.profileForm.patchValue({
        profilePicture: file
      });
    }
  }


  cancel(): void {
    // Navigate back to the profile page without saving changes
    this.router.navigate(['/user-dashboard']);
  }
}
