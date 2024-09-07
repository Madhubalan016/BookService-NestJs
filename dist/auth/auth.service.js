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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../userModule/user.service");
const crypto = require("crypto");
let AuthService = class AuthService {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
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
    async validateUser(userName, password) {
        const user = await this.userService.findOne(userName);
        if (user) {
            const hashPassword = await this.hashPassword(password, user.salt);
            if (hashPassword === user.password) {
                return { id: user.id, userName: user.userName };
            }
        }
        return null;
    }
    async login(user) {
        const token = { username: user.userName, sub: user.id };
        return {
            access_token: this.jwtService.sign(token)
        };
    }
    async verifyToken(token) {
        try {
            return this.jwtService.verify(token);
        }
        catch (e) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.userService])
], AuthService);
//# sourceMappingURL=auth.service.js.map