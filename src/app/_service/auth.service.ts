import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth:AngularFireAuth, private router:Router) { }
  login(email:string, password:string){
    this.fireAuth.signInWithEmailAndPassword(email,password).then(()=>{
      localStorage.setItem('token','true');
      this.router.navigate(['home'])
    }, err=>{
      alert('Something went wrong');
      this.router.navigate(['/login'])
    })
  }

  register(email:string,password:string){
    this.fireAuth.createUserWithEmailAndPassword(email,password).then(()=>{
      alert('Registratian successfull');
      this.router.navigate(['/login']);
    },err=>{
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  logout(){
    this.fireAuth.signOut().then(()=>{
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    },err=>{
      alert(err.message);
    }
    )
  }

}