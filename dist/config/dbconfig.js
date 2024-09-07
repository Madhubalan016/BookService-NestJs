"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbconfig = void 0;
const book_entity_1 = require("../model/book.entity");
const user_entity_1 = require("../userModule/entity/user.entity");
exports.dbconfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    synchronize: true,
    logging: true,
    entities: [book_entity_1.Book, user_entity_1.User],
};
//# sourceMappingURL=dbconfig.js.map