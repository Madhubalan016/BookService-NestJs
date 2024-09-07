import { Module } from '@nestjs/common';
import { userController } from './user.controller';
import { userService } from './user.service';
import {  UsersRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Book } from '../model/book.entity';
import { User } from './entity/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]),
              AuthModule],
  controllers: [ userController],
  providers: [ userService, UsersRepository ],
})
export class userModule {}