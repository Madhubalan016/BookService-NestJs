import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../userModule/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { userService } from '../userModule/user.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret:'secretKey',
      signOptions:{expiresIn: 60000}
    })
    
  ],
  providers: [AuthService, userService],
  exports: [AuthService]
})
export class AuthModule {}
