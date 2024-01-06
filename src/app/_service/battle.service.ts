import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../model/user';
import { Battle } from '../model/battle';
import { Observable, catchError, map, of, startWith} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  constructor(private firestore: AngularFirestore) {}

  createBattle(FirstUser:User, SecondUser: User){
    let newBattle= new Battle(FirstUser, SecondUser);
    this.firestore.collection('battles').add(newBattle);
  }

  getAllBattles(): any{
    return this.firestore.collection('battles').get();
  }

  getBattleHostingPlayer(player:User):Observable<Battle|null>{
    return this.firestore.collection('battles', ref=>
    ref.where('firstPlayer', '==', player)
      .where('secondPlayer', '==', player))
    .valueChanges().pipe(
      map((battles:any[])=>{
        battles = battles.filter(doc => doc.id.includes(player.id));
        return battles[0];
      }),
      catchError(error => {
        console.error('Error fetching battle, ', error);
        return of(null);
      })
    )
  }

}
