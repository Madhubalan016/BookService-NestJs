"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var userService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("@nestjs/common/services");
const user_entity_1 = require("../userModule/entity/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("./user.repository");
const crypto = require("crypto");
let userService = userService_1 = class userService {
    constructor(repository) {
        this.repository = repository;
        this.logger = new services_1.Logger(userService_1.name);
        this.saltLength = 16;
        this.hashAlgorithm = 'sha256';
        this.hashIterations = 10000;
    }
    async hashPassword(password, salt) {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(password, salt, this.hashIterations, 64, this.hashAlgorithm, (err, derivedKey) => {
                if (err)
                    reject(err);
                resolve(derivedKey.toString('hex'));
            });
        });
    }
    generateSalt() {
        return crypto.randomBytes(this.saltLength).toString('hex');
    }
    async save(user) {
        this.logger.debug("Register user " + user);
        const salt = this.generateSalt();
        const hashPassword = await this.hashPassword(user.password, salt);
        const createUser = this.repository.create({ ...user, password: hashPassword, salt });
        return await this.repository.save(createUser);
    }
    async findOne(userName) {
        this.logger.debug("User find successfully");
        return await this.repository.findOne({ where: { userName } });
    }
    async delete(id) {
        this.logger.debug("User logout successfully");
        return await this.repository.delete(id);
    }
};
exports.userService = userService;
exports.userService = userService = userService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [user_repository_1.UsersRepository])
], userService);
//# sourceMappingURL=user.service.js.map