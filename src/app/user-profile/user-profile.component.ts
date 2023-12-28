import { Component } from '@angular/core';
import { User } from '../model/user';
import { AuthService } from '../_service/auth.service';
import { DataService } from '../_service/data.service';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  userList: User[] = [];
  userObj: User = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    music_style:''
  };

  
  id: string = '';
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  music_style:string='';

  
  constructor(private auth: AuthService, private data: DataService) { }

  
  ngOnInit(): void {
  
    this.getAllUsers();
  
  }
  

  getAllUsers() {

      this.data.getAllUsers().subscribe({
        next:(res:any)=>{
  
          this.userList = res.map((e: any) => {
            const data = e.payload.doc.data();
            data.id = e.payload.doc.id;
            return data;
          })
    
        },
       error: () => {
          alert('Error while fetching data');
        },
        complete:()=>console.log('completed')
      })
  }

  
  resetForm() {
    this.id = '';
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.music_style='';
  }

  addUser() {
    if (this.first_name == '' || this.last_name == '' || this.email == '' || this.music_style=='' ) {
      alert('Fill all input fields');
      return;
    }
    
    this.auth.getCurrentUserEmail().subscribe(currentUserEmail => {
      if (!currentUserEmail) {
        alert('Error: Unable to retrieve current user email');
        return;
      }
  
      if (currentUserEmail !== this.email) {
        alert('You can only add a user with your own email address');
        return;
      }
  
      // Check if the user with this email already exists
      if (this.isUserAlreadyExists(this.email)) {
        alert('User with this email already exists');
        return;
      }
  
      this.userObj.id = '';
      this.userObj.email = this.email;
      this.userObj.first_name = this.first_name;
      this.userObj.last_name = this.last_name;
      this.userObj.music_style = this.music_style;
     
      // Assuming you have a method like addUser in your data service
      this.data.addUser(this.userObj);


      this.resetForm();
    });

  }

  private isUserAlreadyExists(email: string): boolean {
    return this.userList.some(user => user.email === email);
  }

  deleteUser(user: User) {
    if (window.confirm('Are you sure you want to delete ' + user.first_name + ' ' + user.last_name + ' ?')) {
      this.data.deleteUser(user);
    }
  }


  sameEmail(emailUser:string):boolean{
    this.auth.getCurrentUserEmail().subscribe(currentUserEmail => {
    if (currentUserEmail == emailUser) {
          console.log(emailUser);
          console.log(currentUserEmail);
      return true;
    }
    else 
    return false;
    });
    return false;
  }

 
 
  



}

 

