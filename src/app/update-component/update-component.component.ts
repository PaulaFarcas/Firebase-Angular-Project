import { Component } from '@angular/core';
import { DataService } from '../_service/data.service';
import { AuthService } from '../_service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, switchMap } from 'rxjs/operators';
import { FileService } from '../_service/file.service';
import { FileMetaData } from '../model/FileMetaData';
import { EMPTY, Observable, Observer, from, throwError, Subscription } from 'rxjs';

@Component({
  selector: 'app-update-component',
  templateUrl: './update-component.component.html',
  styleUrls: ['./update-component.component.css']
})
export class UpdateComponentComponent {
  private currentUserSubscription: Subscription | undefined;

  user: User = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    music_style: [],
    profilePicture: '',
    isWaitingForBattle: false,
    isFound: false
  };

  profileForm: FormGroup;
  selectedImage: File | null = null;
  profilePictureControl: AbstractControl | null = null;
  selectedImagePreview: string | ArrayBuffer = '';
  filePath: any;
  musicStylesArray: string[] = ["Rock", "Pop", "Hip Hop", "Jazz", "Country", "Electronic"];
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
      music_style: this.fb.array([]),
      profilePicture: [null]
    });
    const profilePictureControl = this.profileForm.get('profilePicture');
    this.initializeMusicStylesCheckboxes();
  }
  
  initializeMusicStylesCheckboxes() {
    this.musicStylesArray.forEach((style) => {
      const control = this.fb.control('');
      this.musicStylesFormArray.push(control);
    });
  }
  
  // Getter for music_style FormArray
  get musicStylesFormArray() {
    return this.profileForm.get('music_style') as FormArray;
  }

  toggleMusicStyle(style: string): void {
    const musicStyles = this.musicStylesFormArray;
  
    if (musicStyles) {
      const index = musicStyles.value.indexOf(style);
  
      if (index !== -1) {
        // Remove the style if it's already selected
        musicStyles.removeAt(index);
      } else {
        // Add the style as a string
        musicStyles.push(this.fb.control(style));
      }
    }
  }
  
  isChecked(style: string): boolean {
  const musicStyles = this.musicStylesFormArray;
  return musicStyles && musicStyles.value.includes(style);
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
    console.log('Ng on init executed');
    //this.currentUserSubscription=
    this.authService.getCurrentUser().subscribe((user: { uid: string; }) => {
      if (user) {
        console.log('Current user retrieved:', user);
        this.firestoreService.getUserProfile(user.uid).subscribe((profile: any) => {
          if (profile) {
            // User profile exists, use it
            this.user = profile;
            console.log('user: ', this.user);
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

  ngOnDestroy(){
    this.currentUserSubscription?.unsubscribe();
  }

  saveChanges(): void {
    // Save changes to Firestore

    if (this.selectedImage) {
      this.uploadProfilePicture().subscribe(downloadURL => {
        // Update the user profile in Firestore with the downloadURL
        //this.user.profilePicture = downloadURL;
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
        const updatedProfile: any = { ...this.profileForm.value };
  
        if (updatedProfile.first_name !== null && updatedProfile.first_name !== '') {
          this.user.first_name = updatedProfile.first_name;
        }
  
        if (updatedProfile.last_name !== null && updatedProfile.last_name !== '') {
          this.user.last_name = updatedProfile.last_name;
        }
  
        if (updatedProfile.music_style !== null && updatedProfile.music_style !=='') {
          this.user.music_style = updatedProfile.music_style;
        }
  
        if (updatedProfile.profilePicture !== null) {
          this.user.profilePicture = updatedProfile.profilePicture
        }
        // Add similar checks for other fields as needed
        console.log('Save changes user ',user);
        this.firestoreService.updateUserProfile(user.uid, this.user).then(() => {
          // Navigate back to the profile page with updated data
          console.log('update changes user ',this.user);
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