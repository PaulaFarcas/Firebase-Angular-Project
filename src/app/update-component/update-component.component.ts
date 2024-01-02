import { Component } from '@angular/core';
import { DataService } from '../_service/data.service';
import { AuthService } from '../_service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, switchMap } from 'rxjs/operators';
import { FileService } from '../_service/file.service';
import { FileMetaData } from '../model/FileMetaData';
import { EMPTY, Observable, Observer, from, throwError } from 'rxjs';

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
    profilePicture: ''
  };

  profileForm: FormGroup;
  selectedImage: File | null = null;
  profilePictureControl: AbstractControl | null = null;
  selectedImagePreview: string | ArrayBuffer = '';
  filePath: any;

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
    const profilePictureControl = this.profileForm.get('profilePicture');
  }
  

  getSelectedImagePreview(): Observable<string | ArrayBuffer> {
    return new Observable((observer: Observer<string | ArrayBuffer>) => {
      if (this.selectedImage instanceof File) {
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedImage);
        reader.onload = () => {
          observer.next(reader.result as string);
          observer.complete();
        };
        reader.onerror = (error) => {
          observer.error(error);
        };
      } else if (typeof this.selectedImage === 'string') {
        observer.next(this.selectedImage);
        observer.complete();
      } else {
        observer.next('');
        observer.complete();
      }
    });
  }

  ngOnInit(): void {
    // Load user data and set it in the form
    // ...
    this.getSelectedImagePreview().subscribe(result => {
      this.selectedImagePreview = result;
    });
  }

  saveChanges(): void {
    // Save changes to Firestore
    console.log('User before update:', this.profileForm.value);
    if (this.selectedImage) {
      this.uploadProfilePicture().subscribe(downloadURL => {
        // Update the user profile in Firestore with the downloadURL
        this.user.profilePicture = downloadURL;
        this.profileForm.value.profilePicture=downloadURL;
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
    return this.authService.getCurrentUser().pipe(
      switchMap((user: { uid: any; }) => {
        if (user) {
          const userId = user.uid;
          console.log(userId);
          this.filePath = `profile-pictures/${userId}/${this.selectedImage?.name}`;
          const fileRef = this.fireStorage.ref(this.filePath);
          const task = this.fireStorage.upload(this.filePath, this.selectedImage);

          return from(task).pipe(
            switchMap(() => fileRef.getDownloadURL())
          );
        } else {
          // Handle the case when the user is not available
          return EMPTY;
        }
      })
    );
  }
  

  handleImageChange(event: any): void {
    const files = event?.target?.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.selectedImage = file;

      if (this.profilePictureControl) {
        this.profilePictureControl.setValue(file);
      }
    }
  }
  
  
  


  cancel(): void {
    // Navigate back to the profile page without saving changes
    this.router.navigate(['/user-dashboard']);
  }
}