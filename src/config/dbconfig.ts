import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Book } from "../model/book.entity";
import { User } from "../userModule/entity/user.entity";

export const dbconfig: TypeOrmModuleOptions = {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        synchronize: true,
        logging: true,
        entities: [Book, User],
}