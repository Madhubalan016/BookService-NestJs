import { IsInt, IsNotEmpty } from "class-validator";

export class createUserDto{
    id: string;

    userName:string;

    password:string;

    salt: string;
}