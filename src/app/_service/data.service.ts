import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }

  addUser(user: User){
    user.id=this.afs.createId();
    return this.afs.collection('users').add(user);
  }

  getAllUsers() {
    return this.afs.collection('users');
  }

  deleteUser(user : User) {
    this.afs.doc('/users/'+user.id).delete();
 }

 updateUser(user : User) {
   this.afs.collection('users').doc(user.id).update(user);
  }

  updateUserProfile(userId: string, userProfile: any): Promise<void> {
    return this.afs.collection('users').doc(userId).update(userProfile)
      .then(() => {
        console.log('Profile updated successfully');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  }
  
  createUserProfile(userId: string, userData: any): Promise<void> {
    return this.afs.collection('users').doc(userId).set(userData);
  }
  
  getUserProfile(userId: string): any {
    return this.afs.collection('users').doc(userId).valueChanges();
  }

  createOrUpdateUserProfile(userId: string, userProfile: any): Promise<void> {
    // Use the provided user ID to determine if the profile already exists
    return this.afs.collection('users').doc(userId).set(userProfile, { merge: true })
      .then(() => {
        console.log('Profile created or updated successfully');
      })
      .catch((error) => {
        console.error('Error creating or updating profile:', error);
      });
  }
}
