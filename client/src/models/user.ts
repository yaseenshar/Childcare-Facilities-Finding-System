import { Favorites } from "./favorites";

export interface User {
    username: string;
    password: string;
}


export interface UserInfo {
    id: string,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    phoneNumber: string,
    roles?: string[],
    favoritePlaces?: Favorites[],
    password?: string,
    confirmPassword?: string,
    token?: string,
    status?:number,

}

export interface Role {
    id: string,
    name: string
}