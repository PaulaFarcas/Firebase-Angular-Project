export interface User {
    id : string,
    first_name : string,
    last_name : string,
    email : string,
    music_style:string, //pop,rock,,, if 
    profilePicture: string;
    isWaitingForBattle:boolean;
    isReady:boolean;
}
