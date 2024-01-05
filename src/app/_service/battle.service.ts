import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DataService } from './data.service';
import { User } from '../model/user';
import { FirebaseApp } from '@angular/fire/app';
import { Battle } from '../model/battle';
import { SongService } from './song.service';
import { Song } from '../model/song';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  constructor(private fireAuth: AngularFireAuth, private fireStore: AngularFireStorage) {}

  createBattle(FirstUser:User, SecondUser: User){
    let newBattle= new Battle(FirstUser, SecondUser);
    
    this.fireStore.ref('/Battle').put(newBattle);

    return newBattle;
  }
}
