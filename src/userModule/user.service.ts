import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { User } from '../userModule/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDto } from '../userModule/dto/user.dto';
import { UsersRepository} from './user.repository';
import * as  crypto from 'crypto';
 

@Injectable()
export class userService {
    logger = new Logger(userService.name);
    
    private readonly saltLength = 16;
    private readonly hashAlgorithm = 'sha256';
    private readonly hashIterations = 10000;

    constructor(@InjectRepository(User) private readonly repository: UsersRepository) { }
   
   
  private async hashPassword(password: string, salt: string): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, salt, this.hashIterations, 64, this.hashAlgorithm, (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey.toString('hex'));
      });
    });
  }

  private generateSalt(): string {
    return crypto.randomBytes(this.saltLength).toString('hex');
  }

    public async save(user: createUserDto) {
        this.logger.debug("Register user " + user);
        const salt = this. generateSalt();
        const hashPassword = await this.hashPassword(user.password, salt);

        const createUser = this.repository.create({ ...user, password:hashPassword, salt});
        return await this.repository.save(createUser);
    }
    public async findOne(userName: string){
        this.logger.debug("User find successfully" );
         return await this.repository.findOne({where: {userName}});
     
    }

    public async delete(id: string){
       this.logger.debug("User logout successfully" );
       return await this.repository.delete(id)
       
    }
}