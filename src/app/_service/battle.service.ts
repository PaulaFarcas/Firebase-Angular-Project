import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { User } from '../model/user';
import { Battle } from '../model/battle';
import { Observable, map, switchMap, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  constructor(private firestore: AngularFirestore) {}

  createBattle(FirstUser:User, SecondUser: User){
    let newBattle= new Battle(FirstUser, SecondUser);
    this.firestore.collection('battles').add(Object.assign({}, newBattle));
  }

  getAllBattles(): any{
    return this.firestore.collection('battles').valueChanges();
  }

  getBattleHostingPlayer(player:User):Observable<any>{
    return this.firestore.collection('battles').valueChanges().pipe(
      map((battles:any[])=> battles.filter(battle=> battle.FirstPlayer.id==player.id || battle.SecondPlayer.id==player.id)),
      switchMap(filteredBattles=>{
        if(filteredBattles && filteredBattles.length>0){
          return filteredBattles[0];
        }
      })
    );
  }

  deleteBattleHostingPlayer(player:User){
    this.firestore.collection('battles').valueChanges().pipe(
      map((battles:any[])=> battles.filter(battle=> battle.FirstPlayer.id==player.id || battle.SecondPlayer.id==player.id)),
      tap((filteredBattles:any[])=>{
        if(filteredBattles && filteredBattles.length>0){
          filteredBattles.forEach(battle => {
            this.firestore.collection('battle').doc(battle.id).delete();
          });
        }
      })
    );
  }

}
