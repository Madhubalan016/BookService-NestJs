import { Logger } from '@nestjs/common/services';
import { User } from '../userModule/entity/user.entity';
import { createUserDto } from '../userModule/dto/user.dto';
import { UsersRepository } from './user.repository';
export declare class userService {
    private readonly repository;
    logger: Logger;
    private readonly saltLength;
    private readonly hashAlgorithm;
    private readonly hashIterations;
    constructor(repository: UsersRepository);
    private hashPassword;
    private generateSalt;
    save(user: createUserDto): Promise<User>;
    findOne(userName: string): Promise<User>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
