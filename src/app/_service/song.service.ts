import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Song } from '../model/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(afs:AngularFirestore) {}

  public static findSong(style_list1:string[], style_list2:string[]):Song{
    return new Song('Jason Mraz', "I'm Yours", "https://www.youtube.com/watch?v=EkHTsc9PU2A");
    //TODO: #4 to implement once music styles as array is implemented
  }
}
