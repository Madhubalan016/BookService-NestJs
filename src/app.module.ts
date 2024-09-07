import { Module } from '@nestjs/common';
import { Book } from './model/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { userModule } from './userModule/user.module';
import { User } from './userModule/entity/user.entity';

@Module({
imports: [TypeOrmModule.forRoot(
    {
          type:"postgres",
          host: "localhost",
          port: 5432,
          username: "postgres",
          password: "postgres",
          database: "postgres",
          entities:[Book, User],
          synchronize:true
      }
      ),BookModule,
      userModule,
      AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
