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
    return this.afs.collection('/User').add(user);
  }

  getAllUsers() {
    return this.afs.collection('/User').snapshotChanges();
  }

  deleteUser(user : User) {
    this.afs.doc('/User/'+user.id).delete();
 }

 updateUser(user : User) {
   this.afs.collection('/User').doc(user.id).update(user);
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
  

  getUserProfile(userId: string): any {
    return this.afs.collection('users').doc(userId).valueChanges();
  }

}
