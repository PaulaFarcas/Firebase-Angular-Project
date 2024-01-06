export interface User {
    id : string,
    first_name : string,
    last_name : string,
    email : string,
    music_styles:string [], //pop,rock,,, if 
    profilePicture: string;
    isWaitingForBattle:boolean;
    isFound:boolean;
}
