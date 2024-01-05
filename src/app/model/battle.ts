import { User } from "./user";

export class Battle {
    id: string;
    songStyle: string;
    firstPlayer: User;
    secondPlayer: User;
    voters: User[]= [];

    constructor(FirstPlayer: User, SecondPlayer: User, SongStyle: string){
        this.firstPlayer=FirstPlayer;
        this.secondPlayer=SecondPlayer;
        this.songStyle=SongStyle;
        this.id=FirstPlayer.id+SecondPlayer.id;
    }

    addVoter(voter:User){
        this.voters.push(voter);
    }
}