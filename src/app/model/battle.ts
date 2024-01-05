import { User } from "./user";
import { Song } from "./song";
import { SongService } from "../_service/song.service";

export class Battle {
    id: string;
    firstPlayer: User;
    secondPlayer: User;
    voters: User[]= [];
    song: Song;

    constructor(FirstPlayer: User, SecondPlayer: User){
        this.firstPlayer=FirstPlayer;
        this.secondPlayer=SecondPlayer;
        this.id=FirstPlayer.id+SecondPlayer.id;
        this.song=SongService.findSong(FirstPlayer.music_styles, SecondPlayer.music_styles);
    }

    addVoter(voter:User){
        this.voters.push(voter);
    }
}