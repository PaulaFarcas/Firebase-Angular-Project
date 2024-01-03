import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DataService } from './data.service';
import { User } from '../model/user';
import { FirebaseApp } from '@angular/fire/app';
import { Battle } from '../model/battle';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  constructor(private fireAuth: AngularFireAuth, private fireStore: AngularFireStorage) {}

  createBattle(FirstUser:User, SecondUser: User, SongStyle:string){
    let newBattle= new Battle(FirstUser, SecondUser, SongStyle);
    
    this.fireStore.ref('/Battle').put(newBattle);

    return newBattle;
  } 
}
