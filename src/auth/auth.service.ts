import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userService } from '../userModule/user.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
    private readonly hashAlgorithm = 'sha256';
    private readonly hashIterations = 10000;

   constructor(
    private readonly jwtService: JwtService,
    private readonly userService: userService,
   ){}
   private async hashPassword(password: string, salt: string) {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, salt, this.hashIterations, 64, this.hashAlgorithm, (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey.toString('hex'));
      });
    });
  }


   public async validateUser(userName: string, password:string){
    const user = await this.userService.findOne(userName);
     if(user){
        const hashPassword = await this.hashPassword(password, user.salt);
        if(hashPassword === user.password){
        
        return { id: user.id, userName: user.userName}
        }
    }
    return null;
   }

   async login(user: {id:string, userName: string}){
    const token = { username: user.userName, sub: user.id};
    return {
        access_token : this.jwtService.sign(token)
    };
   }
   async verifyToken(token: string){
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
