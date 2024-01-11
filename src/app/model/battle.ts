import { User } from "./user";
import { Song } from "./song";
import { SongService } from "../_service/song.service";

export class Battle {
    firstPlayer: User;
    secondPlayer: User;
    voters: User[]= [];
    song: Song;

    constructor(FirstPlayer: User, SecondPlayer: User){
        this.firstPlayer=FirstPlayer;
        this.secondPlayer=SecondPlayer;
        this.song=Object.assign({},SongService.findSong(FirstPlayer.music_style, SecondPlayer.music_style));
    }

    addVoter(voter:User){
        this.voters.push(voter);
    }
}